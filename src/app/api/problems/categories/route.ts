import { NextRequest, NextResponse } from 'next/server';
import { getAllProblemCategories, createProblemCategory, logActivity } from '@/lib/queries';
import { getCurrentAdmin } from '@/lib/session';

export async function GET() {
  try {
    const categories = await getAllProblemCategories();
    return NextResponse.json({ categories });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const id = await createProblemCategory(body);

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'CREATE_CATEGORY',
      entity: 'problem_categories',
      entityId: String(id),
      details: `Created problem category: ${body.name}`,
    });

    return NextResponse.json({ success: true, id, message: 'Category created' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
