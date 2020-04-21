/*
 * CRUD functions using knex lib
 */

const db = require('./connection');

// select * from {table}
const getAll = tableName => db(tableName)
  .select()
  .then(rows => rows);

// select count(*) from {table}
const countAll = tableName => db(tableName)
  .count('* as total')
  .then(rows => rows[0]['total']);

// select * from {table} limit 10, offset {page}
const getPage = (tableName, unsafePage = 1) => {
  const limit = 10;
  const page = parseInt(unsafePage, 10);
  const offset = page > 1 ? (page - 1) * limit : 0;
  return db(tableName)
    .select()
    .limit(limit)
    .offset(offset)
    .then(rows => rows);
};

// select * from {table} where id = {id}
const getById = (tableName, id) => db(tableName)
  .select()
  .where({ id })
  .limit(1)
  .then((rows) => rows[0]);

// insert into {table} values(...data)
const insert = (tableName, data) => {
  const params = { ...data };
  return new Promise((resolve, reject) => {
    db(tableName)
      .insert(params)
      .then((array) => {
        getById(tableName, array[0] || 0).then(row => resolve(row))
      })
      .catch(() => reject(params));
  });
};

// update {table} set ... where id = {id}
const update = (tableName, id, data) => {
  const params = { ...data };
  if (params && params.id) {
    delete (params.id);
  }
  return new Promise((resolve, reject) => {
    db(tableName)
      .where({ id })
      .update(params)
      .then((array) => {
        getById(tableName, array[0] || 0).then(row => resolve(row))
      })
      .catch(() => reject(params));
  })
};

// delete from {table} where id = {id}
const remove = (tableName, id) => db(tableName)
  .where({ id })
  .del()
  .then(() => true)
  .catch(() => false);

// done!
module.exports = {
  getAll,
  countAll,
  getPage,
  getById,
  insert,
  update,
  remove,
};
