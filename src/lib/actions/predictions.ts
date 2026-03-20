'use server';
import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { predictions } from '@/db/schema/predictions';
import { eq } from 'drizzle-orm';

export async function actionPredictionAction(id: string, status: 'actioned' | 'dismissed') {
  try {
    await db.update(predictions).set({ isActioned: status }).where(eq(predictions.id, id));
    revalidatePath('/dashboard/predict');
    return { success: true };
  } catch { return { error: 'Failed to update prediction' }; }
}