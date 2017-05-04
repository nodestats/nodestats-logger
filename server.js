const os = require('os');
const http = require('http');
const merge = require('merge');
const jsonfile = require('jsonfile');

//backfill ES7, because it's lovely!
const async = require('asyncawait/async');
const await = require('asyncawait/await');

const express = require('express');
const bodyParser = require('body-parser');

const VERSION_MAJOR = 0;
const VERSION_MINOR = 0;
const VERSION_PATCH = 2;

// Override these by a config JSON object, see config.json.example for details

let config = {
    "database": {

    },
    "server": {
        "http"  : 57473,
        "ip"    : "127.0.0.1",
        "apikey": "LetMeIn"
    }
};

try {
    if (typeof process.argv[2] !== "undefined")
        config = merge(config, jsonfile.readFileSync(process.argv[2]));
} catch(err) {
    console.error(`Sorry: ${err}`);
    console.info("  --Time to die. x");
    process.exit();
}

const servers = {};

// Start Express
const app = express();
//
// // middleware to use for all requests
// app.use(function(req, res, next) {
//     // do logging
//     console.log('Something is happening.');
//     next(); // make sure we go to the next routes and don't stop here
// });

app.route('/')
    .get(function(req, res) {
        res.end("<HTML>I'M THE ONLY TEMPLATE IN THE WHOLE VILLAGE</HTML>");
    });


// test route to make sure everything is working (accessed at GET http://localhost:57475/api)
app.route('/dashboard')
    .get(function(req, res) {
        res.json({
            servers: servers
        });
    });

//////////////////////////////////////////////////////////////////////////
//
// Add middleware for POSTs, and handle them too..
//
//////////////////////////////////////////////////////////////////////////
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/', function(req, res) {
    if(typeof req.body.HOSTNAME !== "undefined") {
        console.log("   >>> UPDATING: '"+req.body.HOSTNAME+"'");
        servers[req.body.HOSTNAME] = req.body;
    }
    res.end();
});

// START THE SERVER
// =============================================================================

app.listen(config.server.http, config.server.ip);
console.log("nodestats-logger is listening on http://"+config.server.ip+":"+config.server.http+"/");