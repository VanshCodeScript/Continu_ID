import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const createSchema = z.object({
  userId: z.string(),
  domain: z.enum(['education','finance','healthcare','identity','employment']),
  issuer: z.string().min(1),
  credentialType: z.string().min(1),
  credentialSubject: z.record(z.unknown()),
});

export async function GET(req: NextRequest) {
  const userId = new URL(req.url).searchParams.get('userId');
  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });
  return NextResponse.json({ credentials: [], userId });
}

export async function POST(req: NextRequest) {
  try {
    const parsed = createSchema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
    const { issuer, ...rest } = parsed.data;
    const vc = {
      id: crypto.randomUUID(), ...rest, issuer,
      issuerDid: `did:continu:${issuer.toLowerCase().replace(/\s+/g, '')}`,
      proof: { type: 'Ed25519Signature2020', verificationMethod: `did:continu:${issuer}#key-1`, created: new Date().toISOString() },
      zkpProof: `zkp_groth16_${Math.random().toString(36).slice(2, 34)}`,
      status: 'active', issuedAt: new Date().toISOString(),
    };
    return NextResponse.json({ credential: vc }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}