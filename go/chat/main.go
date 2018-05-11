package main

import (
	"../chat/trace"
	"flag"
	"github.com/stretchr/gomniauth"
	"github.com/stretchr/gomniauth/providers/google"
	"github.com/stretchr/objx"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"sync"
	"text/template"
)

var avatars Avatar = TryAvatars{
	UseFileSystemAvatar,
	UseAuthAvatar,
	UseGravatar}

//template
type templateHandler struct {
	once     sync.Once
	filename string
	//一つのテンプレートを表す
	templ *template.Template
}

// serverHTTP はHTTPリクエストを処理します
func (t *templateHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	t.once.Do(func() {
		t.templ = template.Must(template.ParseFiles(filepath.Join("templates", t.filename)))
	})
	data := map[string]interface{}{
		"Host": r.Host,
	}
	if authCookie, err := r.Cookie("auth"); err == nil {
		data["UserData"] = objx.MustFromBase64(authCookie.Value)
	}
	t.templ.Execute(w, data)
}

//main
//usage ./main -addr="127.0.0.1:8080"
func main() {
	var addr = flag.String("addr", "127.0.0.1:8080", "アプリケーションのアドレス")
	flag.Parse()
	gomniauth.SetSecurityKey("seckeyi201601")
	gomniauth.WithProviders(
		google.New("102726273612-hcgquhervei9ba13lqq6h2qeq7lrr1bf.apps.googleusercontent.com", "4_nvzYhfLrX4YdzfPA8bsS_r", "http://127.0.0.1:8080/auth/callback/google"),
	)

	//r := newRoom(UseGravatar)
	r := newRoom()
	//--trace on / off [start]
	r.tracer = trace.New(os.Stdout)
	//r.tracer = trace.Off(os.Stdout)
	//--trace on / off [end]
	http.Handle("/", &templateHandler{filename: "chat.html"})
	http.Handle("/chat", MustAuth(&templateHandler{filename: "chat.html"}))
	http.Handle("/login", &templateHandler{filename: "login.html"})
	http.HandleFunc("/auth/", loginHandler)
	http.Handle("/room", r)
	http.HandleFunc("/logout", func(w http.ResponseWriter, r *http.Request) {
		http.SetCookie(w, &http.Cookie{
			Name:   "auth",
			Value:  "",
			Path:   "/",
			MaxAge: -1,
		})
		w.Header()["Location"] = []string{"/chat"}
		w.WriteHeader(http.StatusTemporaryRedirect)
	})
	http.Handle("/upload", &templateHandler{filename: "upload.html"})
	http.HandleFunc("/uploader", uploaderHandler)
	http.Handle("/avatars/", http.StripPrefix("/avatars/", http.FileServer(http.Dir("./avatars"))))
	go r.run()
	/*
			http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
				w.Write([]byte(`<html>
		  						<head>
		  							<title>チャット</title>
		  						</head>
		  					<body>
		  						チャットをしましょう！
		  					</body>
		  					</html>
		  		`))

			})
	*/
	log.Println("Webサーバを開始します: port: ", *addr)
	//starting web server
	if err := http.ListenAndServe(*addr, nil); err != nil {
		log.Fatal("ListeneAndServer:", err)
	}
}
