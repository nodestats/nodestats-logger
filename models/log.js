const bookshelf = require('../bookshelf');
const Model = require('./model');

class Log extends Model {
    get tableName() {
        return 'logs';
    }

    get server() {
        return this.belongsTo('Server');
    }

    static byHostname(hostname) {
        return this.forge().query({where:{ hostname: hostname }}).fetch();
    }
}

module.exports = bookshelf.model('Log', Log);