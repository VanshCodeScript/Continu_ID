import { DashboardNav } from '@/components/DashboardNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pt-16 flex">
      <DashboardNav />
      <main className="flex-1 ml-0 lg:ml-60 p-6 lg:p-8">{children}</main>
    </div>
  );
}