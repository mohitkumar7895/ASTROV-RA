import { NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    return NextResponse.json({
      admin: {
        id: admin.adminId,
        name: admin.name,
        email: admin.email,
        roleId: admin.roleId,
        roleName: admin.roleName,
        phone: admin.phone,
        avatarUrl: admin.avatarUrl,
        permissions: admin.permissions || [],
      },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Session check failed' }, { status: 500 });
  }
}
