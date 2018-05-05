		    var app = express();
		    app.configure('production', function(){
		    	log.info(':::::::::::::::contents will be cached....');
		    	// export NODE_ENV=production
		    	app.set('view cache');
		    });
		    app.configure(function(){
		        //app.use(express.favicon());
		        app.use(express.bodyParser());
		        app.use(express.cookieParser());
		        app.use(express.cookieSession({ secret: 'keyboard-cat' }));
		        app.use(express.methodOverride());
		        app.use(captcha({url:'/captcha.jpg',color:'#0064cd',background:'rgb(20,30,200)'}));
		        //console.log('# worldchat.js redis ',config.redis.port,':',config.redis.host);
		        rclient = redis.createClient(config.redis.port, config.redis.host);
		        pub = redis.createClient(config.redis.port, config.redis.host);
		        sub = redis.createClient(config.redis.port, config.redis.host);
		        app.use(express.session(
		            {store: new RedisStore({
		    			    	redisPub:pub,
		    			    	redisSub:sub,
		    			    	redisClient:rclient
		    		})}
		    	));
		        //anti CSRF session token
		        app.use(express.csrf());
		        app.use(function(req, res, next){
		            //log.debug('call token : req res next');
		            res.locals._csrf = req.csrfToken();
		            next();
		        });
		        
		        //debug
		        //app.use(function(req, res, next){
		        //	console.log('session value:',req.session,' pid:',process.pid);
		        //	next();
		        //});
		        
		        //url path error handler 
		        app.use(app.router);
		        app.use(require('stylus').middleware(__dirname+'/views'));
		        app.use(express.static(path.join(__dirname, 'views')));
		        app.use(function(req,res){
		        	res.status(404);
	                res.render('error/404/index', {
	                    config:config
	                });
		        });
		        app.use(function(err, req, res, next){
		        	res.status(500);
		            res.render('error/500/index', {
		                config:config
		            });
		        });
		        
		        app.set('port', process.env.PORT || config.port+addport);
		        app.set('view engine', 'jade');
		        app.set('views', __dirname + '/views');
		        app.set('view options', {layout: true, pretty: true});
		      
		        //path directory traversal
		        //app.use(express.static(path.join(__dirname, 'public')));
		    });
		    
		    if(config.mode === 'dev'){
		        app.use(express.errorHandler({
		            dumpExceptions:true,
		            showStack:true
		        }));
		    }else if(config.mode === 'stg'){
		        app.use(express.errorHandler());
		    }else if(config.mode === 'prd'){
		        app.use(express.errorHandler());
		    }
		    
		    ////////////////////////////////////
		    //sns top
		    app.get('/', function(req, res) {
		        res.setHeader('Connection', 'close');
		        //res.setHeader('Access-Control-Allow-Origin', '*');
		        //res.setHeader('Access-Control-Allow-Headers', '*');
		        webController.top(req, res);
		    });
		    // ログイン処理
		    app.post('/login', function(req, res) {
		        res.setHeader('Connection', 'close');
		        //res.setHeader('Access-Control-Allow-Origin', '*');
		        //res.setHeader('Access-Control-Allow-Headers', '*');
		        webController.login(req, res);
		    });
		    // ログアウト処理
		    app.get('/logout', function(req, res) {
		        res.setHeader('Connection', 'close');
		        //res.setHeader('Access-Control-Allow-Origin', '*');
		        //res.setHeader('Access-Control-Allow-Headers', '*');
		        webController.logout(req, res);
		    });
		    
		    //////////////////////////////////////
		    //service game
		    app.get('/worldchat', function(req, res){
		        res.setHeader('Connection', 'close');
		        webController.worldchattop(req, res);
		    });
		    
		    app.post('/worldchatlogin', function(req, res){
		        res.setHeader('Connection', 'close');
		        webController.worldchat(req,res);
		    });
		    
		    app.get('/download', function(req, res){
		        res.setHeader('Connection', 'close');
		        webController.download(req,res);
		    });
		    
		    //serive p2p-broadcast
		    app.get('/p2pbroadcaster', function(req, res){
		    	res.setHeader('Connection', 'close');
		    	webController.p2pbroadcaster(req, res);
		    });
		    
		    app.get('/p2preceiver', function(req, res){
		    	res.setHeader('Connection', 'close');
		    	webController.p2preceiver(req, res);
		    });
		    
		    app.get('/p2pbroadcaststate', function(req, res){
		    	res.setHeader('Connection', 'close');
		    	webController.p2pbroadcaststate(req, res);
		    });
		    	
		    //////////////////////////////////////
		    //member登録関連マネジメント
		    //登録用メール入力
		    app.get('/regist', function(req, res) {
		        res.setHeader('Connection', 'close');
		        memberController.regist(req, res);
		    });
		    app.post('/registed', function(req, res) {
		        res.setHeader('Connection', 'close');
		        memberController.registed(req, res);
		    });
		    //パスワード忘れ,再設定
		    app.get('/reminder', function(req, res) {
		        res.setHeader('Connection', 'close');
		        memberController.reminder(req, res);
		    });
		    app.post('/remindered', function(req, res) {
		        res.setHeader('Connection', 'close');
		        memberController.remindered(req, res);
		    });
		    app.get('/reminderinput', function(req, res) {
		        res.setHeader('Connection', 'close');
		        memberController.reminderinput(req, res);
		    });
		    app.post('/reminderconfirm', function(req, res) {
		        res.setHeader('Connection', 'close');
		        memberController.reminderconfirm(req, res);
		    });
		    app.post('/reminderinputed', function(req, res) {
		        res.setHeader('Connection', 'close');
		        memberController.reminderinputed(req, res);
		    });
		    //メンバー情報入力
		    app.get('/registinput', function(req, res) {
		        res.setHeader('Connection', 'close');
		        memberController.registinput(req, res);
		    });
		    app.post('/registinputconfirm', function(req, res) {
		        res.setHeader('Connection', 'close');
		        memberController.registinputconfirm(req, res);
		    });
		    app.post('/registinputed', function(req, res) {
		        res.setHeader('Connection', 'close');
		        memberController.registinputed(req, res);
		    });
		    //退会
		    app.get('/leave', function(req, res){
		        res.setHeader('Connection', 'close');
		        memberController.leave(req, res);
		    });
		    app.post('/leaveinput', function(req, res){
		        res.setHeader('Connection', 'close');
		        memberController.leaveinput(req, res);
		    });
		    app.post('/leaveconfirm', function(req, res){
		        res.setHeader('Connection', 'close');
		        memberController.leaveconfirm(req, res);
		    });
		    app.post('/left', function(req, res){
		        res.setHeader('Connection', 'close');
		        memberController.left(req, res);
		    });
		    //情報再設定
		    app.get('/resetting', function(req, res){
		        res.setHeader('Connection', 'close');
		        memberController.resetting(req, res);
		    });
		    app.post('/resettinginput', function(req, res){
		        res.setHeader('Connection', 'close');
		        memberController.resettinginput(req, res);
		    });
		    app.post('/resettingconfirm', function(req, res){
		        res.setHeader('Connection', 'close');
		        memberController.resettingconfirm(req, res);
		    });
		    app.post('/resettinginputed', function(req, res){
		        res.setHeader('Connection', 'close');
		        memberController.resettinginputed(req, res);
		    });
		    //プライバシー表記
		    app.get('/privacy', function(req, res){
		        res.setHeader('Connection', 'close');
		        res.setHeader('Cache-Control', 'private');
		        //res.setHeader('Cache-Control', 'public, max-age=345600'); //4-days
		        res.setHeader('Expires', new Date(Date.now()+345600000).toUTCString());
		        memberController.privacy(req, res);
		    });
		    
		    app.get('/403', function(req, res){
		        res.setHeader('Connection', 'close');
		        res.render('error/403');
		    });
		    
		    app.get('/test', function(req, res){
		    	res.setHeader('Connection', 'close');
		    	res.send('helloworld');
		    });
		    
		    app.get('/crossdomain.xml', function(req, res){
		    	res.setHeader('Connection', 'close');
		    	res.send("<cross-domain-policy><allow-access-from domain='*' to-ports='*'/></cross-domain-policy>");
		    });
		    
		    //google 
		    app.get('/googleb734e4d82b290954.html', function(req, res){
		    	res.setHeader('Connection', 'close');
		    	res.send("google-site-verification: googleb734e4d82b290954.html");
		    });
		    
		    //app.get('/test', function(req, res){
		    //    res.setHeader('Connection','close');
		    //    res.writeHead(200,{'Content-Type':'text/html'});
		    //    res.end(ioclient);
		    //});
		    
		    server = http.createServer(app); 
		    server.listen(app.get('port'), function(){ 
		        console.log("Express server listening on port " + app.get('port'));
		    });
		    