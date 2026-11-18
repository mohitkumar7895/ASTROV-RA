import { NextRequest, NextResponse } from 'next/server';
import { getHeroSection, updateHeroSection, logActivity } from '@/lib/queries';
import { getCurrentAdmin } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageSlug = searchParams.get('pageSlug') || 'home';
    const hero = await getHeroSection(pageSlug);
    return NextResponse.json({ hero });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch hero' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { pageSlug = 'home', ...data } = body;

    await updateHeroSection(pageSlug, data);

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'UPDATE_HERO',
      entity: 'hero_sections',
      details: `Updated hero section for ${pageSlug}`,
    });

    return NextResponse.json({ success: true, message: 'Hero section updated successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update hero section' }, { status: 500 });
  }
}
