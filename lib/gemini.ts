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

// Enhanced presentation outline generator with professional styling
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
    
    const systemPrompt = `Create a PROFESSIONAL presentation outline for: "${prompt}" with ${pageCount} slides.

    Analyze the topic and create an intelligent slide structure with REAL IMAGES and PROFESSIONAL CHARTS like Canva/Gamma.app. Return a JSON array with this exact format:

    [
      {
        "title": "Compelling Slide Title",
        "type": "cover|list|chart|split|process|text",
        "description": "Detailed description of what this slide will contain",
        "content": "Main content for the slide (2-3 engaging sentences)",
        "bullets": ["specific bullet point 1", "actionable bullet point 2"] (only for list type),
        "chartData": {
          "type": "bar|pie|line|area|scatter",
          "title": "Professional Chart Title",
          "data": [
            {"name": "Q1 2024", "value": 65, "category": "Revenue"},
            {"name": "Q2 2024", "value": 78, "category": "Revenue"},
            {"name": "Q3 2024", "value": 92, "category": "Revenue"},
            {"name": "Q4 2024", "value": 105, "category": "Revenue"}
          ],
          "xAxis": "Time Period",
          "yAxis": "Value ($M)",
          "colors": ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
          "showLegend": true,
          "showGrid": true
        } (only for chart type),
        "imageQuery": "specific professional image search query",
        "imageUrl": "https://images.pexels.com/photos/[ID]/pexels-photo-[ID].jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
        "layout": "cover|split|chart-focus|list-visual|process-flow|text-image"
      }
    ]

    CRITICAL REQUIREMENTS FOR PROFESSIONAL STYLING:
    1. ALWAYS include realistic, meaningful chart data with 4-8 data points
    2. ALWAYS provide specific, relevant image search queries for professional photos
    3. Use actual working Pexels image URLs (photo IDs: 3184291, 3184292, 3184293, etc.)
    4. Make chart data realistic and support the narrative
    5. Ensure proper visual hierarchy and professional design principles

    SLIDE TYPE GUIDELINES:
    - "cover": Hero slide with compelling title + professional background image
    - "chart": Data-driven slide with meaningful business/topic metrics
    - "list": Key points with supporting professional imagery
    - "split": Content + high-quality image side by side
    - "process": Step-by-step workflow with visual elements
    - "text": Detailed content with subtle supporting imagery

    PROFESSIONAL IMAGE SELECTION:
    - Business/Startup: Team meetings, office spaces, growth charts, handshakes
    - Technology: Modern devices, coding, innovation, digital transformation
    - Education: Learning environments, students, academic settings
    - Marketing: Creative teams, campaigns, analytics, customer engagement
    - Finance: Professional meetings, charts, banking, investment

    CHART DATA REQUIREMENTS:
    - Use realistic business metrics relevant to the topic
    - Include proper labels and meaningful categories
    - Ensure data tells a story and supports key messages
    - Use professional color schemes
    - Include legends and grid lines for clarity

    Topic Analysis for "${prompt}":
    Create slides that flow logically and tell a compelling story with professional visuals.`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const jsonText = extractJsonFromMarkdown(response.text());
    const outlines = JSON.parse(jsonText);

    // Enhance outlines with professional styling and ensure all visual elements
    const enhancedOutlines = outlines.map((outline: any, index: number) => {
      // Ensure proper professional image URLs
      if (!outline.imageUrl || !outline.imageUrl.includes('pexels.com')) {
        const professionalImageIds = [
          3184291, 3184292, 3184293, 3184294, 3184295, 3184296, 3184297, 3184298, 3184299, 3184300,
          3184311, 3184312, 3184313, 3184314, 3184315, 3184316, 3184317, 3184318, 3184319, 3184320,
          3184321, 3184322, 3184323, 3184324, 3184325, 3184326, 3184327, 3184328, 3184329, 3184330
        ];
        const randomId = professionalImageIds[index % professionalImageIds.length];
        outline.imageUrl = `https://images.pexels.com/photos/${randomId}/pexels-photo-${randomId}.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800`;
      }

      // Enhance chart data for professional presentations
      if (outline.type === 'chart' && outline.chartData) {
        if (!outline.chartData.data || outline.chartData.data.length === 0) {
          outline.chartData.data = generateProfessionalChartData(outline.chartData.type, prompt);
        }
        
        // Ensure professional chart styling
        outline.chartData.colors = outline.chartData.colors || ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];
        outline.chartData.showLegend = true;
        outline.chartData.showGrid = true;
        outline.chartData.title = outline.chartData.title || outline.title;
      }

      // Ensure professional image queries
      if (!outline.imageQuery) {
        outline.imageQuery = generateProfessionalImageQuery(outline.type, outline.title, prompt);
      }

      return outline;
    });

    return enhancedOutlines.slice(0, pageCount);
  } catch (error) {
    console.error("Error generating presentation outline:", error);
    throw new Error(`Failed to generate presentation outline: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Enhanced full presentation generator with professional Canva-style templates
export async function generatePresentation({ 
  outlines,
  template = "modern-business",
  prompt
}: { 
  outlines: any[];
  template?: string;
  prompt: string;
}) {
  try {
    await validateApiConnection();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const systemPrompt = `Generate a PROFESSIONAL presentation with CANVA-STYLE DESIGN based on these outlines and template: "${template}"

    Original prompt: "${prompt}"
    Template: ${template}
    Outlines: ${JSON.stringify(outlines)}

    Create slides with PROFESSIONAL STYLING like Canva/Gamma.app. Use this JSON structure:
    [
      {
        "id": 1,
        "title": "Compelling Professional Title",
        "content": "Engaging content that tells a story (2-3 sentences)",
        "layout": "cover|list|chart|split|process|text",
        "bullets": ["specific actionable point 1", "measurable result 2", "strategic insight 3"] (if applicable),
        "charts": {
          "type": "bar|pie|line|area|scatter",
          "title": "Professional Chart Title",
          "data": [
            {"name": "Category", "value": number, "category": "optional"},
            {"name": "Category 2", "value": number, "category": "optional"}
          ],
          "xAxis": "Professional X-Axis Label",
          "yAxis": "Professional Y-Axis Label", 
          "colors": ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
          "showLegend": true,
          "showGrid": true
        } (if chart layout),
        "image": "https://images.pexels.com/photos/[ID]/pexels-photo-[ID].jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
        "imageAlt": "Professional descriptive alt text",
        "imagePosition": "center|top|left|right",
        "backgroundColor": "#ffffff",
        "textColor": "#1a1a1a",
        "accentColor": "#3B82F6",
        "template": "${template}",
        "slideNumber": number,
        "animations": {
          "entrance": "fadeIn|slideIn|zoomIn",
          "emphasis": "pulse|bounce|highlight",
          "exit": "fadeOut|slideOut|zoomOut"
        }
      }
    ]

    PROFESSIONAL DESIGN REQUIREMENTS:
    1. Use REAL, high-quality Pexels images for every slide
    2. Generate MEANINGFUL chart data that supports the narrative
    3. Ensure professional color schemes and typography
    4. Create compelling titles that grab attention
    5. Write content that flows logically and tells a story
    6. Use bullet points that are specific and actionable

    TEMPLATE-SPECIFIC STYLING:
    - modern-business: Clean corporate design, blue gradients, professional imagery
    - creative-gradient: Vibrant gradients, modern layouts, creative visuals
    - minimalist-pro: Ultra-clean design, subtle shadows, perfect spacing
    - tech-modern: Futuristic design, neon accents, tech-inspired layouts
    - elegant-dark: Sophisticated dark theme, gold accents, luxury feel
    - startup-pitch: Dynamic design, growth-focused, investor-ready

    CONTENT GUIDELINES:
    - Make titles compelling and action-oriented
    - Write content that tells a cohesive story
    - Use bullet points that are specific and measurable
    - Ensure chart data supports key messages
    - Choose images that enhance understanding and engagement

    VISUAL HIERARCHY:
    - Use consistent spacing and alignment
    - Apply proper contrast ratios for readability
    - Include subtle animations for engagement
    - Maintain brand consistency throughout
    - Optimize for both desktop and mobile viewing`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const jsonText = extractJsonFromMarkdown(response.text());
    const slides = JSON.parse(jsonText);

    // Enhance slides with professional template styling
    const enhancedSlides = slides.map((slide: any, index: number) => {
      const templateStyles = getProfessionalTemplateStyles(template);
      
      // Ensure every slide has a professional image
      if (!slide.image || !slide.image.includes('pexels.com')) {
        const professionalImageIds = [
          3184291, 3184292, 3184293, 3184294, 3184295, 3184296, 3184297, 3184298, 3184299, 3184300,
          3184311, 3184312, 3184313, 3184314, 3184315, 3184316, 3184317, 3184318, 3184319, 3184320,
          3184321, 3184322, 3184323, 3184324, 3184325, 3184326, 3184327, 3184328, 3184329, 3184330,
          3184331, 3184332, 3184333, 3184334, 3184335, 3184336, 3184337, 3184338, 3184339, 3184340
        ];
        const randomId = professionalImageIds[index % professionalImageIds.length];
        slide.image = `https://images.pexels.com/photos/${randomId}/pexels-photo-${randomId}.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800`;
      }

      // Enhance chart data with professional styling
      if (slide.charts && slide.layout === 'chart') {
        slide.charts.colors = slide.charts.colors || templateStyles.chartColors;
        slide.charts.showLegend = true;
        slide.charts.showGrid = true;
        
        // Ensure meaningful chart data
        if (!slide.charts.data || slide.charts.data.length === 0) {
          slide.charts.data = generateProfessionalChartData(slide.charts.type, prompt);
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

// Professional template styles like Canva
function getProfessionalTemplateStyles(template: string) {
  const styles = {
    'modern-business': {
      backgroundColor: '#ffffff',
      textColor: '#1e3a8a',
      accentColor: '#3b82f6',
      borderColor: '#dbeafe',
      chartColors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
    },
    'creative-gradient': {
      backgroundColor: '#ffffff',
      textColor: '#7c2d92',
      accentColor: '#a855f7',
      borderColor: '#e9d5ff',
      chartColors: ['#a855f7', '#ec4899', '#f97316', '#10b981', '#3b82f6']
    },
    'minimalist-pro': {
      backgroundColor: '#ffffff',
      textColor: '#374151',
      accentColor: '#6b7280',
      borderColor: '#e5e7eb',
      chartColors: ['#6b7280', '#9ca3af', '#d1d5db', '#374151', '#111827']
    },
    'tech-modern': {
      backgroundColor: '#0f172a',
      textColor: '#ffffff',
      accentColor: '#06b6d4',
      borderColor: '#164e63',
      chartColors: ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444']
    },
    'elegant-dark': {
      backgroundColor: '#111827',
      textColor: '#ffffff',
      accentColor: '#fbbf24',
      borderColor: '#374151',
      chartColors: ['#fbbf24', '#f59e0b', '#d97706', '#92400e', '#451a03']
    },
    'startup-pitch': {
      backgroundColor: '#ffffff',
      textColor: '#065f46',
      accentColor: '#10b981',
      borderColor: '#d1fae5',
      chartColors: ['#10b981', '#059669', '#047857', '#065f46', '#064e3b']
    }
  };
  
  return styles[template as keyof typeof styles] || styles['modern-business'];
}

// Generate professional chart data based on topic
function generateProfessionalChartData(chartType: string, topic: string) {
  const isBusinessTopic = topic.toLowerCase().includes('business') || topic.toLowerCase().includes('startup') || topic.toLowerCase().includes('revenue') || topic.toLowerCase().includes('growth');
  const isTechTopic = topic.toLowerCase().includes('tech') || topic.toLowerCase().includes('software') || topic.toLowerCase().includes('ai') || topic.toLowerCase().includes('digital');
  const isMarketingTopic = topic.toLowerCase().includes('marketing') || topic.toLowerCase().includes('brand') || topic.toLowerCase().includes('customer');
  
  if (chartType === 'bar') {
    if (isBusinessTopic) {
      return [
        { name: "Q1 2024", value: 125, category: "Revenue ($M)" },
        { name: "Q2 2024", value: 158, category: "Revenue ($M)" },
        { name: "Q3 2024", value: 192, category: "Revenue ($M)" },
        { name: "Q4 2024", value: 234, category: "Revenue ($M)" },
        { name: "Q1 2025", value: 278, category: "Revenue ($M)" }
      ];
    } else if (isTechTopic) {
      return [
        { name: "Frontend", value: 45, category: "Development Hours" },
        { name: "Backend", value: 38, category: "Development Hours" },
        { name: "Database", value: 28, category: "Development Hours" },
        { name: "DevOps", value: 22, category: "Development Hours" },
        { name: "Testing", value: 18, category: "Development Hours" }
      ];
    } else if (isMarketingTopic) {
      return [
        { name: "Social Media", value: 35, category: "Engagement %" },
        { name: "Email", value: 28, category: "Engagement %" },
        { name: "Content", value: 42, category: "Engagement %" },
        { name: "Paid Ads", value: 31, category: "Engagement %" },
        { name: "SEO", value: 38, category: "Engagement %" }
      ];
    }
  } else if (chartType === 'pie') {
    if (isBusinessTopic) {
      return [
        { name: "Product Sales", value: 45 },
        { name: "Services", value: 30 },
        { name: "Licensing", value: 15 },
        { name: "Partnerships", value: 10 }
      ];
    } else if (isTechTopic) {
      return [
        { name: "Web Development", value: 40 },
        { name: "Mobile Apps", value: 35 },
        { name: "APIs", value: 15 },
        { name: "Infrastructure", value: 10 }
      ];
    } else if (isMarketingTopic) {
      return [
        { name: "Digital Marketing", value: 50 },
        { name: "Traditional Media", value: 25 },
        { name: "Events", value: 15 },
        { name: "PR", value: 10 }
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
        { name: "Jun", value: 125 },
        { name: "Jul", value: 142 }
      ];
    } else if (isTechTopic) {
      return [
        { name: "Week 1", value: 85 },
        { name: "Week 2", value: 92 },
        { name: "Week 3", value: 88 },
        { name: "Week 4", value: 96 },
        { name: "Week 5", value: 103 },
        { name: "Week 6", value: 110 }
      ];
    }
  }

  // Default professional data
  return [
    { name: "Category A", value: 65 },
    { name: "Category B", value: 78 },
    { name: "Category C", value: 92 },
    { name: "Category D", value: 45 },
    { name: "Category E", value: 58 }
  ];
}

// Generate professional image queries
function generateProfessionalImageQuery(slideType: string, title: string, topic: string) {
  const isBusinessTopic = topic.toLowerCase().includes('business') || topic.toLowerCase().includes('startup');
  const isTechTopic = topic.toLowerCase().includes('tech') || topic.toLowerCase().includes('software');
  
  if (slideType === 'cover') {
    if (isBusinessTopic) return "professional business team meeting modern office";
    if (isTechTopic) return "modern technology workspace coding development";
    return "professional presentation business meeting";
  } else if (slideType === 'chart') {
    return "business analytics data visualization charts";
  } else if (slideType === 'split') {
    if (isBusinessTopic) return "professional business handshake partnership";
    if (isTechTopic) return "modern technology innovation digital transformation";
    return "professional business collaboration";
  }
  
  return "professional business presentation modern office";
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