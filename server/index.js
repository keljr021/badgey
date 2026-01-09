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
  scalar Upload

  type Badge {
    id: String
    userId: String
    image: Upload
    name: String
    description: String
    createdAt: String
    isApproved: Boolean
    rejectReason: String
  }

  input CreateBadge {
    userId: String
    image: Upload
    name: String
    description: String
    isApproved: Boolean    
    rejectReason: String
    createdAt: String
  }

  type User {
    id: String
    userType: String
    image: Upload
    name: String
    username: String
    email: String
    dob: String
    password: String
    company: String
    description: String
    createdAt: String
    lastLogin: String
  }

  input CreateUser {
    userType: String
    image: Upload
    name: String
    username: String
    email: String
    dob: String
    password: String
    company: String
    description: String
    createdAt: String
    lastLogin: String

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
    updateUser(id: String, input: String): User
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

  async createUser({ input }) {
    input.dob = new Date(input.dob).toISOString();
    input.createdAt = new Date().toISOString();
    input.lastLogin = new Date().toISOString();

    
    let newUser = await User.create(input);
    return newUser;
  },

  async updateUser({ id, input }) {   
    return await User.update(input, { 
      where: { 
        id: id 
      }
    });
  },

  async deleteUser({ id }) {
    await User.destroy({
      where: {
        id: id
      }
    });
    return 'User ' + id + ' deleted.';
  },

  async loginUser({ username, password }) {
    let targetUser = await User.findOne({
      where: {
        [Op.or]: [
          {username: username },
          {email: username }
        ]
      }
    });

    if (targetUser) {
      let comparePasswords = await bcrypt.compare(password, String(targetUser.password));
      if (comparePasswords) {
        // targetUser.lastLogin = new Date().toISOString();
        // targetUser.save();
        return targetUser;
      }
    }

    return null;
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