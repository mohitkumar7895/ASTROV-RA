import { NextRequest, NextResponse } from 'next/server';
import { getAllAdminUsers, getRoles, logActivity } from '@/lib/queries';
import { getCurrentAdmin, hasPermission } from '@/lib/session';
import { hashPassword } from '@/lib/auth';
import { execute } from '@/lib/db';
import { adminUserSchema } from '@/lib/validations';

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const users = await getAllAdminUsers();
    const roles = await getRoles();

    return NextResponse.json({ users, roles });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin || !hasPermission(admin, 'manage_users')) {
      return NextResponse.json({ error: 'Forbidden: Insufficient privileges' }, { status: 403 });
    }

    const body = await request.json();
    const validated = adminUserSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ error: 'Validation failed', issues: validated.error.issues }, { status: 400 });
    }

    const data = validated.data;
    if (!data.password) {
      return NextResponse.json({ error: 'Password is required for new users' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(data.password);

    const res = await execute(
      `INSERT INTO admins (role_id, name, email, password_hash, phone, is_active)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [data.roleId, data.name, data.email.toLowerCase().trim(), hashedPassword, data.phone || null, data.isActive ? 1 : 0]
    );

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'CREATE_USER',
      entity: 'admins',
      entityId: String(res.insertId),
      details: `Created admin user: ${data.name} (${data.email})`,
    });

    return NextResponse.json({ success: true, id: res.insertId, message: 'Admin user created successfully' });
  } catch (err: any) {
    if (err.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ error: 'An admin with this email address already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
