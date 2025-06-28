export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { generateLetter } from '@/lib/gemini';

// Only export HTTP methods (GET, POST, etc.)
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
    
    // Format the response to ensure it has the expected structure
    const formattedResponse = {
      from: {
        name: fromName,
        address: fromAddress || ""
      },
      to: {
        name: toName,
        address: toAddress || ""
      },
      date: letter.date || new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      subject: letter.subject || "Re: " + prompt.substring(0, 30) + "...",
      content: letter.content || letter.letter || "Letter content not available."
    };
    
    return NextResponse.json(formattedResponse);
  } catch (error) {
    console.error('Error generating letter:', error);
    return NextResponse.json(
      { error: 'Failed to generate letter' },
      { status: 500 }
    );
  }
}