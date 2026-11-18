import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { execute } from '@/lib/db';
import { ADMIN_COOKIE_NAME, getCurrentAdmin } from '@/lib/session';
import { logActivity } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    const cookieStore = cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    if (token) {
      await execute('DELETE FROM admin_sessions WHERE token = ?', [token]);
    }

    if (admin) {
      await logActivity({
        adminId: admin.adminId,
        adminName: admin.name,
        action: 'LOGOUT',
        entity: 'auth',
        details: 'Admin logged out',
      });
    }

    const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
    response.cookies.delete(ADMIN_COOKIE_NAME);
    return response;
  } catch (err) {
    console.error('Logout error:', err);
    return NextResponse.json({ success: true });
  }
}
