const bookshelf = require('../bookshelf');

class Model extends bookshelf.Model {
    get hasTimestamps() {
        return true;
    }

    findAll(filter, options) {
        return this.forge().where(filter).fetchAll(options);
    }

    findOne(query, options) {
        return this.forge(query).fetch(options);
    }

    create(data, options) {
        return this.forge(data).save(null, options);
    }
}

module.exports = Model;