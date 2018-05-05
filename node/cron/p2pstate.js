//
var includer = require('../../../common/requires');
var log;
var config;
var service;

function P2pState(){
	// 5 min
	//this.cronPattern = '* */5 * * * *';
	this.cronPattern = '0,15,30,45 * * * * *';
	//this.current = null;
	includer.requires('./script/config/index.js',function(_config){
		config = _config;
		includer.requires('./script/controller/web/web.js',function(_sender){
			service = _sender;
			log = includer.requires('./script/common/log');
		});
	});
}

module.exports = new P2pState();

//avoid duplicate executing.
var nowProcessing = false;

P2pState.prototype.execute = function(){
	log.debug('execute p2pstate processing:'+nowProcessing);
	if(nowProcessing){
		log.info('!!!!! now processing p2p');
		return;
	}
	
	nowProcessing = true;
	service.checkP2pState(function(err){
		//log.info('!!!!! p2pstate callbacked:'+nowProcessing);
		if(err){
			log.error(err);
		}
		nowProcessing = false;
	});
};