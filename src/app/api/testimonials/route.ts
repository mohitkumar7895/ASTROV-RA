import { NextRequest, NextResponse } from 'next/server';
import { getAllTestimonials, getPublishedTestimonials, createTestimonial, logActivity } from '@/lib/queries';
import { getCurrentAdmin } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';

    const testimonials = all ? await getAllTestimonials() : await getPublishedTestimonials();
    return NextResponse.json({ testimonials });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const id = await createTestimonial(body);

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'CREATE_TESTIMONIAL',
      entity: 'testimonials',
      entityId: String(id),
      details: `Added testimonial by: ${body.client_name}`,
    });

    return NextResponse.json({ success: true, id, message: 'Testimonial added' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
