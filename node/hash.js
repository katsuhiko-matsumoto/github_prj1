var crypto = require('crypto');

function sha1hash(hashArg){
	var sum = crypto.createHash('sha1');
	sum.update(hashArg);
	return hashArg = sum.digest('hex');
}

function sha256hash(hashArg){
	var sum = crypto.createHash('sha256');
	sum.update(hashArg);
	return hashArg = sum.digest('hex');
}

function md5hash(hashArg){
	var sum = crypto.createHash('md5');
	sum.update(hashArg);
    return sum.digest('hex');
}

exports.sha1hash = sha1hash;
exports.sha256hash = sha256hash;
exports.md5hash = md5hash;
