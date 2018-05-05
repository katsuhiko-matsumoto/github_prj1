var cron = require('cron');
var fs = require('fs');
var util = require('util');
var http = require('http');

var express = require('express');
var form = require('connect-form');

var config;
var log;

var includer = require('./script/common/requires');
var crons = {};

var names = {
	crons:[
	       //'mailsend',
	       'registedmail',
	       'registmail',
	       'remindedmail',
	       'remindmail',
	       'p2pstate'
	       ]
};

function registerCron(name) {
	var target = require('./script/controller/cron/queueserver/' + name);
	crons[name] = new cron.CronJob({
			cronTime:target.cronPattern,
			onTick:function() {
				log.debug('Executing cron job', name);
				try {
					target.execute();
				} catch (e) {
					log.error('Error while executing cron job', e);
				}
			}
	});
	log.info('Added cron ['+name+'] with ['+target.cronPattern+']');
};

console.log("# queuemailsender [now enc mode] pid:"+process.pid);
includer.requires('./script/config/index.js', function(value){
 	config = value;
    proceed();
});

function proceed(){
	log = includer.requires('./script/common/log');
	//var nlog = includer.requires('./script/service/logger');
	var bootstrap = includer.requires('./script/bootstrap');
	util.log('Node version:'+process.version+" pid:"+process.pid);
	
	bootstrap.setup(false, function(){
		//cron register
		names.crons.forEach(registerCron);
		//cron job start
		for(var n in crons){
			crons[n].start();
		}
		log.info("mailqueue server has started");
		process.on('uncaughtException', function(err){
			log.error(err);
		});
	});

	var exit = function() {
		// Clearing all resources
		log.info('Cleaning cron resources.');
		for (var n in crons) {
			if (n) {
				var cron = crons[n];
				if (cron.timeoutId) {
					clearTimeout(cron.timeoutId);
				}
				if (cron.timer) {
					clearInterval(cron.timer);
				}
			}
		}
		bootstrap.exit(function() {
			process.exit(0);
		});
	};

	//サーバー終了処理
	process.on('SIGTERM', function() {
		log.info('Got SIGTERM');
		exit();
	});

	process.on('SIGINT', function() {
		log.info('Got SIGINT');
		exit();
	});

	process.on('exit', function() {
		log.info('Server is going down');
	});
}

