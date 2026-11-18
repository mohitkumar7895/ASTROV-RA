import { NextRequest, NextResponse } from 'next/server';
import { bookingFormSchema } from '@/lib/validations';
import { createEnquiry, getEnquiries, logActivity } from '@/lib/queries';
import { generateBookingRef } from '@/lib/utils';
import { getCurrentAdmin, hasPermission } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') || undefined;
    const serviceId = searchParams.get('serviceId') ? Number(searchParams.get('serviceId')) : undefined;
    const startDate = searchParams.get('startDate') || undefined;
    const endDate = searchParams.get('endDate') || undefined;
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const offset = (page - 1) * limit;

    const data = await getEnquiries({
      search,
      status,
      serviceId,
      startDate,
      endDate,
      limit,
      offset,
    });

    return NextResponse.json({
      enquiries: data.enquiries,
      total: data.total,
      page,
      limit,
      totalPages: Math.ceil(data.total / limit),
    });
  } catch (err: any) {
    console.error('Fetch enquiries error:', err);
    return NextResponse.json({ error: 'Failed to retrieve enquiries' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = bookingFormSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: validated.error.issues },
        { status: 400 }
      );
    }

    const data = validated.data;
    const bookingRef = generateBookingRef();

    const insertId = await createEnquiry({
      booking_ref: bookingRef,
      full_name: data.fullName,
      phone: data.phone,
      email: data.email || null,
      dob: data.dob || null,
      birth_time: data.birthTime || null,
      birth_place: data.birthPlace || null,
      service_id: data.serviceId || null,
      service_name: data.serviceName || null,
      preferred_date: data.preferredDate || null,
      preferred_time_slot: data.preferredTimeSlot || null,
      selected_problem: data.selectedProblem || null,
      message: data.message || null,
      status: 'New',
      source: 'website_booking',
    });

    return NextResponse.json({
      success: true,
      message: 'Consultation enquiry received successfully',
      bookingRef,
      id: insertId,
    });
  } catch (err: any) {
    console.error('Submit booking error:', err);
    return NextResponse.json(
      { error: 'Failed to process consultation request' },
      { status: 500 }
    );
  }
}
