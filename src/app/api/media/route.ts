import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getMediaLibrary, addMediaItem, logActivity } from '@/lib/queries';
import { getCurrentAdmin } from '@/lib/session';

export async function GET() {
  try {
    const items = await getMediaLibrary();
    return NextResponse.json({ items });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const altText = (formData.get('altText') as string) || '';
    const category = (formData.get('category') as string) || 'general';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File size exceeds maximum limit of 5MB' }, { status: 400 });
    }

    // Validate mime type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file format. Only JPG, PNG, WEBP, and SVG are supported.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const extension = path.extname(file.name) || '.jpg';
    const cleanBase = path
      .basename(file.name, extension)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
    const filename = `${cleanBase}-${Date.now()}${extension}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, buffer);

    const publicPath = `/uploads/${filename}`;

    const id = await addMediaItem({
      filename,
      original_name: file.name,
      file_path: publicPath,
      file_size: file.size,
      mime_type: file.type,
      alt_text: altText,
      category,
      uploaded_by: admin.adminId,
    });

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'UPLOAD_MEDIA',
      entity: 'media_library',
      entityId: String(id),
      details: `Uploaded file: ${filename}`,
    });

    return NextResponse.json({
      success: true,
      item: {
        id,
        filename,
        original_name: file.name,
        file_path: publicPath,
        file_size: file.size,
        mime_type: file.type,
        alt_text: altText,
        category,
      },
    });
  } catch (err: any) {
    console.error('Media upload error:', err);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}
