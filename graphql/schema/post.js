const path = require('path');
const { getEntityName } = require('../utils')
const scriptName = path.basename(__filename);

/*
 *  start configuration
 */

const Entity = getEntityName(scriptName);
const Entities = `${Entity}s`;
const tableName = 'posts';

const types = `
type ${Entity} {
  id: Int!
  title: String!
  description: String
}
`;

const queries = `
  all${Entities}(page: Int): [${Entity}!]
  countAll${Entities}: Int
  get${Entity}ById(id: Int!): ${Entity}!
`;

const mutations = `
  create${Entity}(title: String, description: String): ${Entity}
  update${Entity}(id: Int, title: String, description: String): ${Entity}
  delete${Entity}(id: Int): Int
`;

const resolvers = {
  Query: {
    [`all${Entities}`]: (parent, { page = 0 }, context) => {
      if (page && page > 0) {
        return context.crud.getPage(tableName, page);
      }
      return context.crud.getAll(tableName);
    },
    [`countAll${Entities}`]: (parent, { id }, context) => context.crud.countAll(tableName),
    [`get${Entity}ById`]: (parent, { id }, context) => context.crud.getById(tableName, id),
  },
  Mutation: {
    [`create${Entity}`]: (parent, args, context) => context.crud.insert(tableName, args),
    [`update${Entity}`]: (parent, { id, ...data }, context) => context.crud.update(tableName, id, data),
    [`delete${Entity}`]: (parent, { id }, context) => context.crud.remove(tableName, id)
  }
};

/*
 *  end configuration
 */

if (tableName === '') {
  throw `Please setup the "tableName" in ${scriptName}`;
}

module.exports = {
  types,
  queries,
  mutations,
  resolvers
};