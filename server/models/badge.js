import { sql } from 'drizzle-orm';
import { customType, mysqlTable, char, varchar, text, tinyint, datetime } from 'drizzle-orm/mysql-core';

const customLongBlob = customType({
  dataType() {
    return 'LONGBLOB';
  },
});

export const Badge = mysqlTable('badges', {
  id: varchar('id', { length: 36 })
    .notNull()
    .primaryKey(),
  userId: varchar('userId', { length: 36 }).notNull(),
  image: customLongBlob('image'),
  name: varchar('name', { length: 255 }),
  description: text('description'),
  isApproved: tinyint('isApproved'),
  rejectReason: text('rejectReason'),
  createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3)`),
  isDraft: tinyint('isDraft'),
});