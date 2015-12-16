

    var system = require('system');
    var args = system.args;
    var page = require('webpage').create();

    var uri = args[1] + "";

    page.open( uri, function (status) {
        if (status !== 'success') {
            console.log('Unable to access network');
        } else {
            var p = page.evaluate(function () {
                return document.getElementsByTagName('html')[0].innerHTML
            });
            console.log(p);
        }
        phantom.exit();
    });