import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Forward to Railway backend
    const response = await fetch('https://calm-respect-production.up.railway.app/predict', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Railway backend error');
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to prediction service' },
      { status: 500 }
    );
  }
}
