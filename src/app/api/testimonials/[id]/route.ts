import { NextRequest, NextResponse } from 'next/server';
import { updateTestimonial, deleteTestimonial, logActivity } from '@/lib/queries';
import { getCurrentAdmin } from '@/lib/session';

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
    await updateTestimonial(id, body);

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'UPDATE_TESTIMONIAL',
      entity: 'testimonials',
      entityId: String(id),
      details: `Updated testimonial #${id}`,
    });

    return NextResponse.json({ success: true, message: 'Testimonial updated' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
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
    await deleteTestimonial(id);

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'DELETE_TESTIMONIAL',
      entity: 'testimonials',
      entityId: String(id),
      details: `Deleted testimonial #${id}`,
    });

    return NextResponse.json({ success: true, message: 'Testimonial deleted' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
