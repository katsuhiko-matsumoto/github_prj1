var validation = require('validator');

function validate(){
	return validation;
}

function dataValidation(vals){
	try{
		for(var v in vals){
			var arr = v.split(':');
			//0:s  string  required
			//1:so string  option
			//2:n  numeric required
			//3:no numeric option
			//4:b  boolean required
			//5:bo boolean option
			if(arr[1].length === 1){
				//required check
				//console.log("check require:"+v+" : "+vals[v]);
				if(!vals[v].toString()) return false;
			}else{
				if(!vals[v]) continue;
			}
			var type = arr[1].substring(0,1);
			if(type === 'n'){
				//numeric
				//console.log("check numeric:"+v+" : "+vals[v]);
				if(!isNumericCorrectFigure(vals[v], 10, 15)) return false;
				if(!isNumeric(vals[v])) return false;
			}else if(type === 's'){
				//string
				//console.log("check str:"+v+" : "+vals[v]);
			}else if(type === 'b'){
				//string
				//console.log("check bool:"+v+" : "+vals[v]);
				if(!isBoolean(vals[v])) return false;
			}
		}
	}catch(e){
		//console.log(e);
		return false;
	}
	return true;
}

function isNumeric(value){
	//console.log('isNumeric:'+value);
	var val = parseFloat(value);
	//console.log('isNumeric:'+val);
	if(isNaN(val)) return false;
	return is('Number', val);
}

function isBoolean(value){
	if(value.toString() === 'true' || value.toString() === 'false'){
		return true;
	}else{
		return false;
	}
}

function isNumericCorrectFigure(value, lenpos,lenneg){
	//console.log(value+':'+lenpos+':'+lenneg);
	var val = value.toString();
	var arr = val.split('.');
	if(arr.length > 2) return false;
	if(arr[0] && arr[0].length > lenpos || arr[1] && arr[1].length > lenneg) return false;
	return true;
}

function is(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    //console.log('type:'+clas);
    return obj !== undefined && obj !== null && clas === type;
}

function isPassword(str){
	//8-12文字
	//小文字、大文字、数字、特殊記号(!@#$%^&*)が少なくとも一つずつ含まれている
	passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*[<>"'])(?!.*\s).{7,12}$/;
	return str.match(passw);
	
	// 先頭/^
	// 数字か(?=.*\d)小文字か(?=.*[a-z])大文字か(?=.*[A-Z])それ以外か(?=.*[^a-zA-Z0-9])
	// 記号"'<>以外か(?!.*[<>"'])
	// 空白改行タブなど以外か(?!.*\s).
	//　8-12文字{7,12}
	// 末尾$/
}

function isID(str){
	//4-24文字
	//英数字、アンダースコア(_)
	//最初の文字は英字
	passw = /^[A-Za-z]\w{3,24}$/;
	return str.match(passw);
}

///////////////

function checkId(value, require, err, err_name){
	//id
	//nickname
	if(require && !value){
		err[err_name] = 'not exists.';
	}else if(value && !isID(value)){
		err[err_name] = 'format error';
	}
	return err;
}

function checkPassword(value, require, err, err_name){
	if(require && !value){
		err[err_name] = 'not exists.';
	}else if(value && !isPassword(value)){
		err[err_name] = 'format error';
	}
	return err;
}

function checkBirthday(year, month, day, require, err, ery_name, erm_name, erd_name){
	if(require && !year){
		err[ery_name] = 'not exists.';
	}
	if(require && !month){
		err[erm_name] = 'not exists.';
	}
	if(require && !day){
		err[erd_name] = 'not exists.';
	}
	
	if(year){
		try{
			validate().check(year).isNumeric();
		}catch(e){
			err[ery_name] = 'format error.';
		}
		if(!err[ery_name]){
			var _date = new Date();
			if(year < 1900 || year > _date.getFullYear()){
				err[ery_name] = 'range error.';
			}
		}
	}
	if(month){
		try{
			validate().check(month).isNumeric();
		}catch(e){
			err[erm_name] = 'format error.';
		}
		if(!err[erm_name]){
			if(month < 1 || month > 12){
				err[erm_name] = 'range error.';
			}
		}
	}
	if(day){
		try{
			validate().check(day).isNumeric();
		}catch(e){
			err[erd_name] = 'format error.';
		}
		if(!err[erd_name]){
			var days = {
				1:31,
				2:28,
				3:31,
				4:30,
				5:31,
				6:30,
				7:31,
				8:31,
				9:30,
				10:31,
				11:30,
				12:31
			};
			if(year % 4 == 0){
				days['2'] = 29;
			}
			if(day > days[month]){
				err[erd_name] = 'range error.';
			}
		}
	}
	return err;
}

function checkGender(value, require, err, err_name){
	if(require && !value){
		err[err_name] = 'not exists.';
	}else if(value && value !== "male" && value !== "female"){
		err[err_name] = 'format error';
	}
	return err;
}

function checkEmail(value, require, err, err_name){
	if(require && !value){
		err[err_name] = 'not exists.';
	}else {
		try{
			if(value){
				validate().check(value).len(5,100).isEmail();
			}
		}catch(e){
			err[err_name] = 'format error';
		}
	}
	return err;
}

function checkCheckbox(value, require, err, err_name){
	if(require && !value){
		err[err_name] = 'not exists.';
	}else {
		try{
			if(value){
				validate().check(value).isNumeric();
			}
		}catch(e){
			err[err_name] = 'format error';
		}
	}
	return err;
}

function checkCaptchaDigit(value, req, require, err, err_name){
	if(require && !value){
		err[err_name] = 'not exists.';
	}else {
		try{
			if(value){
				//console.log("digits check");
				validate().check(value).isNumeric();
				//console.log("## digits:"+value+" = req:"+req.session.captcha);
				if(value !== req.session.captcha){
					//console.log("digits not match");
					err[err_name] = 'format error.';
				}
			}
		}catch(e){
			console.log("digit err:"+e);
			err[err_name] = 'format error.';
		}
	}
	return err;
}

function checkRkey(value, require, err, err_name){
	//rkey check
	if(require && !value){
		err[err_name] = 'not exists.';
	}else {
		try{
			if(value){
				validate().check(value).isAlphanumeric();
				if(value.length !== 64){
					console.log('##invalid length:rkey');
					err[err_name] = 'length error.';
				}
			}
		}catch(e){
			err[err_name] = 'format error.';
		}
	}
	return err;
}


exports.validate = validate;
exports.isPassword = isPassword;
exports.isID = isID;

exports.isNumeric = isNumeric;
exports.dataValidation = dataValidation;

exports.checkId = checkId;
exports.checkPassword = checkPassword;
exports.checkBirthday = checkBirthday;
exports.checkGender = checkGender;
exports.checkEmail = checkEmail;
exports.checkCheckbox = checkCheckbox;
exports.checkCaptchaDigit = checkCaptchaDigit;
exports.checkRkey = checkRkey;
