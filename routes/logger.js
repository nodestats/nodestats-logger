const express = require('express');
const router = express.Router();

const async = require('asyncawait/async');
const await = require('asyncawait/await');

const config = require('../lib/config');

const Server = require('../models').Server;
const Log = require('../models').Log;

router.route('/')
    .post(async(function(req, res) {
        // Check the API key...
        if(req.body.APIKEY !== config.server.apikey) {
            console.log("ACCESS FAIL: ",req);
            res.removeHeader('Content-Length');
            res.removeHeader('Connection');
            res.end();
            return;
        }

        res.set("Connection", "close");
        if(typeof req.body.HOSTNAME !== "undefined") {
            console.log("REQUEST FROM: "+req.body.HOSTNAME);

            let server = await(Server.byHostname(req.body.HOSTNAME));
            if(server==null) {
                console.log("CREATE SERVER: ",req.body.HOSTNAME);
                server = await(new Server({
                    hostname: req.body.HOSTNAME,
                    state: 'S_ONLINE',
                }).save());
            }

            // make record
            let log = await(new Log({
                server_id: server.id,
                payload: JSON.stringify(req.body.PAYLOAD),
                recorded_at: req.body.TIMESTAMP
            }).save());

            console.log("CREATE LOG with ID: ",log.id," FOR ",req.body.HOSTNAME);


            //rebuild overall response JSON... and string it... ONCE...

            // FOR THE FOO.CHAR:: calculate alarms

            // FOR THE FOO.CHAR:: ping the sockets?
        }

        res.end(null);
    }))
;

module.exports = router;