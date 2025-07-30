export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { generateResume } from '@/lib/gemini';
import { validateAndSanitize, resumeGenerationSchema, detectSqlInjection, sanitizeInput } from '@/lib/validation';
import { createRoute } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    console.log('Resume generation request received');
    
    // Optional authentication check - allow anonymous usage
    let session = null;
    try {
      const supabase = createRoute();
      const { data } = await supabase.auth.getSession();
      session = data.session;
    } catch (authError) {
      console.warn('Authentication check failed, allowing anonymous usage:', authError);
    }

    const rawBody = await request.json();
    console.log('Request body parsed successfully');

    // Validate and sanitize input
    const { prompt, name, email } = validateAndSanitize(resumeGenerationSchema, rawBody);

    // Additional security checks
    if (detectSqlInjection(prompt) || detectSqlInjection(name) || detectSqlInjection(email)) {
      console.log('SQL injection attempt detected');
      return NextResponse.json(
        { error: 'Invalid input detected' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedPrompt = sanitizeInput(prompt);
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);

    console.log('Calling generateResume function...');
    const resume = await generateResume({ 
      prompt: sanitizedPrompt, 
      name: sanitizedName, 
      email: sanitizedEmail 
    });
    
    console.log('Resume generated successfully');
    return NextResponse.json(resume);
  } catch (error: any) {
    console.error('Error generating resume:', error);
    
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
