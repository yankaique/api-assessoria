
exports.up = function(knex) {
    return knex.schema.createTable('proposta', function(table){
        table.integer('codigo').notNullable();
        table.decimal('valor').notNullable();
        table.string('tipoPagamento').notNullable();
        table.string('id_fundos').notNullable();
        table.foreign('id_fundos').references('id').inTable('fundos');
        table.string('id_cliente').notNullable();
        table.foreign('id_cliente').references('id').inTable('cliente');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('proposta');
};
