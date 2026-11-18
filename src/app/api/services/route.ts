import { NextRequest, NextResponse } from 'next/server';
import { getAllServices, getActiveServices, createService, logActivity } from '@/lib/queries';
import { serviceSchema } from '@/lib/validations';
import { getCurrentAdmin } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';

    const services = all ? await getAllServices() : await getActiveServices();
    return NextResponse.json({ services });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validated = serviceSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ error: 'Validation failed', issues: validated.error.issues }, { status: 400 });
    }

    const data = validated.data;
    const insertId = await createService({
      slug: data.slug,
      title: data.title,
      short_description: data.shortDescription,
      description: data.description,
      icon: data.icon,
      image_url: data.imageUrl,
      price: data.price,
      currency: data.currency,
      duration_minutes: data.durationMinutes,
      consultation_method: data.consultationMethod,
      display_order: data.displayOrder,
      is_active: data.isActive,
      is_featured: data.isFeatured,
    });

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'CREATE_SERVICE',
      entity: 'services',
      entityId: String(insertId),
      details: `Created service: ${data.title}`,
    });

    return NextResponse.json({ success: true, id: insertId, message: 'Service created successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
