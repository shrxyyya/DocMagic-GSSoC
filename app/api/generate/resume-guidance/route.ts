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

    try {
      const guidance = await generateResumeStepGuidance(step, targetRole, existingData);
      return NextResponse.json(guidance);
    } catch (apiError: any) {
      // Check if it's a service overload error
      if (apiError?.message?.includes('503 Service Unavailable') || 
          apiError?.message?.includes('overloaded')) {
        // Return a more specific error for service overload
        return NextResponse.json(
          { 
            error: 'AI service is currently overloaded', 
            message: 'Please try again in a few moments',
            retryable: true
          },
          { status: 503 }
        );
      }
      
      // Re-throw for general error handling
      throw apiError;
    }
  } catch (error) {
    console.error('Error generating resume guidance:', error);
    return NextResponse.json(
      { error: 'Failed to generate guidance' },
      { status: 500 }
    );
  }
}