var mysql = require('../data/db');
var output = require('../core/function');

var index = {
	getName: function(req, res) {
		var result = mysql.select('member');
		result.then((result)=>{
			res.json(output.data(result))
		}).catch((error)=>{
			res.json(output.error(error))
		});
	},
	writeLog: function(req, res) {
		var param = {};
		param.log_desc = req.query.log;
		param.member_id = req.query.member_id;
		param.log_ip = req.ip;

		var time = (new Date()).getTime();
		param.log_time = parseInt(time/1000);

		var result = mysql.insert('log', param);
		result.then((result)=>{
			res.json(output.data(1))
		}).catch((error)=>{
			res.json(output.error(error))
		});
	},
	writeLogAll: function(req, res) {
		var param1=[];
		param1[0]={};
		param1[1]={};
		param1[0].log_desc = '第一条';
		param1[0].member_id = 1;
		param1[0].log_ip = req.ip;
		param1[0].log_time = 1573849883;
		param1[1].log_desc = '第二条';
		param1[1].member_id = 2;
		param1[1].log_ip = req.ip;
		param1[1].log_time = 1573849883;

		var result = mysql.insertAll('log', param1);
		result.then((result)=>{
			res.json(output.data(1))
		}).catch((error)=>{
			res.json(output.error(error))
		});
	}
}

module.exports = index