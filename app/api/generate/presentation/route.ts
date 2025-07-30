export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { generatePresentation } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    console.log('Presentation generation request received');
    
    const body = await request.json();
    const { prompt, pageCount = 8 } = body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'Valid prompt is required' },
        { status: 400 }
      );
    }

    if (pageCount < 1 || pageCount > 50) {
      return NextResponse.json(
        { error: 'Page count must be between 1 and 50' },
        { status: 400 }
      );
    }

    console.log(`Generating presentation with ${pageCount} pages...`);
    const slides = await generatePresentation({ prompt: prompt.trim(), pageCount });
    
    console.log('Presentation generated successfully');
    return NextResponse.json(slides);
  } catch (error: any) {
    console.error('Error generating presentation:', error);
    
    let errorMessage = 'Failed to generate presentation';
    let statusCode = 500;
    
    if (error.message?.includes('API key')) {
      errorMessage = 'AI service configuration error. Please contact support.';
      statusCode = 503;
    } else if (error.message?.includes('quota')) {
      errorMessage = 'AI service temporarily unavailable. Please try again later.';
      statusCode = 503;
    } else if (error.message?.includes('timeout')) {
      errorMessage = 'Request timed out. Please try with fewer pages or a shorter prompt.';
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
