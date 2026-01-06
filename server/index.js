import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import { ruruHTML } from 'ruru/server';
import { v4 as uuidv4 } from 'uuid';

import express from 'express';

import { User } from './models/user.js';
import { Badge } from './models/badge.js';

 
// Construct a schema, using GraphQL schema language
const schema = buildSchema(
`
  type Badge {
    id: String
    userId: String
    image: String
    name: String
    description: String
    createdAt: String
    isApproved: Boolean
    rejectReason: String
  }

  input CreateBadge {
    userId: String
    image: String
    name: String
    description: String
  }

  type User {
    id: String
    type: String
    image: String
    name: String
    username: String
    email: String
    dob: String
    password: String
    company: String
    description: String
    createdAt: String
    badges: [Badge] 
  }

  input CreateUser {
    type: String
    image: String
    name: String
    username: String
    email: String
    dob: String
    password: String
    company: String
    description: String
  }

  type Query {
    badges: [Badge]
    badge(id: String): Badge
    users: [User] 
    user(id: String): User
  }

  type Mutation {
    createBadge(input: CreateBadge): Badge
    updateBadge(id: String, input: CreateBadge): Badge
    deleteBadge(id: ID): String
    createUser(input: CreateUser): User
    updateUser(id: ID, input: CreateUser): User
    deleteUser(id: ID): String
  }
`
);
 
// The root provides a resolver function for each API endpoint
const root = {
  async badges() {
    await Badge.findAll();
  },

  async badge(id) {
    await Badge.findByPk(id);
  },

  async createBadge(input) {
    let newBadge = { ...input };
    newBadge.id = uuidv4();
    newBadge.password = Buffer.from(badge.password);

    await Badge.create(newBadge);
  },

  async updateBadge(id, input) {
    await Badge.update(input, { 
      where: { 
        id: id 
      }
    });
  },

  async deleteBadge(id) {
    await Badge.destroy({
      where: {
        id: id
      }
    });
  },

  async users() {
    await User.findAll();
  },

  async user(id) {
    await User.findByPk(id);
  },

  async createUser(input) {
    console.log('input values: ', input);
    let newUser = input.input;
    let uuid = (uuidv4()).toString();
    console.log('new user data: ', newUser, ' id: ', uuid);
    await User.create({
      id: uuid,
      type: newUser.type,
      full_name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      dob: newUser.dob,
      password: Buffer.from(newUser.password),
      company: newUser.company,
      description: newUser.description,
      createdAt: new Date().toISOString()
    });
    return newUser;
  },

  async updateUser(id, input) {
    await User.update(input, { 
      where: { 
        id: id 
      }
    });
  },

  async deleteUser(id) {
    await User.destroy({
      where: {
        id: id
      }
    });
  },
};
 
const app = express();
 
// Create and use the GraphQL handler.
app.all(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: root,
  }),
);

app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

app.listen(4000, () =>
  console.log(`🚀 Server ready at http://localhost:4000`)
);