const path = require('path');
const { createTypesAndResolversFrom } = require('./utils');

// process schema folder
const folder = path.join(__dirname, 'schema');
const { typeDefs, resolvers } = createTypesAndResolversFrom(folder);

// done!
module.exports = { typeDefs, resolvers };
