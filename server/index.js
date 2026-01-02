import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { connectDB, sequelize } from './sequelize.js';

import { User } from './models/user.js'

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    users: [User]
    books: [Book]
  }


`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    users: async (parent, args, context) => {
      // Access the User model from the context
      return await context.models.User.findAll();
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Pass the Sequelize models in the context
  context: ({ req }) => ({
    models: {
      User,
      // Add other models here
    },
    sequelize,
  })
});

connectDB().then(() => {
  startStandaloneServer(server, {
    context: async ({ req, res }) => {
      // Add the sequelize instance to the context
      return { db: sequelize }; 
    },
  }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
});