const express = require('express');
const path = require('path');
const app = express();

const fs = require('fs');

app.use(express.static(path.join(__dirname, 'static')));

var router = require('./router')
app.use('/', router)

var server = app.listen(8080, ()=>{
    console.log("服务已开启");
});