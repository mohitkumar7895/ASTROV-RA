import { NextRequest, NextResponse } from 'next/server';
import { getAllProblemQuestions, createProblemQuestion, logActivity } from '@/lib/queries';
import { getCurrentAdmin } from '@/lib/session';

export async function GET() {
  try {
    const questions = await getAllProblemQuestions();
    return NextResponse.json({ questions });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const id = await createProblemQuestion(body);

    await logActivity({
      adminId: admin.adminId,
      adminName: admin.name,
      action: 'CREATE_QUESTION',
      entity: 'problem_questions',
      entityId: String(id),
      details: `Created problem question: ${body.question}`,
    });

    return NextResponse.json({ success: true, id, message: 'Question created' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to create question' }, { status: 500 });
  }
}
