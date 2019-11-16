var database = require('mysql');
var config = require('./config');

var mysql={
	connect: function(){
		var connection = database.createConnection({
			host:config.dbhost,
			user:config.dbuser,
			password:config.dbpassword,
			database:config.dbname
		});
		connection.connect();
		return connection;
	},
	select: function(table, where='*', sort=''){
		var connect = this.connect();
		table = config.dbpre+table;
		var sql = 'SELECT '+where+' FROM '+table;

		return new Promise((resolve, reject)=>{
			connect.query(sql, function(err, result) {
				if(err) {
					reject(err.message);
					return;
				}
				resolve(result);
			});
			connect.end();
		});
	},
	insert: function(table, data) {
		var _this = this;
		return new Promise((resolve, reject)=>{
			var connect = _this.connect();
			table = config.dbpre+table;
			
			connect.query('INSERT INTO '+table+' SET ?', data, function (err, result) {
		        if(err){
		          	reject(err.message);
		          	return;
		        }   
				resolve(result);      
			});
			connect.end();
		});
	},
	insertAll: function(table, data) {
		var _this = this;
		return new Promise((resolve, reject)=>{
			var connect = _this.connect();
			table = config.dbpre+table;
			
			if(!data.length>0) {
				reject('数据格式错误');
			}
			var insertName = [];
			var insertValue = [];
			for(var i=0, ilength=data.length; i<ilength; i++) {
				var value = data[i];
				var insertValueEach = [];
				for(var j in value) {
					if(i==0) {
						insertName.push(j);
					}
					if(typeof(value[j]) == 'string') {
						value[j] = '\''+value[j]+'\'';
					}
					insertValueEach.push(value[j]);
				}
				insertValueEach = '('+insertValueEach.join(',')+')';
				insertValue.push(insertValueEach);
			}
			insertName = insertName.join(',');
			insertValue = insertValue.join(',');

			connect.query('INSERT INTO '+table+' ('+insertName+') VALUES '+insertValue, {}, function (err, result) {
		        if(err){
		          	reject(err.message);
		          	return;
		        }   
				resolve(result);      
			});
			connect.end();
		});
	}
}

module.exports = mysql