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

// Enhanced presentation outline generator with image and chart specifications
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

    Analyze the topic and create an intelligent slide structure with REAL IMAGES and CHARTS. Return a JSON array with this exact format:

    [
      {
        "title": "Slide Title",
        "type": "cover|list|chart|split|process|text",
        "description": "Detailed description of what this slide will contain",
        "content": "Main content for the slide",
        "bullets": ["bullet point 1", "bullet point 2"] (only for list type),
        "chartData": {
          "type": "bar|pie|line|area|scatter",
          "title": "Chart Title",
          "data": [
            {"name": "Q1 2024", "value": 65, "category": "Revenue"},
            {"name": "Q2 2024", "value": 78, "category": "Revenue"},
            {"name": "Q3 2024", "value": 92, "category": "Revenue"}
          ],
          "xAxis": "Time Period",
          "yAxis": "Value ($M)",
          "colors": ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]
        } (only for chart type),
        "imageQuery": "specific search query for relevant high-quality image",
        "imageUrl": "https://images.pexels.com/photos/[ID]/pexels-photo-[ID].jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
        "layout": "cover|split-left|split-right|full-text|chart-focus|image-focus"
      }
    ]

    CRITICAL REQUIREMENTS:
    1. ALWAYS include realistic chart data for chart slides with 4-8 data points
    2. ALWAYS provide specific, relevant image search queries
    3. Use actual Pexels image URLs (use working photo IDs like 3184291, 3184292, 3184293, etc.)
    4. Make chart data realistic and relevant to the topic
    5. Ensure proper data visualization types for the content

    Guidelines by slide type:
    - "cover": Hero image + title, use imageQuery like "professional business team" or topic-specific
    - "chart": Focus on data visualization with realistic business/topic metrics
    - "list": Key points with supporting image, use imageQuery for relevant concept
    - "split": Content + image side by side, specific imageQuery for visual support
    - "process": Workflow/timeline with supporting visuals
    - "text": Detailed content with subtle background image

    Topic Analysis for ${prompt}:
    - Business/Startup: Include market data, growth charts, team photos, office spaces
    - Technical: Include architecture diagrams, code visualizations, tech imagery
    - Educational: Include learning concepts, student imagery, academic settings
    - Marketing: Include audience data, campaign metrics, creative visuals

    ENSURE EVERY SLIDE HAS:
    - Relevant, high-quality image URL from Pexels
    - Realistic data for charts (if chart type)
    - Specific, searchable image queries
    - Proper layout specification`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const jsonText = extractJsonFromMarkdown(response.text());
    const outlines = JSON.parse(jsonText);

    // Enhance outlines with better image URLs and validate chart data
    const enhancedOutlines = outlines.map((outline: any, index: number) => {
      // Ensure proper image URLs
      if (!outline.imageUrl || !outline.imageUrl.includes('pexels.com')) {
        const imageIds = [3184291, 3184292, 3184293, 3184294, 3184295, 3184296, 3184297, 3184298, 3184299, 3184300];
        const randomId = imageIds[index % imageIds.length];
        outline.imageUrl = `https://images.pexels.com/photos/${randomId}/pexels-photo-${randomId}.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800`;
      }

      // Enhance chart data for chart slides
      if (outline.type === 'chart' && outline.chartData) {
        if (!outline.chartData.data || outline.chartData.data.length === 0) {
          // Generate realistic chart data based on topic
          outline.chartData.data = generateRealisticChartData(outline.chartData.type, prompt);
        }
        
        // Ensure chart has proper styling
        outline.chartData.colors = outline.chartData.colors || ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];
        outline.chartData.title = outline.chartData.title || outline.title;
      }

      return outline;
    });

    return enhancedOutlines.slice(0, pageCount);
  } catch (error) {
    console.error("Error generating presentation outline:", error);
    throw new Error(`Failed to generate presentation outline: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Helper function to generate realistic chart data
function generateRealisticChartData(chartType: string, topic: string) {
  const isBusinessTopic = topic.toLowerCase().includes('business') || topic.toLowerCase().includes('startup') || topic.toLowerCase().includes('revenue');
  const isTechTopic = topic.toLowerCase().includes('tech') || topic.toLowerCase().includes('software') || topic.toLowerCase().includes('ai');
  
  if (chartType === 'bar') {
    if (isBusinessTopic) {
      return [
        { name: "Q1 2024", value: 125, category: "Revenue" },
        { name: "Q2 2024", value: 158, category: "Revenue" },
        { name: "Q3 2024", value: 192, category: "Revenue" },
        { name: "Q4 2024", value: 234, category: "Revenue" }
      ];
    } else if (isTechTopic) {
      return [
        { name: "Frontend", value: 45, category: "Development" },
        { name: "Backend", value: 38, category: "Development" },
        { name: "Database", value: 28, category: "Development" },
        { name: "DevOps", value: 22, category: "Development" }
      ];
    }
  } else if (chartType === 'pie') {
    if (isBusinessTopic) {
      return [
        { name: "Product Sales", value: 45 },
        { name: "Services", value: 30 },
        { name: "Licensing", value: 15 },
        { name: "Other", value: 10 }
      ];
    } else if (isTechTopic) {
      return [
        { name: "Web Apps", value: 40 },
        { name: "Mobile Apps", value: 35 },
        { name: "APIs", value: 15 },
        { name: "Other", value: 10 }
      ];
    }
  } else if (chartType === 'line') {
    if (isBusinessTopic) {
      return [
        { name: "Jan", value: 65 },
        { name: "Feb", value: 78 },
        { name: "Mar", value: 82 },
        { name: "Apr", value: 95 },
        { name: "May", value: 108 },
        { name: "Jun", value: 125 }
      ];
    }
  }

  // Default fallback data
  return [
    { name: "Category A", value: 65 },
    { name: "Category B", value: 78 },
    { name: "Category C", value: 92 },
    { name: "Category D", value: 45 }
  ];
}

// Enhanced full presentation generator with rich visual content
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
    
    const systemPrompt = `Generate a complete presentation with RICH VISUAL CONTENT based on these outlines and the original prompt: "${prompt}"

    Template: ${template}
    
    Outlines: ${JSON.stringify(outlines)}

    Create detailed slides with REAL IMAGES and INTERACTIVE CHARTS. Use this JSON structure:
    [
      {
        "id": 1,
        "title": "Compelling Slide Title",
        "content": "Detailed slide content (2-3 engaging sentences)",
        "layout": "cover|list|chart|split|process|text",
        "bullets": ["detailed bullet point 1", "detailed bullet point 2"] (if applicable),
        "charts": {
          "type": "bar|pie|line|area|scatter",
          "title": "Professional Chart Title",
          "data": [
            {"name": "Category", "value": number, "category": "optional"},
            {"name": "Category 2", "value": number, "category": "optional"}
          ],
          "xAxis": "X-Axis Label",
          "yAxis": "Y-Axis Label", 
          "colors": ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
          "showLegend": true,
          "showGrid": true
        } (if chart layout),
        "image": "https://images.pexels.com/photos/[ID]/pexels-photo-[ID].jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
        "imageAlt": "Descriptive alt text for the image",
        "imagePosition": "center|top|left|right",
        "backgroundColor": "#ffffff",
        "textColor": "#1a1a1a",
        "accentColor": "#3B82F6",
        "template": "${template}",
        "slideNumber": number,
        "animations": {
          "entrance": "fadeIn|slideIn|zoomIn",
          "emphasis": "pulse|bounce|shake",
          "exit": "fadeOut|slideOut|zoomOut"
        }
      }
    ]

    CRITICAL REQUIREMENTS:
    1. Use REAL, working Pexels image URLs for every slide
    2. Generate REALISTIC chart data with proper business/topic metrics
    3. Ensure images are relevant and high-quality (1200x800 minimum)
    4. Make chart data meaningful and support the narrative
    5. Include proper styling and animations for engagement

    Content Guidelines:
    - Make titles compelling and action-oriented
    - Write content that tells a story and flows logically
    - Use bullet points that are specific and actionable
    - Ensure chart data supports key messages
    - Choose images that enhance understanding

    Visual Guidelines:
    - Use high-contrast, professional images
    - Ensure chart colors are accessible and branded
    - Apply consistent styling based on template
    - Include subtle animations for engagement
    - Maintain visual hierarchy throughout

    Template Styling for ${template}:
    - modern: Clean, blue accents (#3B82F6), white background, professional imagery
    - minimal: Subtle, gray tones (#6B7280), lots of whitespace, simple imagery
    - creative: Vibrant, purple/pink gradients (#8B5CF6), dynamic imagery
    - dark: Dark background (#1F2937), light text, blue accents (#60A5FA)
    - gradient: Gradient backgrounds, white text, colorful imagery`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const jsonText = extractJsonFromMarkdown(response.text());
    const slides = JSON.parse(jsonText);

    // Enhance slides with template-specific styling and ensure all visual elements
    const enhancedSlides = slides.map((slide: any, index: number) => {
      const templateStyles = getTemplateStyles(template);
      
      // Ensure every slide has a proper image
      if (!slide.image || !slide.image.includes('pexels.com')) {
        const imageIds = [3184291, 3184292, 3184293, 3184294, 3184295, 3184296, 3184297, 3184298, 3184299, 3184300, 3184311, 3184312, 3184313, 3184314, 3184315];
        const randomId = imageIds[index % imageIds.length];
        slide.image = `https://images.pexels.com/photos/${randomId}/pexels-photo-${randomId}.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800`;
      }

      // Enhance chart data if present
      if (slide.charts && slide.layout === 'chart') {
        slide.charts.colors = slide.charts.colors || ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];
        slide.charts.showLegend = slide.charts.showLegend !== false;
        slide.charts.showGrid = slide.charts.showGrid !== false;
        
        // Ensure chart has meaningful data
        if (!slide.charts.data || slide.charts.data.length === 0) {
          slide.charts.data = generateRealisticChartData(slide.charts.type, prompt);
        }
      }

      return {
        ...slide,
        id: index + 1,
        slideNumber: index + 1,
        template,
        ...templateStyles,
        imageAlt: slide.imageAlt || `Professional image for ${slide.title}`,
        imagePosition: slide.imagePosition || "center",
        animations: slide.animations || {
          entrance: "fadeIn",
          emphasis: "pulse",
          exit: "fadeOut"
        }
      };
    });

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
      backgroundColor: '#1f2937',
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