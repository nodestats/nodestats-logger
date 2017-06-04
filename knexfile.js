const config = require('./lib/config');

module.exports = {
    // client: 'sqlite3',
    // connection: {
    //     filename: './demo.sqlite3',
    // },
    client: config.database.client,
    connection: {
        host: config.database.connection.host,
        user: config.database.connection.user,
        password: config.database.connection.password,
        database: config.database.connection.database,
        filename: config.database.connection.filename
    },
    useNullAsDefault: true
};
