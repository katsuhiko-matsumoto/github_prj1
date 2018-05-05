var config;
var cluster = require('cluster');
var includer = require('./script/common/requires');
var redisclient;
var os = require('os');
var size = os.cpus().length;
//console.log('this os is ' + size + 'cpus');
var clusterworkerscol;
var ipaddr;
var clusterlog;

var workerpid = new Array();

console.log("# cluster.js pid:"+process.pid);
includer.requires('./script/config', function(value){
 	config = value;
    proceed();
});

function proceed(){

	var bootstrap = includer.requires('./script/bootstrap/cluster');
	var log = includer.requires('./script/common/log');
	var db = includer.requires('./script/db');
	var redis = includer.requires('redis');
	var nlog4js = includer.requires('nlog4js');
	
	//amazon prd(cpu 1)のみ強制的にクラスタ　将来的コメントアウト
	console.log('##! mode:',config.mode);
	if(size === 1){//cpu size
		size += 3;//3 server cluster add
	}
	
	if(cluster.isMaster){
		console.log('..............master has begun.');
	    bootstrap.setupcluster(function(){
	        log.debug('redis client '+config.redis.port+' '+config.redis.host);
		    config.after(function(){
		    	for(var key in config.logger.appenders){
		    		config.logger.appenders[key].filename = 
		    				config.logger.appenders[key].filename+'.0';
		    	}
		        nlog4js.setConfigure(config.logger, config.logger.console);
		    	clusterlog = nlog4js.getLogger('cluster', false);
		    	//clusterlog.info('CLUSTER MASTER: start.');
		        clusterworkerscol = db.main.collection('ClusterWorkers');
		        redisclient = redis.createClient(config.redis.port, config.redis.host);
		        redisclient.flushall(function(){
		            clusterlog.info('redis memory all flushed.');
		            clusterlog.info('cluster master pid:'+process.pid+' has started');
		            for(var i = 0; i < size+1; i++){
		                cluster.fork();
		            }
		        });
		    });
	    });
	}
	
	if(cluster.isWorker){
		console.log('.......................worker has begun');
	    if(cluster.worker.id == 1){
	        //monitor
	        log.info('clustermonitor pid:'+process.pid+' has started. key:',cluster.worker.id);
	        require('./clustermonitor').setWorkerId(cluster.worker.id);
	    }else if(cluster.worker.id <= size+1){
	        //web app server normal
	        log.info('cluster worker pid:'+process.pid+' has started. key:',cluster.worker.id);
	        require('./worldchat').setWorkerId(cluster.worker.id);
	    }else{
	        //web app server with failover
	        log.info('cluster worker pid:'+process.pid+' has started for Failover. key:',cluster.worker.id);
	        require('./worldchat').isFailover(true, cluster.worker.id);
	    }
	    //worker.id  : １からインクリメント
	}
	
	cluster.on('exit', function(worker, code, signal) {
	    log.info('worker pid:' + worker.process.pid + ' died');
	}); 
	
	if(cluster.isMaster){
	    var exit = function() {
	        // Clearing all resources
	    	log.info('CLUSTER MASTER: cleaning resources. pid:'+process.pid);
	        bootstrap.exit(function() {
	        	//log.info('CLUSTER MASTER: PROCESS EXIT. pid:'+process.pid);
	            process.exit(0);
	        });
	    };
	    
	    process.on('SIGTERM', function(){
	        log.info("CLUSTER MASTER: SIGTERM DETECTED. pid:"+process.pid);
	        exit();
	    });
	    
	    process.on('SIGINT', function(){
	    	log.info("CLUSTER MASTER: SIGINT DETECTED. pid:"+process.pid);
	        exit();
	    });
	    
	    process.on("exit", function(){
	    	log.info("CLUSTER MASTER: Server has been going down. pid:"+process.pid);
	    });
	}
}


//redis cluster
//  各socket プロセスは全部のconnectionを得てる訳ではない。
//  sockets.emit のときのみ、全配信でプロセスを超えてメッセージ配信
//  プロセスを超えてuni-castは？？

// io.sockets.sockets 全プロセスのsocketidもっている
//下記で取得可能
//var users = new Array();
//var rooms = io.sockets.manager.roomClients[_id];
//    for(var key in rooms){
//        if (key === '') continue;
//        //var room = io.sockets.manager.rooms[key];
//        var clients = io.sockets.clients(key.replace('/',''));
//        for(var key2 in clients){
//            //log.debug("##key2"+clients[key2]);
//            if(users[clients[key2].id]) continue;
//            users[clients[key2].id] = clients[key2];
//        }
//    }
//
//
//
//しかし、後天的に設定した変数データは引き継がれない　gameuser.nickname ...



// room emit ok?
// エリアをroomで区切ってbroadcast 範囲を限定する
// secret msg も room つくって配信

//互換を持って実装

//jenkins clusterのpidをkillすれば、workernがexit signをdetectしてくれる。
// workerのpidすべて消す必要なし。(むしろworkerを消すとfailoverする)

//redis object1の格納
//var str="hello";
//var num=100.33;
//var _test = {str:str,num:num};
//_test.test="test";
//client.set("test1", JSON.stringify(_test)); ////ここでテキスト化
//client.get("test1",function(err,result){
//       if(err){console.log(err);}
//        result = JSON.parse(result); ////オブジェクトに戻す


//cluster failover
// 復活したプロセスに入った人は、既存の人は見えるが、
// 新　-> 旧 msg pos ng  new user table:self only
// 新 <- 旧  msg pos ok  already user room table:self ant newbie
// 既にいる人は、新しく入った人が見えない　msg も NG
// 入り直すとOK
//下記ならOK
//io.sockets.in(key.replace('/','')).emit(message, data);
// 既存サーバのルーム、ユーザ情報を配信する仕組み？
// 多分、rejoin room を全員分行えば、redisで配信される
// →落ちたソケットサーバユーザのコネクションが残る問題。　cluster process id を持たせて該当を削除？
//複数台落ちたときの対応：radisに各workerのプロセス状態を管理


//room leave and culling 確認

//round robin


//redis なしでもいける 別プロセスの設定値を取得可能
//socket.set("test",JSON.stringify(data));
//
//socket.get("test",function(err,data){
//        log.debug("test:"+data);
//    });

// io.sockets.clients(key.replace('/',''));
// 上記メソッドバグあり
// ルームからさったらユーザも残留してる場合があって、このメソッドを使用して
// 取得したsocket user にデータを送信すると、
// ユーザが切断した後も、ユーザデータが残り、リークする。
// 部屋ごとのユーザ情報は別途自作する必要あり

//各クラスタサーバ単体ですべてのsocket情報を持っていて取得できるメソッド
//io.sockets.socket(webkey)

//cluster
// redis global lockを使用
// 
//


