const merge = require('merge');
const jsonfile = require('jsonfile');

// This is our default config file... others override this...
let config = {
    "database": {
        "type": "none"
    },
    "server": {
        "http"  : 57473,
        "ip"    : "127.0.0.1",
        "apikey": "LetMeIn"
    },
    "dashboard": {
        "enabled": false
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

module.exports = config;