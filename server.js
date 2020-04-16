const cors = require('cors');
const express = require('express');
const ExpressGraphQL = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');

// database settings
const crud = require('./database/crud');

// graphql settings
const { typeDefs, resolvers } = require('./graphql');
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// server settings
const port = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use('/graphql', ExpressGraphQL({ schema, context: { crud }, graphiql: true }));
app.listen(port, () => {
  console.log(`GraphQL server running at http://localhost:${port}.`);
});
