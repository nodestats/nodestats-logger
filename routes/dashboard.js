const express = require('express');
const router = express.Router();

const Server = require('../models/server');

let servers = [1,2,3];

router.route('/')
    .get(function(req, res) {
        Server
            .fetchAll()
            .then(function(newServers) {
                console.log("DB SErver", newServers);
                console.log("Old SErver", servers);
                res.json([ servers, newServers]);
            });
    });

module.exports = router;