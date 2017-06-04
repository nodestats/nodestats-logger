const express = require('express');
const router = express.Router();

const Server = require('../models/server');

//////////////////////////////////////////////////////////////////////////
//
// Most of the logic here actually takes place in the dashboard controller
// this file only gets loaded if the route itself is enabled
//
//////////////////////////////////////////////////////////////////////////

router.route('/')
    .get(function(req, res) {
        Server
            .fetchAll()
            .then(function(newServers) {
                console.log("DB SErver", newServers);
                res.json([ servers, newServers]);
            });
    });

module.exports = router;