const fs = require('fs');
const path = require('path');
const { merge } = require('lodash');

/*
 * transform a script name to an entity name
 * Eg: "post.js" to "Post"
 */
function getEntityName(text) {
  const txt = text.toLowerCase().replace(/\.js$/, '')
  return txt.charAt(0).toUpperCase() + txt.slice(1)
};

/*
 * read all schemas from folder
 */
function loadSchemasFrom(folder) {
  const allTypes = [];
  const allQueries = [];
  const allMutations = [];
  let allResolvers = {};
  fs.readdirSync(folder)
    .filter(file => (file.indexOf('.') !== 0) && (file !== folder) && (file.slice(-3) === '.js'))
    .forEach(file => {
      const pathModule = path.join(folder, file);
      let item = require(pathModule);
      // process schema
      const { types = '', queries = '', mutations = '', resolvers = {} } = item;
      allTypes.push(types);
      allQueries.push(queries);
      allMutations.push(mutations);
      allResolvers = merge(allResolvers, resolvers);
    });
  return {
    allTypes, allQueries, allMutations, allResolvers
  }
}

/*
 * create type definitions and resolvers
 */
function createTypesAndResolversFrom(folder) {
  const { allTypes, allQueries, allMutations, allResolvers } = loadSchemasFrom(folder);
  const typeDefs = `
    ${allTypes.join('\n')}

    type Query {${allQueries.join('\n')}}

    type Mutation {${allMutations.join('\n')}}
  `;
  return {
    typeDefs,
    resolvers: allResolvers
  }
}

module.exports = {
  getEntityName,
  loadSchemasFrom,
  createTypesAndResolversFrom
};