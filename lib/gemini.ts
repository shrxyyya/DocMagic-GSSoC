import { GoogleGenerativeAI } from "@google/generative-ai";

// Validate API key
const GOOGLE_API_KEY = process.env.GEMINI_API_KEY;
if (!GOOGLE_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}

// Initialize with error handling
let genAI: GoogleGenerativeAI;
try {
  genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
} catch (error) {
  console.error("Failed to initialize Google Generative AI:", error);
  throw new Error("Failed to initialize Google Generative AI.");
}

function extractJsonFromMarkdown(text: string): string {
  const jsonMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  return jsonMatch ? jsonMatch[1].trim() : text.trim();
}

async function validateApiConnection() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    await model.generateContent("test");
    return true;
  } catch (error) {
    console.error("API Connection Test Failed:", error);
    throw new Error("Unable to connect to Google Generative AI API.");
  }
}

// Enhanced presentation outline generator
export async function generatePresentationOutline({ 
  prompt, 
  pageCount = 8 
}: { 
  prompt: string; 
  pageCount?: number;
}) {
  try {
    await validateApiConnection();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const systemPrompt = `Create a smart presentation outline for: "${prompt}" with ${pageCount} slides.

    Analyze the topic and create an intelligent slide structure. Return a JSON array with this exact format:

    [
      {
        "title": "Slide Title",
        "type": "cover|list|chart|split|process|text",
        "description": "Detailed description of what this slide will contain",
        "content": "Main content for the slide",
        "bullets": ["bullet point 1", "bullet point 2"] (only for list type),
        "chartData": {
          "type": "bar|pie|line",
          "data": [{"name": "Q1", "value": 65}]
        } (only for chart type),
        "imageQuery": "search query for relevant image",
        "layout": "cover|split-left|split-right|full-text|chart-focus"
      }
    ]

    Guidelines:
    1. First slide should always be "cover" type
    2. Use "chart" type for data, statistics, or metrics
    3. Use "list" type for key points, features, or steps
    4. Use "split" type for content that needs visual support
    5. Use "process" type for workflows or timelines
    6. Use "text" type for detailed explanations
    7. Make content specific and actionable
    8. Include relevant chart data for chart slides
    9. Provide specific image search queries

    Topic Analysis:
    - Business/Startup: Include market, problem, solution, traction, financials
    - Technical: Include architecture, implementation, performance, security
    - Educational: Include objectives, concepts, examples, assessment
    - Marketing: Include audience, strategy, creative, metrics`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const jsonText = extractJsonFromMarkdown(response.text());
    const outlines = JSON.parse(jsonText);

    return outlines.slice(0, pageCount);
  } catch (error) {
    console.error("Error generating presentation outline:", error);
    throw new Error(`Failed to generate presentation outline: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Enhanced full presentation generator
export async function generatePresentation({ 
  outlines,
  template = "modern",
  prompt
}: { 
  outlines: any[];
  template?: string;
  prompt: string;
}) {
  try {
    await validateApiConnection();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const systemPrompt = `Generate a complete presentation based on these outlines and the original prompt: "${prompt}"

    Template: ${template}
    
    Outlines: ${JSON.stringify(outlines)}

    Create detailed slides with the following JSON structure:
    [
      {
        "id": 1,
        "title": "Slide Title",
        "content": "Detailed slide content (2-3 sentences)",
        "layout": "cover|list|chart|split|process|text",
        "bullets": ["detailed bullet point 1", "detailed bullet point 2"] (if applicable),
        "charts": {
          "type": "bar|pie|line",
          "data": [{"name": "Category", "value": number}],
          "title": "Chart Title"
        } (if applicable),
        "image": "https://images.pexels.com/photos/[relevant-image-id]/pexels-photo-[id].jpeg?auto=compress&cs=tinysrgb&w=1200",
        "backgroundColor": "#ffffff",
        "textColor": "#1a1a1a",
        "template": "${template}",
        "slideNumber": number
      }
    ]

    Requirements:
    1. Generate rich, detailed content for each slide
    2. For chart slides, create realistic data that supports the narrative
    3. Use high-quality Pexels image URLs (use actual working URLs)
    4. Ensure content flows logically from slide to slide
    5. Make bullet points specific and actionable
    6. Include proper styling based on template
    7. Create compelling titles that grab attention
    8. Ensure content is professional and engaging

    Template Styling:
    - modern: Clean, blue accents, white background
    - minimal: Subtle, gray tones, lots of whitespace  
    - creative: Vibrant, purple/pink gradients
    - dark: Dark background, light text, blue accents
    - gradient: Gradient backgrounds, white text`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const jsonText = extractJsonFromMarkdown(response.text());
    const slides = JSON.parse(jsonText);

    // Enhance slides with template-specific styling
    const enhancedSlides = slides.map((slide: any, index: number) => ({
      ...slide,
      id: index + 1,
      slideNumber: index + 1,
      template,
      ...getTemplateStyles(template)
    }));

    return enhancedSlides;
  } catch (error) {
    console.error("Error generating presentation:", error);
    throw new Error(`Failed to generate presentation: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

function getTemplateStyles(template: string) {
  const styles = {
    modern: {
      backgroundColor: '#ffffff',
      textColor: '#1a1a1a',
      accentColor: '#3b82f6',
      borderColor: '#e5e7eb'
    },
    minimal: {
      backgroundColor: '#f8f9fa',
      textColor: '#2d3748',
      accentColor: '#6b7280',
      borderColor: '#d1d5db'
    },
    creative: {
      backgroundColor: '#ffffff',
      textColor: '#1a1a1a',
      accentColor: '#8b5cf6',
      borderColor: '#e5e7eb'
    },
    dark: {
      backgroundColor: '#1a1a1a',
      textColor: '#ffffff',
      accentColor: '#60a5fa',
      borderColor: '#374151'
    },
    gradient: {
      backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: '#ffffff',
      accentColor: '#93c5fd',
      borderColor: '#60a5fa'
    }
  };
  
  return styles[template as keyof typeof styles] || styles.modern;
}

// Original resume and letter generators remain unchanged
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
    
    const systemPrompt = `Create a professional resume for ${name} (${email}) based on: ${prompt}. 
    Return as JSON with structure:
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
    
    const systemPrompt = `Create a ${letterType} letter from ${fromName} to ${toName} about: ${prompt}.
    Return as JSON:
    {
      from: { name: string, address?: string },
      to: { name: string, address?: string },
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

// ATS score generator remains unchanged
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
    
    const systemPrompt = `Analyze resume against job description:
    Resume: ${resumeContent}
    Job: ${jobDescription}
    Return JSON with:
    {
      score: number,
      analysis: {
        keywordMatch: { found: string[], missing: string[] },
        formatIssues: string[],
        sectionScores: { skills: number, experience: number, education: number }
      },
      improvements: { critical: string[], recommended: string[] }
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