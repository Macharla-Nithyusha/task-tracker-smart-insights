exports.up = function(knex) {
  return knex.schema.createTable('tasks', function(table) {
    table.increments('id').primary();
    table.string('title', 255).notNullable();
    table.text('description');
    table.enu('priority', ['Low','Medium','High']).notNullable().defaultTo('Medium');
    table.date('due_date');
    table.enu('status', ['Todo','In Progress','Done']).notNullable().defaultTo('Todo');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index(['status']);
    table.index(['priority']);
    table.index(['due_date']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tasks');
};
