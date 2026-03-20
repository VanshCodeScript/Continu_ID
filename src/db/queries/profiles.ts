import { eq } from 'drizzle-orm';
import { db } from '../index';
import { profiles, type NewProfile } from '../schema/profiles';

export const getProfileById = (id: string) => db.select().from(profiles).where(eq(profiles.id, id)).limit(1).then(r => r[0] ?? null);
export const getProfileByDid = (did: string) => db.select().from(profiles).where(eq(profiles.did, did)).limit(1).then(r => r[0] ?? null);
export const createProfile = (data: NewProfile) => db.insert(profiles).values(data).returning().then(r => r[0]);
export const updateProfile = (id: string, data: Partial<NewProfile>) => db.update(profiles).set(data).where(eq(profiles.id, id)).returning().then(r => r[0]);