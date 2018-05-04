getIpAddr("en0");

function getIpAddr(nic){
	var addresses = require('os').networkInterfaces()[nic];
	for(var key in addresses){
	 var address = addresses[key];
	 	 console.log(address);
	 if(address.family === 'IPv4'){
	   return address.address;
	 }
	}
}

exports.getIpAddr = getIpAddr;