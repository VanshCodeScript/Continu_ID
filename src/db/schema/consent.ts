import { pgTable, uuid, text, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core';
import { profiles } from './profiles';

export const consentLogs = pgTable('consent_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'cascade' }).notNull(),
  requestingDid: text('requesting_did').notNull(),
  requestingOrg: text('requesting_org').notNull(),
  credentialIds: jsonb('credential_ids').notNull(),
  purpose: text('purpose').notNull(),
  isGranted: boolean('is_granted').default(false),
  grantedAt: timestamp('granted_at'),
  revokedAt: timestamp('revoked_at'),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

export type ConsentLog = typeof consentLogs.$inferSelect;
export type NewConsentLog = typeof consentLogs.$inferInsert;