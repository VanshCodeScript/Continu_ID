import { pgTable, uuid, text, timestamp, jsonb, numeric, pgEnum } from 'drizzle-orm/pg-core';
import { profiles } from './profiles';

export const transitionTypeEnum = pgEnum('transition_type', ['education_to_employment','employment_to_healthcare','relocation','financial_milestone','life_event']);

export const predictions = pgTable('predictions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'cascade' }).notNull(),
  transitionType: transitionTypeEnum('transition_type').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  insight: jsonb('insight').notNull(),
  confidence: numeric('confidence', { precision: 4, scale: 3 }),
  timeframe: text('timeframe'),
  actionItems: jsonb('action_items'),
  isActioned: text('is_actioned').default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Prediction = typeof predictions.$inferSelect;
export type NewPrediction = typeof predictions.$inferInsert;