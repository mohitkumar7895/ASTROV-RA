import { NextRequest, NextResponse } from 'next/server';
import { getEnquiryById, updateEnquiryStatus, deleteEnquiry, logActivity } from '@/lib/queries';
import { getCurrentAdmin, hasPermission } from '@/lib/session';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = parseInt(params.id, 10);
    const enquiry = await getEnquiryById(id);

    if (!enquiry) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ enquiry });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to retrieve enquiry' }, { status: 500 });
  }
}

export async function PUT(
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
    const { status } = body;

    const validStatuses = ['New', 'Contacted', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid booking status' }, { status: 400 });
    }

    await updateEnquiryStatus(id, status);

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'UPDATE_STATUS',
      entity: 'enquiry',
      entityId: String(id),
      details: `Updated enquiry #${id} status to ${status}`,
    });

    return NextResponse.json({ success: true, message: 'Status updated' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}

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
    await deleteEnquiry(id);

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'DELETE',
      entity: 'enquiry',
      entityId: String(id),
      details: `Deleted enquiry #${id}`,
    });

    return NextResponse.json({ success: true, message: 'Enquiry deleted' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to delete enquiry' }, { status: 500 });
  }
}
