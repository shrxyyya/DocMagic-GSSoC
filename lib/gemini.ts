import { GoogleGenerativeAI } from "@google/generative-ai";

// Validate API key
const GOOGLE_API_KEY = process.env.GEMINI_API_KEY;
if (!GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY environment variable is not set.");
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

// Enhanced presentation generator with Gamma.app styling
export async function generatePresentation({ 
  prompt, 
  pageCount = 8,
  style = "modern",
  themeColor = "blue"
}: { 
  prompt: string; 
  pageCount?: number;
  style?: "modern" | "minimal" | "creative" | "professional";
  themeColor?: string;
}) {
  try {
    await validateApiConnection();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const systemPrompt = `Create a Gamma.app-style presentation about "${prompt}" with ${pageCount} slides.

    Follow Gamma.app design principles:
    1. VISUAL HIERARCHY:
       - Primary image per slide (90% of slides)
       - Text overlays on images with proper contrast
       - Consistent spacing (32px padding)
    
    2. IMAGE SELECTION:
       - Cover: "dramatic ${prompt} background" (full-bleed)
       - Sections: "abstract ${prompt} concept" 
       - Content: "specific ${prompt} illustration"
       - All from Pexels/Unsplash (1080p+)
    
    3. LAYOUTS:
       - 40% cover slides (full-bleed image + title)
       - 30% split-content (image + text side-by-side)
       - 20% quote/stat slides (image with overlay)
       - 10% process slides (image sequence)

    Return JSON array with:
    [{
      title: string,
      subtitle?: string,
      content: string[],
      layout: "cover" | "split-left" | "split-right" | "quote" | "stats" | "process",
      image: {
        url: string, // High-res Pexels/Unsplash URL
        query: string, // Exact search query used
        source: "pexels" | "unsplash",
        filter: "darken" | "lighten" | "blur-light" | null,
        position: "center" | "top" | "left" // Focal point
      },
      design: {
        textColor: "light" | "dark", // Auto contrast
        overlay: string | null, // rgba overlay
        padding: number // 32px default
      },
      // Content fields...
    }]`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const jsonText = extractJsonFromMarkdown(response.text());
    let slides = JSON.parse(jsonText);

    // Apply Gamma.app-style image enhancements
    slides = slides.map((slide: any) => ({
      ...slide,
      image: {
        ...slide.image,
        // Ensure proper Gamma.app image formatting
        url: slide.image.url.includes('?') 
          ? `${slide.image.url}&auto=format&fit=crop&w=1200&h=800` 
          : `${slide.image.url}?auto=format&fit=crop&w=1200&h=800`,
        // Add default focal point if missing
        position: slide.image.position || "center"
      },
      design: {
        // Default Gamma.app styling
        textColor: slide.design?.textColor || "light",
        overlay: slide.design?.overlay || "rgba(0,0,0,0.3)",
        padding: 32
      }
    }));

    return slides.slice(0, pageCount);
  } catch (error) {
    console.error("Error generating presentation:", error);
    throw new Error(`Failed to generate presentation: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
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