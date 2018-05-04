var http = require('http');
var fs = require('fs');
var net = require('net');
var args = require('./argsparser').parse();

var pidfile='';
var port=843;

//pid
console.log(process.pid);
//node version
console.log(process.version);

proceed();

function proceed(){
var usage = '\nusage this.js [-h|--help]\n' +
	'\t-h --help\tヘルプ\n' +
	'\t-p\tPID[FILE]パスを指定してください。\n';


if (args['-h'] || args['--help']) {
    // usage
    console.log(usage)
	process.exit(1);
}

if (args['-p']) {
	pidfile = args['-p'];
}
	
process.on('uncaughtException', function(err){
    console.log(err);
});

var server = net.createServer(function(stream) {
	stream.setEncoding('utf8');
	stream.on('data', function() {
		stream.end(
				"<cross-domain-policy><allow-access-from domain='" +
				allow +
				"' to-ports='*'/>"+
				"</cross-domain-policy>");
	});
	stream.on('error', function(err) {
		console.log("err");
		stream.end();
	});
	stream.on('end', function() {
		stream.end();
	});
});

server.listen(port,"0.0.0.0");
console.log("start");

//PIDファイル作成
if (pidfile) {
	fs.writeFile(pidfile, String(process.pid), function (err) {
		if (err) {
			console.log(err);
			process.exit(1);
		}
	});
};

//シグナルハンドラ
var close = function() {
	// PIDファイルを削除
	if (!pidfile) {
		return;
	}
	try {
		fs.unlinkSync(pidfile);
		console.log('Remove pid file. path=' + pidfile);
	} catch (e) {

	}	
};

//サーバー終了処理
process.on('SIGTERM', function() {
	console.log("Got SIGTERM");
	close();
	process.exit(0);
});
process.on("SIGINT", function() {
	console.log("Got SIGINT");
	close();
	process.exit(1);
});
}
