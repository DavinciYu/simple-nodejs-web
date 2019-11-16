var output = {
	data: function(data) {
		return {'datas':data, 'result':true};
	},
	error: function(error) {
		return {'error':error, 'result':false};
	}
}

module.exports = output