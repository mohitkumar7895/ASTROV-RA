import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query, execute } from '@/lib/db';
import { verifyPassword, createAdminToken } from '@/lib/auth';
import { ADMIN_COOKIE_NAME } from '@/lib/session';
import { adminLoginSchema } from '@/lib/validations';
import { RowDataPacket } from 'mysql2';
import { logActivity } from '@/lib/queries';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = adminLoginSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Invalid email or password format', issues: validated.error.issues },
        { status: 400 }
      );
    }

    const { email, password } = validated.data;

    // Prepared statement query
    const rows = await query<RowDataPacket[]>(
      `SELECT a.id, a.name, a.email, a.password_hash, a.role_id, a.is_active,
              r.name as role_name, r.display_name as role_display_name
       FROM admins a
       JOIN roles r ON a.role_id = r.id
       WHERE a.email = ?
       LIMIT 1`,
      [email.toLowerCase().trim()]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid administrative credentials' },
        { status: 401 }
      );
    }

    const admin = rows[0];

    if (!admin.is_active) {
      return NextResponse.json(
        { error: 'This administrative account has been deactivated. Please contact the administrator.' },
        { status: 403 }
      );
    }

    const isValid = await verifyPassword(password, admin.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid administrative credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = await createAdminToken({
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
      roleId: admin.role_id,
      roleName: admin.role_name,
    });

    // Update last_login_at
    await execute('UPDATE admins SET last_login_at = NOW() WHERE id = ?', [admin.id]);

    // Save session in database
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || '';

    await execute(
      'INSERT INTO admin_sessions (admin_id, token, ip_address, user_agent, expires_at) VALUES (?, ?, ?, ?, ?)',
      [admin.id, token, ip, userAgent, expiresAt]
    );

    await logActivity({
      adminId: admin.id,
      adminName: admin.name,
      action: 'LOGIN',
      entity: 'auth',
      details: `Admin logged in from IP: ${ip}`,
      ipAddress: ip,
    });

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        roleId: admin.role_id,
        roleName: admin.role_name,
        roleDisplayName: admin.role_display_name,
      },
    });

    // Set secure HTTP-only cookie on response
    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: expiresAt,
    });

    return response;
  } catch (err: any) {
    console.error('Admin login error:', err);
    return NextResponse.json(
      { error: 'An unexpected authentication error occurred' },
      { status: 500 }
    );
  }
}
