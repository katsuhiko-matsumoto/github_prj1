package trace

import (
	"fmt"
	"io"
	"log"
)

//Tracerはコード内の出来事を記録できるオブジェクトを表すインタフェースです
type tracer struct {
	out io.Writer
}

type Tracer interface {
	//interfaceの定義
	Trace(...interface{})
	boo()
}

func New(w io.Writer) Tracer {
	return &tracer{out: w}
}

//interfacenの実装
func (t *tracer) Trace(a ...interface{}) {
	t.out.Write([]byte(fmt.Sprint(a...)))
	t.out.Write([]byte("\n"))
}

func (t *tracer) boo() {
	log.Println("wow")
}

type nilTracer struct{}
func (t *nilTracer) Trace(a ...interface{}){}
func (t *nilTracer) boo(){}
func Off(a ...interface{}) Tracer{
	return &nilTracer{}
}
