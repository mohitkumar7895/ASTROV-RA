import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentAdmin, hasPermission } from '@/lib/session';
import { getAllAdminUsers, getRoles } from '@/lib/queries';
import { UsersManagerClient } from '@/components/admin/UsersManagerClient';

export const revalidate = 0;

export default async function AdminUsersPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const [users, roles] = await Promise.all([
    getAllAdminUsers().catch(() => []),
    getRoles().catch(() => []),
  ]);

  return <UsersManagerClient initialUsers={users} roles={roles} />;
}
