import { GoogleGenerativeAI } from "@google/generative-ai";

// Validate API key with more detailed error message
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
if (!GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY environment variable is not set. Please ensure it is properly configured in your .env file.");
}

// Initialize with error handling
let genAI: GoogleGenerativeAI;
try {
  genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
} catch (error) {
  console.error("Failed to initialize Google Generative AI:", error);
  throw new Error("Failed to initialize Google Generative AI. Please check your API key configuration.");
}

function extractJsonFromMarkdown(text: string): string {
  // Try to extract JSON from markdown code block
  const jsonMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  // Return the matched content or the original text if no match
  return jsonMatch ? jsonMatch[1].trim() : text.trim();
}

async function validateApiConnection() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); 
    // Simple test generation to validate API connection
    await model.generateContent("test");
    return true;
  } catch (error) {
    console.error("API Connection Test Failed:", error);
    throw new Error("Unable to connect to Google Generative AI API. Please check your API key and network connectivity.");
  }
}

export async function generateATSScore({ 
  resumeContent, 
  jobDescription 
}: { 
  resumeContent: string; 
  jobDescription: string;
}) {
  try {
    await validateApiConnection();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const systemPrompt = `Analyze this resume against the job description and provide detailed ATS scoring feedback.

Resume Content:
${resumeContent}

Job Description:
${jobDescription}

Return the response as a JSON object with the following structure:
{
  score: number, // 0-100 ATS compatibility score
  analysis: {
    keywordMatch: {
      found: string[], // Keywords found in both resume and job description
      missing: string[] // Important keywords from job description missing in resume
    },
    formatIssues: string[], // List of formatting issues that could affect ATS parsing
    sectionScores: {
      skills: number, // 0-100
      experience: number, // 0-100
      education: number // 0-100
    }
  },
  improvements: {
    critical: string[], // Critical improvements needed
    recommended: string[] // Nice-to-have improvements
  }
}`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const jsonText = extractJsonFromMarkdown(response.text());
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw new Error(`Failed to analyze resume: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function generateResume({ 
  prompt, 
  name, 
  email 
}: { 
  prompt: string; 
  name: string; 
  email: string;
}) {
  try {
    await validateApiConnection();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const systemPrompt = `Create a professional resume for ${name} (${email}) based on the following prompt: ${prompt}. 
    Return the response as a JSON object with the following structure:
    {
      name: string,
      email: string,
      phone: string,
      location: string,
      summary: string,
      experience: Array<{
        title: string,
        company: string,
        date: string,
        description: string[]
      }>,
      education: Array<{
        degree: string,
        institution: string,
        date: string
      }>,
      skills: string[],
      projects: Array<{
        name: string,
        description: string
      }>
    }`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const jsonText = extractJsonFromMarkdown(response.text());
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error generating resume:", error);
    throw new Error(`Failed to generate resume: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function generatePresentation({ 
  prompt, 
  pageCount = 8 
}: { 
  prompt: string; 
  pageCount?: number;
}) {
  try {
    await validateApiConnection();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const systemPrompt = `Create a visually stunning presentation with exactly ${pageCount} slides based on the following prompt: ${prompt}.
    Return the response as a JSON array of slides with the following structure:
    Array<{
      title: string,
      subtitle?: string,
      content: string,
      layout: "cover" | "title" | "content" | "image-left" | "image-right" | "full-image" | "quote" | "bullets",
      image?: string, // Pexels URL
      backgroundColor?: string, // Tailwind color class
      textColor?: string, // Tailwind color class
      bullets?: string[], // For bullet point layouts
      quote?: {
        text: string,
        author: string,
        role?: string
      }, // For quote layouts
      charts?: {
        type: "pie" | "bar" | "line",
        data: any
      } // For data visualization slides
    }>`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const jsonText = extractJsonFromMarkdown(response.text());
    const slides = JSON.parse(jsonText);
    
    return slides.slice(0, pageCount);
  } catch (error) {
    console.error("Error generating presentation:", error);
    throw new Error(`Failed to generate presentation: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function generateLetter({ 
  prompt, 
  fromName, 
  fromAddress, 
  toName, 
  toAddress, 
  letterType 
}: { 
  prompt: string;
  fromName: string;
  fromAddress?: string;
  toName: string;
  toAddress?: string;
  letterType: string;
}) {
  try {
    await validateApiConnection();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const systemPrompt = `Create a professional ${letterType} letter based on the following prompt: ${prompt}.
    The letter is from ${fromName} to ${toName}.
    Return the response as a JSON object with the following structure:
    {
      from: {
        name: string,
        address?: string
      },
      to: {
        name: string,
        address?: string
      },
      date: string,
      subject: string,
      content: string
    }`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const jsonText = extractJsonFromMarkdown(response.text());
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error generating letter:", error);
    throw new Error(`Failed to generate letter: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}