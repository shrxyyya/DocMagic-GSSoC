import { NextResponse } from 'next/server';
import { generateATSScore } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const jobDescription = formData.get('jobDescription') as string;

    if (!file || !jobDescription) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Read the file content
    const buffer = Buffer.from(await file.arrayBuffer());
    const content = buffer.toString('utf-8');

    const analysis = await generateATSScore({
      resumeContent: content,
      jobDescription,
    });

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error analyzing resume:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
}