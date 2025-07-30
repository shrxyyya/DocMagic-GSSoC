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
  } catch (error) {
    console.error('Error generating guided resume:', error);
    return NextResponse.json(
      { error: 'Failed to generate resume' },
      { status: 500 }
    );
  }
}
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { generateGuidedResume } from '@/lib/gemini';
import { createRoute } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    console.log('Guided resume generation request received');
    
    // authentication check 
    let session = null;
    try {
      const supabase = createRoute();
      const { data } = await supabase.auth.getSession();
      session = data.session;
    } catch (authError) {
      console.warn('Authentication check failed, allowing anonymous usage:', authError);
    }

    const body = await request.json();
    console.log('Request body parsed successfully');

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

    // Validate required fields
    if (!personalInfo?.name || !personalInfo?.email) {
      return NextResponse.json(
        { error: 'Personal information (name and email) is required' },
        { status: 400 }
      );
    }

    if (!targetRole) {
      return NextResponse.json(
        { error: 'Target role is required' },
        { status: 400 }
      );
    }

    console.log('Calling generateGuidedResume function...');
    const resume = await generateGuidedResume({
      personalInfo,
      professionalSummary,
      workExperience: workExperience || [],
      education: education || [],
      skills: skills || [],
      projects: projects || [],
      certifications: certifications || [],
      links: links || {},
      targetRole,
      jobDescription
    });
    
    console.log('Guided resume generated successfully');
    return NextResponse.json(resume);
  } catch (error: any) {
    console.error('Error generating guided resume:', error);
    
    // Return more specific error messages
    let errorMessage = 'Failed to generate resume';
    let statusCode = 500;
    
    if (error.message?.includes('API key')) {
      errorMessage = 'AI service configuration error. Please contact support.';
      statusCode = 503;
    } else if (error.message?.includes('quota')) {
      errorMessage = 'AI service temporarily unavailable due to high demand. Please try again later.';
      statusCode = 503;
    } else if (error.message?.includes('timeout')) {
      errorMessage = 'Request timed out. Please try again with a shorter prompt.';
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
