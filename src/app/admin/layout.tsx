import React from 'react';
import { AdminProvider } from '@/context/AdminContext';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { getCurrentAdmin } from '@/lib/session';

export const revalidate = 0;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentAdmin = await getCurrentAdmin();

  // Map to client AdminUser type
  const initialAdmin = currentAdmin
    ? {
        id: currentAdmin.adminId,
        name: currentAdmin.name,
        email: currentAdmin.email,
        role_id: currentAdmin.roleId,
        roleName: currentAdmin.roleName,
        phone: currentAdmin.phone,
        avatar_url: currentAdmin.avatarUrl,
        is_active: currentAdmin.isActive,
      }
    : null;

  return (
    <AdminProvider initialAdmin={initialAdmin}>
      <div className="min-h-screen bg-[#080D24] text-astro-ivory flex">
        {/* Render sidebar only if user has a session */}
        {initialAdmin && <AdminSidebar />}

        <div className={`flex-1 flex flex-col min-w-0 ${initialAdmin ? 'lg:pl-64' : ''}`}>
          {initialAdmin && <AdminHeader />}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminProvider>
  );
}
