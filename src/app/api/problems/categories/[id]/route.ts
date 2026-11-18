import { NextRequest, NextResponse } from 'next/server';
import { updateProblemCategory, deleteProblemCategory, logActivity } from '@/lib/queries';
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
    await updateProblemCategory(id, body);

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'UPDATE_CATEGORY',
      entity: 'problem_categories',
      entityId: String(id),
      details: `Updated category #${id}`,
    });

    return NextResponse.json({ success: true, message: 'Category updated' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
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
    await deleteProblemCategory(id);

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'DELETE_CATEGORY',
      entity: 'problem_categories',
      entityId: String(id),
      details: `Deleted category #${id}`,
    });

    return NextResponse.json({ success: true, message: 'Category deleted' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
