import { eq, desc } from 'drizzle-orm';
import { db } from '../index';
import { predictions, type NewPrediction } from '../schema/predictions';

export const getPredictionsByUserId = (userId: string) => db.select().from(predictions).where(eq(predictions.userId, userId)).orderBy(desc(predictions.createdAt));
export const createPrediction = (data: NewPrediction) => db.insert(predictions).values(data).returning().then(r => r[0]);
export const updatePredictionStatus = (id: string, status: string) => db.update(predictions).set({ isActioned: status }).where(eq(predictions.id, id)).returning().then(r => r[0]);