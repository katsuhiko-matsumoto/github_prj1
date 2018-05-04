
function jsonParse(value){
	var data="";
	for(var key in value){
		if(isNaN(parseFloat(value[key])) || key === 'id' || key === 'hashedid' || key === 'data' ||
					value[key] === Infinity || value[key] === -Infinity || //modify 20171216
					value[key] === 'Infinity' || value[key] === '-Infinity'){ //todo
			data += ('"'+ key +'":"'+ value[key] +'",');
		}else{
			data += ('"'+ key +'":' + parseFloat(value[key]) + ',');
		}
	}
	//chop
	data = data.substring(0, data.length-1);
	data = '{'+data+'}';
	//parse to json
	return JSON.parse(data);
}

exports.jsonParse = jsonParse;
