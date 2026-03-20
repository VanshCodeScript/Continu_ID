// src/components/LanyardWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

const Lanyard = dynamic(() => import('./Lanyard'), {
  ssr: false,
});

export default function LanyardWrapper(props: any) {
  return <Lanyard {...props} />;
}