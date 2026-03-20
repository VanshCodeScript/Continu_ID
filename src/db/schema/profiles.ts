import { pgTable, uuid, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  did: text('did').unique().notNull(),
  displayName: text('display_name'),
  email: text('email').unique(),
  walletAddress: text('wallet_address'),
  avatarUrl: text('avatar_url'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;