import { NextRequest, NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';
import { getCurrentAdmin, hasPermission } from '@/lib/session';
import { logActivity } from '@/lib/queries';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageSlug = searchParams.get('pageSlug') || undefined;

    let sql = 'SELECT * FROM pages_content';
    const params: any[] = [];
    if (pageSlug) {
      sql += ' WHERE page_slug = ?';
      params.push(pageSlug);
    }
    sql += ' ORDER BY page_slug, section_key';

    const rows = await query<RowDataPacket[]>(sql, params);
    return NextResponse.json({ content: rows });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { page_slug, section_key, title, subtitle, content } = body;

    if (!page_slug || !section_key) {
      return NextResponse.json({ error: 'Page slug and section key are required' }, { status: 400 });
    }

    await execute(
      `INSERT INTO pages_content (page_slug, section_key, title, subtitle, content)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE title = VALUES(title), subtitle = VALUES(subtitle), content = VALUES(content)`,
      [page_slug, section_key, title || null, subtitle || null, content || null]
    );

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'UPDATE_CONTENT',
      entity: 'page_content',
      details: `Updated ${page_slug}/${section_key}`,
    });

    return NextResponse.json({ success: true, message: 'Content updated successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
