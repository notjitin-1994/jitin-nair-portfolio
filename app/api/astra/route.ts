import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, sessionId } = await req.body ? await req.json() : {};

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // This URL will be managed via Vercel Environment Variables
    // For now, I am using the active tunnel URL internally
    const ASTRA_LOCAL_URL = process.env.ASTRA_LOCAL_URL || "https://ferrari-boutique-preparing-adjust.trycloudflare.com/api/chat";
    const SHARED_SECRET = process.env.ASTRA_SHARED_SECRET || "astra-hype-secret-2026";

    const response = await fetch(ASTRA_LOCAL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SHARED_SECRET}`,
      },
      body: JSON.stringify({ message, sessionId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to communicate with Astra');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Astra Gateway Error:', error.message);
    return NextResponse.json(
      { error: 'Astra is currently optimizing her neural pathways. Please try again shortly.' },
      { status: 500 }
    );
  }
}
