

"use strict";

var express = require("express");
var bodyParser = require('body-parser');



//   var throng = require("throng");
var app = express();


app.use(bodyParser.json());


app.get('/', function( req, res ) {

    res.write("browser");
    res.end();
});



function start(){

    var server = app.listen( process.env.PORT, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('listening at http://%s:%s', host, port);
    });
}

start();