

    "use strict";

    var express = require("express");
    var bodyParser = require('body-parser');
    var path = require('path');
    var childProcess = require('child_process');
    var phantomjs = require('phantomjs');
    var binPath = phantomjs.path;
    var Redis = require('ioredis');
    var util=require("util");

    var redis = new Redis({
        port: 15524,          // Redis port
        host: 'pub-redis-15524.us-east-1-4.3.ec2.garantiadata.com',   // Redis host
        family: 4,           // 4 (IPv4) or 6 (IPv6)
        password: 'qDj7aklHFsDVeCG4',
        db: 0
    });


    var app = express();
    app.use(bodyParser.json());



    app.get('/', function( req, res ) {




        redis.exists( req.query.uri, function( err, exists ){

            if ( exists ){
                console.log("retrieving from cache");
                redis.get( req.query.uri, function( err, result ){
                    console.log("got from cache");
                    res.writeHead( 200, {
                        'Content-Type': 'text/html; charset=utf-8',
                        'Content-Length': result.length
                    });

                    res.write(result);
                    res.end();
                });
            } else {
                var childArgs = [
                    path.join( process.cwd(), "src", 'phantomjs-script.js'),
                    req.query.uri
                ];
                console.log("getting live site");
                childProcess.execFile(binPath, childArgs, function( err, stdout, stderr) {

                    if ( err ){

                    }

                    if (!err){
                        redis.multi().set(req.query.uri, stdout).expire(req.query.uri,43200).exec(function (err, results) {

                            console.log("got live site");

                            res.writeHead( 200, {
                                'Content-Type': 'text/html; charset=utf-8',
                                'Content-Length': stdout.length
                            });



                            res.write(stdout);
                            res.end();
                        });

                    }
                });
            }
        });
    });

    function start(){

        var server = app.listen( process.env.PORT, function () {
            var host = server.address().address;
            var port = server.address().port;

            console.log('listening at http://%s:%s', host, port);
        });
    }

    start();