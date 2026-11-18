import { NextRequest, NextResponse } from 'next/server';
import { updateService, deleteService, logActivity } from '@/lib/queries';
import { serviceSchema } from '@/lib/validations';
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

    await updateService(id, {
      slug: body.slug,
      title: body.title,
      short_description: body.short_description || body.shortDescription,
      description: body.description,
      icon: body.icon,
      image_url: body.image_url || body.imageUrl,
      price: body.price !== undefined ? Number(body.price) : undefined,
      currency: body.currency,
      duration_minutes: body.duration_minutes !== undefined ? Number(body.duration_minutes) : undefined,
      consultation_method: body.consultation_method || body.consultationMethod,
      display_order: body.display_order !== undefined ? Number(body.display_order) : undefined,
      is_active: body.is_active !== undefined ? Boolean(body.is_active) : undefined,
      is_featured: body.is_featured !== undefined ? Boolean(body.is_featured) : undefined,
    });

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'UPDATE_SERVICE',
      entity: 'services',
      entityId: String(id),
      details: `Updated service #${id}`,
    });

    return NextResponse.json({ success: true, message: 'Service updated successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
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
    await deleteService(id);

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'DELETE_SERVICE',
      entity: 'services',
      entityId: String(id),
      details: `Deleted service #${id}`,
    });

    return NextResponse.json({ success: true, message: 'Service deleted successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
