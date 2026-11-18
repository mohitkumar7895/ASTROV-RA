import { NextRequest, NextResponse } from 'next/server';
import { addEnquiryNote, logActivity } from '@/lib/queries';
import { getCurrentAdmin } from '@/lib/session';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = parseInt(params.id, 10);
    const body = await request.json();
    const { note } = body;

    if (!note || typeof note !== 'string' || !note.trim()) {
      return NextResponse.json({ error: 'Note text is required' }, { status: 400 });
    }

    await addEnquiryNote(id, admin.adminId, admin.name, note.trim());

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'ADD_NOTE',
      entity: 'enquiry',
      entityId: String(id),
      details: `Added note to enquiry #${id}`,
    });

    return NextResponse.json({ success: true, message: 'Note added successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to add note' }, { status: 500 });
  }
}
