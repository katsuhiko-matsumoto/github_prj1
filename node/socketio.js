//needed express in the node_modules folder.
var express = require("express");
var http = require("http");
var socketIO = require("socket.io");

var app = express();
		    app.configure(function(){
		        app.set('port', 8888);
		    });
		    app.get('/', function(req, res){
				  res.sendfile(__dirname + '/socketio.html');
			});
		    
		    server = http.createServer(app); 
		    server.listen(app.get('port'), function(){ 
		        console.log("Express server listening on port " + app.get('port'));
		    });
		    
			io = socketIO.listen(server);
			io.on('connection', function(socket){
				console.log('a user connected');
				socket.on('message', function(msg){
					console.log('from clinet:'+msg);
					io.emit('message', msg);
				});
				socket.on('disconnect', function(){
					console.log('user disconnected');
				});
			});