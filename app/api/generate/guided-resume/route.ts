export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { generateGuidedResume } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      personalInfo,
      professionalSummary,
      workExperience,
      education,
      skills,
      projects,
      certifications,
      links,
      targetRole,
      jobDescription
    } = body;

    if (!personalInfo || !targetRole) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    try {
      const resume = await generateGuidedResume({
        personalInfo,
        professionalSummary,
        workExperience,
        education,
        skills,
        projects,
        certifications,
        links,
        targetRole,
        jobDescription
      });
      
      return NextResponse.json(resume);
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
  } catch (error: any) {
    console.error('Error generating guided resume:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate resume',
        message: error?.message || 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
}