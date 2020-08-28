
exports.up = function(knex) {
    return knex.schema.createTable('assessor', function(table){
        table.string('id').primary();
        table.string('nome').notNullable();
        table.string('senha').notNullable();
        table.integer('telefone').notNullable();
        table.string('email').notNullable();
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('assessor');
};
