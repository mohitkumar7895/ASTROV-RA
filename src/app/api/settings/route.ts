import { NextRequest, NextResponse } from 'next/server';
import { getWebsiteSettings, updateWebsiteSetting, logActivity } from '@/lib/queries';
import { getCurrentAdmin } from '@/lib/session';

export async function GET() {
  try {
    const settings = await getWebsiteSettings();
    return NextResponse.json({ settings });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Support object of key-values
    for (const [key, val] of Object.entries(body)) {
      if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
        await updateWebsiteSetting(key, String(val));
      }
    }

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'UPDATE_SETTINGS',
      entity: 'website_settings',
      details: 'Updated global website settings',
    });

    return NextResponse.json({ success: true, message: 'Settings saved successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
