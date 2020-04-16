// Create a tables
const createSchema = db => {
  db.schema.hasTable('media_categories').then((exist) => {
    if (!exist) {
      db.schema.createTable('media_categories', (table) => {
        table.increments('id');
        table.string('name');
        table.timestamp('created_at').defaultTo(db.fn.now());
      }).then(() => console.log('creating media_categories table'));
    }
  });

  db.schema.hasTable('media').then((exist) => {
    if (!exist) {
      db.schema.createTable('media', (table) => {
        table.increments('id');
        table.string('name');
        table.string('url');
        table.string('file');
        table.integer('media_category_id').unsigned().references('media_categories.id');
        table.timestamp('created_at').defaultTo(db.fn.now());
      }).then(() => console.log('creating media table'));
    }
  });

  db.schema.hasTable('folders').then((exist) => {
    if (!exist) {
      db.schema.createTable('folders', (table) => {
        table.increments('id');
        table.string('name');
        table.timestamp('created_at').defaultTo(db.fn.now());
      }).then(() => console.log('creating folders'));
    }
  });

  db.schema.hasTable('folder_media').then((exist) => {
    if (!exist) {
      db.schema.createTable('folder_media', (table) => {
        table.increments('id');
        table.integer('folder_id').unsigned().references('folders.id').index();
        table.integer('media_id').unsigned().references('media.id');
        table.timestamp('created_at').defaultTo(db.fn.now());
      }).then(() => console.log('creating folder_media table'));
    }
  });

  db.schema.hasTable('posts').then((exist) => {
    if (!exist) {
      db.schema.createTable('posts', (table) => {
        table.increments('id');
        table.string('title');
        table.string('description');
        table.timestamp('created_at').defaultTo(db.fn.now());
      }).then(() => console.log('creating posts table'));
    }
  });
}

module.exports = {
  createSchema
}
