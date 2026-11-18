import { cookies } from 'next/headers';
import { verifyAdminToken, SessionPayload } from './auth';
import { query } from './db';
import { RowDataPacket } from 'mysql2';

export const ADMIN_COOKIE_NAME = 'astrovera_admin_session';

export interface AdminWithRole extends SessionPayload {
  isActive: boolean;
  phone?: string;
  avatarUrl?: string;
  permissions?: string[];
}

export async function getCurrentAdmin(): Promise<AdminWithRole | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = await verifyAdminToken(token);
    if (!payload) return null;

    // Verify against DB to ensure admin is still active
    const rows = await query<RowDataPacket[]>(
      `SELECT a.id, a.name, a.email, a.role_id, a.phone, a.avatar_url, a.is_active,
              r.name as role_name, r.display_name as role_display_name
       FROM admins a
       JOIN roles r ON a.role_id = r.id
       WHERE a.id = ? AND a.is_active = 1
       LIMIT 1`,
      [payload.adminId]
    );

    if (!rows || rows.length === 0) {
      return null;
    }

    const admin = rows[0];

    // Fetch permissions
    const permRows = await query<RowDataPacket[]>(
      `SELECT p.name
       FROM role_permissions rp
       JOIN permissions p ON rp.permission_id = p.id
       WHERE rp.role_id = ?`,
      [admin.role_id]
    );

    const permissions = permRows.map((p) => p.name);

    return {
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
      roleId: admin.role_id,
      roleName: admin.role_name,
      isActive: Boolean(admin.is_active),
      phone: admin.phone,
      avatarUrl: admin.avatar_url,
      permissions,
    };
  } catch (err) {
    console.error('Session retrieval error:', err);
    return null;
  }
}

export async function hasPermission(admin: AdminWithRole | null, permissionName: string): Promise<boolean> {
  if (!admin) return false;
  if (admin.roleName === 'super_admin' || admin.permissions?.includes('manage_all')) {
    return true;
  }
  return Boolean(admin.permissions?.includes(permissionName));
}
