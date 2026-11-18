import { NextResponse } from 'next/server';
import { getDashboardStats } from '@/lib/queries';
import { getCurrentAdmin } from '@/lib/session';

export const revalidate = 0;

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const stats = await getDashboardStats();
    return NextResponse.json({ stats });
  } catch (err: any) {
    console.error('Dashboard stats error:', err);
    return NextResponse.json({ error: 'Failed to retrieve dashboard stats' }, { status: 500 });
  }
}
