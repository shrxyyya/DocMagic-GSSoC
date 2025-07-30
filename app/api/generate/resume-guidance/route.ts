export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { generateResumeStepGuidance } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { step, targetRole, existingData } = body;

    if (!step || !targetRole) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const guidance = await generateResumeStepGuidance(step, targetRole, existingData);
    return NextResponse.json(guidance);
  } catch (error) {
    console.error('Error generating resume guidance:', error);
    return NextResponse.json(
      { error: 'Failed to generate guidance' },
      { status: 500 }
    );
  }
}
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { generateResumeStepGuidance } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    console.log('Resume guidance request received');
    
    const body = await request.json();
    const { step, targetRole, existingData } = body;

    if (!step || !targetRole) {
      return NextResponse.json(
        { error: 'Step and target role are required' },
        { status: 400 }
      );
    }

    console.log('Generating guidance for step:', step);
    const guidance = await generateResumeStepGuidance(step, targetRole, existingData);
    
    console.log('Guidance generated successfully');
    return NextResponse.json(guidance);
  } catch (error: any) {
    console.error('Error generating guidance:', error);
    
    let errorMessage = 'Failed to generate guidance';
    let statusCode = 500;
    
    if (error.message?.includes('API key')) {
      errorMessage = 'AI service configuration error. Please contact support.';
      statusCode = 503;
    } else if (error.message?.includes('quota')) {
      errorMessage = 'AI service temporarily unavailable due to high demand. Please try again later.';
      statusCode = 503;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}
