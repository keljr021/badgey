import { sql } from 'drizzle-orm';
import { customType, mysqlTable, varchar, date, text, datetime } from 'drizzle-orm/mysql-core';
import { v4 as uuidv4 } from 'uuid';

const customLongBlob = customType({
  dataType() {
    return 'LONGBLOB';
  },
});

export const User = mysqlTable('users', {
  id: varchar('id', { length: 36 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  userType: varchar('userType', { length: 255 }),
  image: customLongBlob('image'),
  name: varchar('name', { length: 255 }),
  username: varchar('username', { length: 255 }),
  email: varchar('email', { length: 255 }),
  dob: date('dob', { mode: 'string' }),
  password: varchar('password', { length: 255 }),
  company: varchar('company', { length: 255 }),
  description: text('description'),
  createdAt: datetime('createdAt', { mode: 'date', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`),
  lastLogin: datetime('lastLogin', { mode: 'date', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`),
});
