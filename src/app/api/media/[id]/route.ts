import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { deleteMediaItem, logActivity } from '@/lib/queries';
import { query } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/session';
import { RowDataPacket } from 'mysql2';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = parseInt(params.id, 10);

    // Get item to remove physical file
    const rows = await query<RowDataPacket[]>('SELECT * FROM media_library WHERE id = ? LIMIT 1', [id]);
    if (rows && rows.length > 0) {
      const item = rows[0];
      const diskPath = path.join(process.cwd(), 'public', item.file_path.replace(/^\//, ''));
      if (fs.existsSync(diskPath)) {
        try {
          fs.unlinkSync(diskPath);
        } catch {}
      }
    }

    await deleteMediaItem(id);

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'DELETE_MEDIA',
      entity: 'media_library',
      entityId: String(id),
      details: `Deleted media item #${id}`,
    });

    return NextResponse.json({ success: true, message: 'Media item deleted' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to delete media item' }, { status: 500 });
  }
}
