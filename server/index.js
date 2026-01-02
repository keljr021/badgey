import 'dotenv/config';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { connectDB, sequelize } from './sequelize.js';

import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';

import { User } from './models/user.js'

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const app = express();
const port = 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Pass the Sequelize models in the context
  context: ({ req }) => ({
    models: {
      User,
    },
    sequelize,
  })
});

await server.start();


connectDB().then(() => {

  app.get('/', (req, res) => {
    res.send('Welcome to the API!');
  });

  app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}`)
  );
});