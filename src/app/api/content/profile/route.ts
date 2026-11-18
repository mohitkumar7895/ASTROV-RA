import { NextRequest, NextResponse } from 'next/server';
import { getAstrologerProfile, updateAstrologerProfile, logActivity } from '@/lib/queries';
import { getCurrentAdmin } from '@/lib/session';

export async function GET() {
  try {
    const profile = await getAstrologerProfile();
    return NextResponse.json({ profile });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch astrologer profile' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    await updateAstrologerProfile(body);

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'UPDATE_PROFILE',
      entity: 'astrologer_profile',
      details: 'Updated astrologer profile & qualifications',
    });

    return NextResponse.json({ success: true, message: 'Astrologer profile updated successfully' });
  } catch (err: any) {
    console.error('Update profile error:', err);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
