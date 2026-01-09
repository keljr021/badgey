import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import { ruruHTML } from 'ruru/server';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

import express from 'express';
import cors from 'cors';

import { User } from './models/user.js';
import { Badge } from './models/badge.js';
import { Sequelize, Op } from 'sequelize';

 
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
    isApproved: Boolean    
    rejectReason: String
    createdAt: String
  }

  type User {
    id: String
    userType: String
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
    userType: String
    image: String
    name: String
    username: String
    email: String
    dob: String
    password: String
    company: String
    description: String
    createdAt: String
  }

  type Query {
    badges: [Badge]
    badge(id: String): Badge
    users: [User] 
    user(id: String): User
    searchUsers(query: String): [User]
    loginUser(username: String, password: String): User
  }

  type Mutation {
    createBadge(input: CreateBadge): Badge
    updateBadge(id: String, input: CreateBadge): Badge
    deleteBadge(id: String): String
    createUser(input: CreateUser): User
    updateUser(id: String, input: CreateUser): User
    deleteUser(id: String): String
  }
`
);
 
// The root provides a resolver function for each API endpoint
const root = {
  async badges() {
    const badges = await Badge.findAll();
    return badges;
  },

  async badge({ id }) {
    const targetBadge = await Badge.findByPk(id);
    return targetBadge;
  },

  async createBadge({ input }) {
    const newBadge = await Badge.create({
      userId: input.userId,
      image: input.image,
      name: input.name,
      description: input.description,
      createdAt: new Date().toISOString(),
      isApproved: false,
      rejectReason: ''
    });
    return newBadge;
  },

  async updateBadge({ id, input }) {
    await Badge.update(input, { 
      where: { 
        id: id 
      }
    });
    const targetBadge = await Badge.findByPk(id);
    return targetBadge;
  },

  async deleteBadge({ id }) {
    const targetBadge =  Badge.destroy({
      where: {
        id: id
      }
    });
    return 'Badge ' + id + ' deleted.';
  },

  async users() {
    let users = await User.findAll();
    return users;
  },

  async user({ id }) {
    const targetUser = await User.findByPk(id, { raw: true });
    return targetUser;
  },

  async searchUsers({ query }) {
    let where = {};

    let queryArray = query.split(',');

    for(let queryItem in queryArray) {
      let keyVal = queryItem.split('=');
      where[keyVal[0]] = keyVal[1];
    }

    let targetUsers = await User.findAll({
      where: where
    });
    return targetUsers;
  },

  async loginUser({ username, password }) {
    let targetUser = await User.findAll({
      where: {
        [Op.or]: [
          {username: username},
          {email: username}
        ]
      }
    });

    if (targetUser.length > 0) {
      let firstUser = targetUser[0];
      let comparePasswords = await bcrypt.compare(password, String(firstUser.password));

      if (comparePasswords) return firstUser;
    }

    return null;
  },

  async createUser({ input }) {
    input.dob = new Date(input.dob).toISOString();
    input.createdAt = new Date().toISOString();
    
    let newUser = await User.create(input);
    return newUser;
  },

  async updateUser({ id, input }) {    
    await User.update(input, { 
      where: { 
        id: id 
      }
    });
    const targetUser = await User.findByPk(id);
    return targetUser;
  },

  async deleteUser({ id }) {
    await User.destroy({
      where: {
        id: id
      }
    });
    return 'User ' + id + ' deleted.';
  },
};
 
const app = express();
app.use(cors());
 
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