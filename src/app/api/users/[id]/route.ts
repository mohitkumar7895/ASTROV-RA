import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAdmin, hasPermission } from '@/lib/session';
import { hashPassword } from '@/lib/auth';
import { execute } from '@/lib/db';
import { logActivity } from '@/lib/queries';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin || !hasPermission(admin, 'manage_users')) {
      return NextResponse.json({ error: 'Forbidden: Insufficient privileges' }, { status: 403 });
    }

    const id = parseInt(params.id, 10);
    const body = await request.json();

    if (body.password) {
      const hashed = await hashPassword(body.password);
      await execute('UPDATE admins SET password_hash = ? WHERE id = ?', [hashed, id]);
    }

    await execute(
      `UPDATE admins SET
        name = COALESCE(?, name),
        email = COALESCE(?, email),
        role_id = COALESCE(?, role_id),
        phone = COALESCE(?, phone),
        is_active = COALESCE(?, is_active)
       WHERE id = ?`,
      [
        body.name,
        body.email ? body.email.toLowerCase().trim() : null,
        body.roleId || body.role_id,
        body.phone,
        body.isActive !== undefined ? (body.isActive ? 1 : 0) : null,
        id,
      ]
    );

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'UPDATE_USER',
      entity: 'admins',
      entityId: String(id),
      details: `Updated admin user #${id}`,
    });

    return NextResponse.json({ success: true, message: 'User updated successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin || !hasPermission(admin, 'manage_users')) {
      return NextResponse.json({ error: 'Forbidden: Insufficient privileges' }, { status: 403 });
    }

    const id = parseInt(params.id, 10);
    if (id === admin.adminId) {
      return NextResponse.json({ error: 'Cannot delete your own administrative account' }, { status: 400 });
    }

    await execute('DELETE FROM admins WHERE id = ?', [id]);

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'DELETE_USER',
      entity: 'admins',
      entityId: String(id),
      details: `Deleted admin user #${id}`,
    });

    return NextResponse.json({ success: true, message: 'User deleted' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
