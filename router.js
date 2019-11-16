var express = require('express')
var router = express.Router()

// define the home page route
router.get('/', function (req, res) {
	console.log(req);
  	res.sendFile( __dirname + "/" + "index.html" );
})
// define the about route
router.get('/user', function (req, res) {
	console.log(req);
	var index = require('./control/index');
	index.getName(req, res);
})

router.get('/log', function (req, res) {
	var index = require('./control/index');
	index.writeLog(req, res);
})

router.get('/logAll', function (req, res) {
	var index = require('./control/index');
	index.writeLogAll(req, res);
})

module.exports = router