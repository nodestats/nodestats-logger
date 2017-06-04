//backfill ES7, because it's lovely!
const async = require('asyncawait/async');
const await = require('asyncawait/await');

const express = require('express');
const bodyParser = require('body-parser');

const config = require('./lib/config');

const VERSION_MAJOR = 0;
const VERSION_MINOR = 0;
const VERSION_PATCH = 3;

// Start Express
const app = express();

app.disable('x-powered-by');


app.use('/dashboard', require('./routes/dashboard'));

app.route('/')
    .get(function(req, res) {
        res.end("<HTML>I'M THE ONLY TEMPLATE IN THE WHOLE VILLAGE</HTML>");
    });

//////////////////////////////////////////////////////////////////////////
//
// Add middleware for POSTs, and handle them too..
//
//////////////////////////////////////////////////////////////////////////
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', require('./routes/logger'));

app.use(function(req, res) {
    console.log("ACCESS FAIL: ",req);
    res.removeHeader('Content-Length');
    res.removeHeader('Connection');
    res.removeHeader('Transfer-Encoding');
    res.removeHeader('Date');
    res.end();
    return;
});


// START THE SERVER
// =============================================================================

app.listen(config.server.http, config.server.ip);
console.log("nodestats-logger is listening on http://"+config.server.ip+":"+config.server.http+"/");