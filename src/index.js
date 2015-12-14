

"use strict";

var express = require("express");
var bodyParser = require('body-parser');
var marked = require('marked');
var uuid = require('uuid');

var fs = require("fs");

//   var throng = require("throng");
var app = express();
app.set('view engine', 'jade');
app.set('views', './src/tmpl');

app.use(express.static('./src/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false, limit: 2048 }));

// parse application/json

// var upload = multer({ dest: 'tmp/' });

//new Redis('redis://:authpassword@127.0.0.1:6380/4')

//var redis = new Redis({
//    port: 15524,          // Redis port
//    host: 'pub-redis-15524.us-east-1-4.3.ec2.garantiadata.com',   // Redis host
//    family: 4,           // 4 (IPv4) or 6 (IPv6)
//    password: 'qDj7aklHFsDVeCG4',
//    db: 0
//});





app.get('/', function( req, res ) {

    res.write("browser");
});



function start(){

    var server = app.listen( process.env.PORT, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('listening at http://%s:%s', host, port);
    });
}

start();