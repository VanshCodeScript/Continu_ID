import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateDID = () => `did:continu:${Array.from({length:16},()=>Math.floor(Math.random()*256).toString(16).padStart(2,'0')).join('')}`;

export const shortenDID = (did: string) => did ? `${did.slice(0,16)}...${did.slice(-8)}` : '';

export const formatDate = (date: Date | string | null) => date ? new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'numeric'}).format(new Date(date)) : 'N/A';

export const getDomainColor = (domain: string) => ({ education:'from-blue-500/20 to-cyan-500/20 border-blue-400/30', finance:'from-emerald-500/20 to-teal-500/20 border-emerald-400/30', healthcare:'from-rose-500/20 to-pink-500/20 border-rose-400/30', identity:'from-purple-500/20 to-violet-500/20 border-purple-400/30', employment:'from-amber-500/20 to-orange-500/20 border-amber-400/30' }[domain] ?? 'from-gray-500/20 to-slate-500/20 border-gray-400/30');

export const getDomainIcon = (domain: string) => ({ education:'🎓', finance:'💳', healthcare:'🏥', identity:'🪪', employment:'💼' }[domain] ?? '📄');