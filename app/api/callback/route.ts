import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone } = body;

    // Validation
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Ім\'я та телефон обов\'язкові' },
        { status: 400 }
      );
    }

    // Phone validation
    const phoneRegex = /^\+?380\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Невірний формат телефону' },
        { status: 400 }
      );
    }

    // Log callback request
    console.log('Callback request:', {
      name,
      phone,
      timestamp: new Date().toISOString(),
    });

    // Here you would typically:
    // 1. Send notification to call center
    // 2. Create task in CRM
    // 3. Send SMS/notification to manager

    return NextResponse.json(
      { success: true, message: 'Ми передзвонимо вам протягом 15 хвилин.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing callback:', error);
    return NextResponse.json(
      { error: 'Помилка обробки запиту. Спробуйте пізніше.' },
      { status: 500 }
    );
  }
}
