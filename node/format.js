//class call///////////
var json = require("./json.js");

var testClass = require("./class.js");

testClass.testMethod("[called from format.js]");


//technic/////////////

//json
res = json.jsonParse({
					"cm":"serverdisconnect",
					"cause":"err",
                    "key":123456
});

console.log(res);

//
var data = {
    ticket:"hoge",
    ticket2:"hoge",
    momonga:"test"
};

if(data.ticket){
    console.log("ticket exists:"+data.ticket);
}else{
    console.log("ticket not exists");
}

if(data.hoge){
    console.log("hoge exists:"+data.hoge);
}else{
    console.log("hoge not exists");
}

res = json.jsonParse(data);
console.log(data);

//for
var args = ["a","b","c"];
for (var key in args) {
	if (args.hasOwnProperty(key)) {
        console.log("exist: key="+key);
    }
}
 

if(data.hasOwnProperty("ticket")){
    console.log("exist: key=ticket");
}


Object.keys(data).forEach(function(data){
            console.log("foreach data:"+data);
});


var handlers = {};
var names=["class","class2","class3"];
names.forEach(registerController);
function registerController(name){
        var controller = require('/Users/johnanderton/git/github_prj1/node/'+name+'.js');
	    for(var method in controller){
	        if(method){
	            var ns = name + '.' + method;
	            handlers[ns] = controller[method];
	        }
	    }
}
var method = "class2.test2Method";
function exec(_method){
    var handler = handlers[_method];
    var call = function(){
        try{
            if(!handler){
                return;
            }
            return handler("from registered");      
        }catch(e){
        }
    };
    call();
}
exec(method);

//filename
var path = require("path");
var prefix = path.basename(process.argv[1], '.js');
console.log("filename:"+prefix);

//config file read
var fs = require("fs");
var self = this;
fs.readFile('/Users/johnanderton/git/github_prj1/node/config.json', 'utf-8', function(err, data) {
		if (err) {
			throw err;
		}

		var json = JSON.parse(data);
		for (var n in json) {
			if (json.hasOwnProperty(n)) {
				self[n] = json[n];
			}
        }
        console.log("redis host:"+self.redis.host);
});



