exports.up = function(knex) {
    return knex.schema
        .createTable('servers', function(table) {
            table.increments('id').unsigned().primary();
            table.string('hostname').notNull().unique();
            table.enum('state', ['S_OFFLINE', 'S_WARNING', 'S_ONLINE']);
            table.dateTime('created_at').notNull();
            table.dateTime('updated_at').nullable();
            table.dateTime('deleted_at').nullable();

            table.comment("All Servers, over time");
        })

        .createTable('logs', function(table) {
            table.increments('id').unsigned().primary();
            table.json('payload').notNull();

            table.integer('server_id').unsigned().references('id').inTable('servers').notNull().onDelete('cascade');

            table.dateTime('created_at').notNull();
            table.dateTime('recorded_at').nullable();

            table.dateTime('updated_at').nullable();

            table.comment("Log Lines, one record per log call, per server");
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('logs')
        .dropTable('servers');
};
