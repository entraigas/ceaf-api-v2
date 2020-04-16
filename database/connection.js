const { createSchema } = require('./schema');

// connect to db
const db = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './database/sqlite.db',
  },
  useNullAsDefault: true,
});

// create schema db
createSchema(db);

module.exports = db;
