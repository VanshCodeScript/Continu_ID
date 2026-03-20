import { eq, and, desc } from 'drizzle-orm';
import { db } from '../index';
import { verifiableCredentials, type NewVerifiableCredential } from '../schema/credentials';

export const getCredentialsByUserId = (userId: string) => db.select().from(verifiableCredentials).where(eq(verifiableCredentials.userId, userId)).orderBy(desc(verifiableCredentials.createdAt));
export const getCredentialsByDomain = (userId: string, domain: string) => db.select().from(verifiableCredentials).where(and(eq(verifiableCredentials.userId, userId), eq(verifiableCredentials.domain, domain as any)));
export const createCredential = (data: NewVerifiableCredential) => db.insert(verifiableCredentials).values(data).returning().then(r => r[0]);
export const revokeCredential = (id: string, userId: string) => db.update(verifiableCredentials).set({ status: 'revoked' }).where(and(eq(verifiableCredentials.id, id), eq(verifiableCredentials.userId, userId))).returning().then(r => r[0]);
export const getCredentialById = (id: string) => db.select().from(verifiableCredentials).where(eq(verifiableCredentials.id, id)).limit(1).then(r => r[0] ?? null);