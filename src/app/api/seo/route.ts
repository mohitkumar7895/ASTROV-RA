import { NextRequest, NextResponse } from 'next/server';
import { getAllSeoMetadata, updateSeoMetadata, logActivity } from '@/lib/queries';
import { getCurrentAdmin } from '@/lib/session';

export async function GET() {
  try {
    const seoList = await getAllSeoMetadata();
    return NextResponse.json({ seoList });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch SEO settings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { page_route, ...data } = body;

    if (!page_route) {
      return NextResponse.json({ error: 'Page route is required' }, { status: 400 });
    }

    await updateSeoMetadata(page_route, data);

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'UPDATE_SEO',
      entity: 'seo_metadata',
      details: `Updated SEO settings for route: ${page_route}`,
    });

    return NextResponse.json({ success: true, message: 'SEO metadata updated successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update SEO' }, { status: 500 });
  }
}
