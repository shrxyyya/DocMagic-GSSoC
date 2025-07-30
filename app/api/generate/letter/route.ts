export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { generateLetter } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    console.log('Letter generation request received');
    
    const body = await request.json();
    const { prompt, fromName, fromAddress, toName, toAddress, letterType } = body;

    // Validate required fields
    const missingFields = [];
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) missingFields.push('prompt');
    if (!fromName || typeof fromName !== 'string' || fromName.trim().length === 0) missingFields.push('fromName');
    if (!toName || typeof toName !== 'string' || toName.trim().length === 0) missingFields.push('toName');
    if (!letterType || typeof letterType !== 'string' || letterType.trim().length === 0) missingFields.push('letterType');

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    console.log(`Generating ${letterType} letter...`);
    const letter = await generateLetter({
      prompt: prompt.trim(),
      fromName: fromName.trim(),
      fromAddress: fromAddress?.trim() || '',
      toName: toName.trim(),
      toAddress: toAddress?.trim() || '',
      letterType: letterType.trim(),
    });
    
    // Format the response to ensure it has the expected structure
    const formattedResponse = {
      from: {
        name: letter.from?.name || fromName.trim(),
        address: letter.from?.address || fromAddress?.trim() || ""
      },
      to: {
        name: letter.to?.name || toName.trim(),
        address: letter.to?.address || toAddress?.trim() || ""
      },
      date: letter.date || new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      subject: letter.subject || "Re: " + prompt.substring(0, 30) + "...",
      content: letter.content || letter.letter || "Letter content not available."
    };
    
    console.log('Letter generated successfully');
    return NextResponse.json(formattedResponse);
  } catch (error: any) {
    console.error('Error generating letter:', error);
    
    let errorMessage = 'Failed to generate letter';
    let statusCode = 500;
    
    if (error.message?.includes('API key')) {
      errorMessage = 'AI service configuration error. Please contact support.';
      statusCode = 503;
    } else if (error.message?.includes('quota')) {
      errorMessage = 'AI service temporarily unavailable. Please try again later.';
      statusCode = 503;
    } else if (error.message?.includes('timeout')) {
      errorMessage = 'Request timed out. Please try with a shorter prompt.';
      statusCode = 408;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}
