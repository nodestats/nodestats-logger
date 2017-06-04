const bookshelf = require('../bookshelf');
const Model = require('./Model');

class Server extends Model {
    get tableName() {
        return 'servers';
    }

    get logs() {
        return this.hasMany('Log');
    }

    debug(stuff) {
        console.log("SERVER.DEBUG");
        console.log(this);
        console.log(stuff);
    }

    static byHostname(hostname) {
        return this.forge().query({where:{ hostname: hostname }}).fetch();
    }

    static byState(state) {
        return this.forge().query({where:{ state: state }}).fetch();
    }

}

module.exports = bookshelf.model('Server', Server);