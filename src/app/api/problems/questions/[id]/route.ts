import { NextRequest, NextResponse } from 'next/server';
import { updateProblemQuestion, deleteProblemQuestion, logActivity } from '@/lib/queries';
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
    await updateProblemQuestion(id, body);

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'UPDATE_QUESTION',
      entity: 'problem_questions',
      entityId: String(id),
      details: `Updated question #${id}`,
    });

    return NextResponse.json({ success: true, message: 'Question updated' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update question' }, { status: 500 });
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
    await deleteProblemQuestion(id);

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'DELETE_QUESTION',
      entity: 'problem_questions',
      entityId: String(id),
      details: `Deleted question #${id}`,
    });

    return NextResponse.json({ success: true, message: 'Question deleted' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to delete question' }, { status: 500 });
  }
}
