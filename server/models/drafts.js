import { sql } from 'drizzle-orm';
import { customType, mysqlTable, varchar, json, tinyint, datetime } from 'drizzle-orm/mysql-core';

const customLongBlob = customType({
  dataType() {
    return 'LONGBLOB';
  },
});

export const Draft = mysqlTable('drafts', {
  id: varchar('id', { length: 36 })
    .notNull()
    .primaryKey(),
  userId: varchar('userId', { length: 36 }).notNull(),
  name: varchar('name', { length: 255 }),
  canvas: json(),
  createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3)`),
  updatedAt: datetime('createdAt', { mode: 'string', fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3)`),
});