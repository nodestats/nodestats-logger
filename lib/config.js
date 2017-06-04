const fs = require('fs');
const path = require('path');
const merge = require('merge');
const jsonfile = require('jsonfile');

let config;

function resolveHome(filepath) {
    if (filepath[0] === '~') {
        return path.join(process.env.HOME, filepath.slice(1));
    }
    return filepath;
}


try {
    // Were we passed a config file?
    if (typeof process.argv[2] !== "undefined") {
        console.log("nodestats-logger using custom provided config file");
        config = merge(config, jsonfile.readFileSync(process.argv[2]));
    } else
    // Do we have a local config file in our dir?
    if (fs.existsSync('./config.json')) {
        console.log("nodestats-logger using local config file");
        config = merge(config, jsonfile.readFileSync('./config.json'));
    } else
    // Do we have a local config file in our dir?
    if (fs.existsSync(resolveHome('~/.nodestats-logger.json'))) {
        console.log("nodestats-logger using user's own config file");
        config = merge(config, jsonfile.readFileSync(resolveHome('~/.nodestats-logger.json')));
    } else
    // Do we have a local config file in our dir?
    if (fs.existsSync('/etc/nodestats-logger.json')) {
        console.log("nodestats-logger using system config file");
        config = merge(config, jsonfile.readFileSync('/etc/nodestats-logger.json'));
    } else {
        console.error(`Sorry: No configuration files found, looked in lots of places, cowardly discontinuing now...`);
        console.info("  --Time to die. x");
        process.exit();
    }
} catch(err) {
    console.error(`Sorry: ${err}`);
    console.info("  --Time to die. x");
    process.exit();
}

module.exports = config;