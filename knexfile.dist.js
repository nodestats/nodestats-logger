module.exports = {
    // client: 'sqlite3',
    // connection: {
    //     filename: './demo.sqlite3',    // Example performance records
    //     filename: './my_data.sqlite3', // If you don't have a proper SQL server...
    // },
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'your_database_user',
        password : 'your_database_password',
        database : 'myapp_test'
    },
    useNullAsDefault: true
};
