
exports.up = function(knex) {
    return knex.schema.createTable('cliente', function(table){
          table.string('id').primary();
          table.string('nome').notNullable();
          table.integer('cpf').notNullable();
          table.string('email').notNullable();
          table.string('id_assessor').notNullable();
          table.foreign('id_assessor').references('id').inTable('assessor')
      });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('cliente');
  };
  