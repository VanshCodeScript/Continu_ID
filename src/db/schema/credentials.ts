import { pgTable, uuid, text, timestamp, jsonb, pgEnum, boolean } from 'drizzle-orm/pg-core';
import { profiles } from './profiles';

export const domainEnum = pgEnum('domain', ['education','finance','healthcare','identity','employment']);
export const vcStatusEnum = pgEnum('vc_status', ['active','revoked','expired','pending']);

export const verifiableCredentials = pgTable('verifiable_credentials', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'cascade' }).notNull(),
  domain: domainEnum('domain').notNull(),
  issuer: text('issuer').notNull(),
  issuerDid: text('issuer_did'),
  credentialType: text('credential_type').notNull(),
  credentialSubject: jsonb('credential_subject').notNull(),
  proof: jsonb('proof'),
  zkpProof: text('zkp_proof'),
  status: vcStatusEnum('status').default('active'),
  isShared: boolean('is_shared').default(false),
  expiresAt: timestamp('expires_at'),
  issuedAt: timestamp('issued_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
});

export type VerifiableCredential = typeof verifiableCredentials.$inferSelect;
export type NewVerifiableCredential = typeof verifiableCredentials.$inferInsert;