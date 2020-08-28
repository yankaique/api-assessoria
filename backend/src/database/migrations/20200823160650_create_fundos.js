
exports.up = function(knex) {
  return knex.schema.createTable('fundos', function(table){
    table.integer('id').primary();
    table.integer('cnpj').notNullable();
    table.string('nome').notNullable();
    table.integer('rendimentoAnual').notNullable();
  });
};

exports.down = function(knex) {
return knex.schema.dropTable('fundos');
};
