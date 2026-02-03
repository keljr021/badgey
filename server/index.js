import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import { db } from './drizzle.js'
import { eq, or, like, sql } from 'drizzle-orm';
import { ruruHTML } from 'ruru/server';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

import express from 'express';
import cors from 'cors';

import { User } from './models/user.js';
import { Badge } from './models/badge.js';

 
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
    isDraft: Boolean
    status: String
    rejectReason: String
    users: [User]
  }

  input BadgeInfo {
    id: String
    userId: String
    image: Upload
    name: String
    description: String
    isDraft: Boolean
    status: String
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
    isEmailVerified: Boolean
    isLocked: Boolean
    badges: [Badge]
  }

  input UserInfo {
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
    isEmailVerified: Boolean
    isLocked: Boolean
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
    createBadge(input: BadgeInfo): Badge
    updateBadge(id: String, input: BadgeInfo): Badge
    deleteBadge(id: String): String
    createUser(input: UserInfo): User
    updateUser(id: String, input: UserInfo): User
    updatePassword(id: String, password: String): User
    deleteUser(id: String): String
  }
`
);
 
// The root provides a resolver function for each API endpoint
const root = {
  async badges() {
    const badges = await db.select().from(Badge);
    return badges;
  },

  async badge({ id }) {
    const targetBadges = await db.select()
      .from(Badge)
      .where(eq(Badge.id, id))
      .limit(1);
    return targetBadges[0];
  },

  async createBadge({ input }) {
    const newBadgeId = uuidv4();

    const badgeInfo = {
      id: newBadgeId,
      userId: input.userId,
      image: input.image,
      name: input.name,
      description: input.description,
      status: 'P',
      isDraft: input.isDraft,
      rejectReason: ''
    };

    await db.insert(Badge).values(badgeInfo);

    const target = await db.select()
      .from(Badge)
      .where(eq(Badge.id, newBadgeId))
      .limit(1);

    return target[0];
  },

  async updateBadge({ id, input }) {

    await db.update(Badge)
      .set(input)
      .where(eq(Badge.id, id));

    const target = await db.select()
      .from(Badge)
      .where(eq(Badge.id, id))
      .limit(1);

    return target[0];
  },

  async deleteBadge({ id }) {
    await db.delete(Badge).where(eq(Badge.id, id));
    return 'Badge ' + id + ' deleted.';
  },

  async users() {
    const users = await db.select().from(User);
    return users;
  },

  async user({ id }) {
    const targetUsers = await db.select()
      .from(User)
      .where(eq(User.id, id))
      .limit(1);
      return targetUsers[0];
  },

  async searchUsers({ query }) {
    const users = await db.select()
      .from(User)
      .where(
        or(
          like(User.name, `%${query}%`),
          like(User.username, `%${query}%`),
          like(User.email, `%${query}%`),
          like(User.description, `%${query}%`),
        )
      )
    return users;

  },

  async createUser({ input }) {
    const newUserId = uuidv4();

    input.id = newUserId;
    input.password = await bcrypt.hash(input.password, 10);
    input.dob = new Date(input.dob);
    input.createdAt = sql`NOW()`;
    input.lastLogin = sql`NOW()`;

    await db.insert(User).values(input);

    const target = await db.select()
      .from(User)
      .where(eq(User.id, newUserId))
      .limit(1);

    return target[0];
  },

  async updateUser({ id, input }) {   
    await db.update(User)
      .set(input)
      .where(eq(User.id, id));

    const target = await db.select()
      .from(User)
      .where(eq(User.id, id))
      .limit(1);

    return target[0];
  },

  async updatePassword({ id, password }) {
    const encryptedPassword = await bcrypt.hash(password, 10);

    await db.update(User)
      .set({ password: encryptedPassword })
      .where(eq(User.id, id));

    const target = await db.select()
      .from(User)
      .where(eq(User.id, id))
      .limit(1);

    return target[0];
  },

  async deleteUser({ id }) {
    await db.delete(User).where(eq(User.id, id));
    return 'User ' + id + ' deleted.';
  },

  async loginUser({ username, password }) {
    let targetUser = await await db.select()
      .from(User)
      .where(
        or(
          eq(User.username, username),
          eq(User.email, username)
        )
      );

    if (targetUser.length > 0) {
      targetUser = targetUser[0];

      if (targetUser.isLocked === false) {
        let passwordMatches = await bcrypt.compare(password, String(targetUser.password));
        if (passwordMatches) {
          await db.update(User)
            .set({ lastLogin:  sql`NOW()` })
            .where(eq(User.id, targetUser.id));
          
          return targetUser;
        }
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