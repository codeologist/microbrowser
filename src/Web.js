
    "use strict";

    var http = require("http");
    var util=require("util");


    function Cse( query ){
        this.query = query;
    }

    Cse.prototype.fetch = function(){
        var cse = this;

        var post_data = JSON.stringify({
            'uri' : util.format("%s&q=%s", cseurl, cse.query ),
            'password': 'txftt10t'
        });

        var post_options = {
            host: 'browser.codeology.co.nz',
            port: '80',
            path: '/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(post_data)
            }
        };

        return new Promise( function( resolve, reject ){
            console.log(">>>>",post_options)
            var post_req = http.request(post_options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    console.log( ">>>>>",chunk );
                });
            });

            post_req.write(post_data);
            post_req.end();
        });
    };

    module.exports = Cse;