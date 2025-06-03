export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { generateLetter } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, fromName, fromAddress, toName, toAddress, letterType } = body;

    if (!prompt || !fromName || !toName || !letterType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const letter = await generateLetter({
      prompt,
      fromName,
      fromAddress,
      toName,
      toAddress,
      letterType,
    });
    return NextResponse.json(letter);
  } catch (error) {
    console.error('Error generating letter:', error);
    return NextResponse.json(
      { error: 'Failed to generate letter' },
      { status: 500 }
    );
  }
}