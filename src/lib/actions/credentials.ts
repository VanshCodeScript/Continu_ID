'use server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/db';
import { verifiableCredentials } from '@/db/schema/credentials';
import { eq, and } from 'drizzle-orm';

const schema = z.object({ userId: z.string().uuid(), domain: z.enum(['education','finance','healthcare','identity','employment']), issuer: z.string().min(1), credentialType: z.string().min(1), credentialSubject: z.record(z.unknown()) });

export async function createCredentialAction(formData: FormData) {
  const parsed = schema.safeParse({ userId: formData.get('userId'), domain: formData.get('domain'), issuer: formData.get('issuer'), credentialType: formData.get('credentialType'), credentialSubject: JSON.parse(formData.get('credentialSubject') as string) });
  if (!parsed.success) return { error: parsed.error.flatten() };
  try {
    await db.insert(verifiableCredentials).values({ ...parsed.data, issuerDid: `did:continu:${parsed.data.issuer.toLowerCase().replace(/\s+/g,'')}`, proof: { type: 'Ed25519Signature2020' }, zkpProof: `zkp_${Math.random().toString(36).slice(2,18)}`, status: 'active' });
    revalidatePath('/dashboard/vc');
    return { success: true };
  } catch { return { error: 'Failed to create credential' }; }
}

export async function revokeCredentialAction(id: string, userId: string) {
  try {
    await db.update(verifiableCredentials).set({ status: 'revoked' }).where(and(eq(verifiableCredentials.id, id), eq(verifiableCredentials.userId, userId)));
    revalidatePath('/dashboard/vc');
    return { success: true };
  } catch { return { error: 'Failed to revoke credential' }; }
}

export async function toggleShareCredentialAction(id: string, userId: string, isShared: boolean) {
  try {
    await db.update(verifiableCredentials).set({ isShared }).where(and(eq(verifiableCredentials.id, id), eq(verifiableCredentials.userId, userId)));
    revalidatePath('/dashboard/vc');
    return { success: true };
  } catch { return { error: 'Failed to update sharing' }; }
}