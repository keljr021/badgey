import { sql } from 'drizzle-orm';
import { customType, mysqlTable, char, varchar, date, text, datetime, tinyint } from 'drizzle-orm/mysql-core';

const customLongBlob = customType({
  dataType() {
    return 'LONGBLOB';
  },
});

export const User = mysqlTable('users', {
  id: varchar('id', { length: 36 })
    .notNull()
    .primaryKey(),
  userType: varchar('userType', { length: 255 }),
  image: customLongBlob('image'),
  name: varchar('name', { length: 255 }),
  username: varchar('username', { length: 255 }),
  email: varchar('email', { length: 255 }),
  dob: date('dob', { mode: 'string' }),
  password: char('password', { length: 255 }),
  company: varchar('company', { length: 255 }),
  description: text('description'),
  createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`),
  lastLogin: datetime('lastLogin', { mode: 'string', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`),
  isEmailVerified: tinyint('isEmailVerified'),
  isLocked: tinyint('isLocked'),

});
