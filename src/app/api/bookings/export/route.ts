import { NextRequest, NextResponse } from 'next/server';
import { getEnquiries } from '@/lib/queries';
import { getCurrentAdmin } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { enquiries } = await getEnquiries({ limit: 1000, offset: 0 });

    const headers = [
      'Booking Ref',
      'Full Name',
      'Phone',
      'Email',
      'Service',
      'Preferred Date',
      'Preferred Slot',
      'Selected Query',
      'Status',
      'Created At',
    ];

    const rows = enquiries.map((e) => [
      `"${e.booking_ref}"`,
      `"${(e.full_name || '').replace(/"/g, '""')}"`,
      `"${e.phone}"`,
      `"${e.email || ''}"`,
      `"${e.service_name || ''}"`,
      `"${e.preferred_date || ''}"`,
      `"${e.preferred_time_slot || ''}"`,
      `"${(e.selected_problem || '').replace(/"/g, '""')}"`,
      `"${e.status}"`,
      `"${e.created_at}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="astrovera-enquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}
