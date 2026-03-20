import { eq, desc } from 'drizzle-orm';
import { db } from '../index';
import { consentLogs, type NewConsentLog } from '../schema/consent';

export const getConsentLogsByUserId = (userId: string) => db.select().from(consentLogs).where(eq(consentLogs.userId, userId)).orderBy(desc(consentLogs.createdAt));
export const createConsentLog = (data: NewConsentLog) => db.insert(consentLogs).values(data).returning().then(r => r[0]);
export const revokeConsent = (id: string) => db.update(consentLogs).set({ isGranted: false, revokedAt: new Date() }).where(eq(consentLogs.id, id)).returning().then(r => r[0]);