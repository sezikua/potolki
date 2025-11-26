import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, message, service, area } = body;

    // Validation
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Ім\'я та телефон обов\'язкові' },
        { status: 400 }
      );
    }

    // Phone validation (basic)
    const phoneRegex = /^\+?380\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Невірний формат телефону' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Send email notification
    // 2. Save to database
    // 3. Send to CRM (e.g., HubSpot, Pipedrive)
    // 4. Send notification to team chat (Slack, Telegram)

    // Example: Log to console (in production, replace with actual integrations)
    console.log('Contact form submission:', {
      name,
      phone,
      email,
      message,
      service,
      area,
      timestamp: new Date().toISOString(),
    });

    // Example webhook call (uncomment and configure)
    /*
    await fetch(process.env.CRM_WEBHOOK_URL || '', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        phone,
        email,
        message,
        service,
        area,
        source: 'website',
      }),
    });
    */

    return NextResponse.json(
      { success: true, message: 'Дякуємо! Ми зв\'яжемося з вами найближчим часом.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Помилка обробки форми. Спробуйте пізніше.' },
      { status: 500 }
    );
  }
}
