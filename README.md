# 🪄 DocMagic

**DocMagic** is an AI-powered document generation platform built with **Next.js**, **Supabase**, and **Google’s Gemini 2.0 Flash** model. It enables users to generate professional documents—resumes, CVs, cover letters, statements, and more—from a simple prompt.

👉 **Live demo**: [https://doc-magic-heob.vercel.app/](https://doc-magic-heob.vercel.app/)

---

## ✨ Features

- **AI document generation** powered by Gemini 2.0 Flash
- Multiple document types: resumes, cover letters, statements, etc.
- Real-time preview and editing
- Export to PDF, LaTeX, and PowerPoint
- Auth and data persistence via **Supabase**
- Modern UI built with React and Tailwind CSS

---

## 🧠 Tech Stack

| Technology       | Purpose                                  |
|------------------|------------------------------------------|
| **Next.js**      | Server-side rendering & frontend         |
| **Supabase**     | Authentication and Postgres database     |
| **Gemini 2.0 Flash** | LLM backend for intelligent generation |
| **Tailwind CSS** | Styling UI elements                     |
| **pptxgenjs**    | Generate PowerPoint exports              |
| **LaTeX.js**     | Render LaTeX previews in-browser         |

---

## 🚀 Quick Start

1. Clone the repo

```bash
git clone https://github.com/Muneerali199/DocMagic.git
cd DocMagic
2. Install Dependencies
npm install
3. Set Up Environment Variables
Create a .env.local file in the root directory and add:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
4. Run the App
npm run dev
Visit http://localhost:3000 in your browser to use DocMagic locally.

📁 Project Structure

DocMagic/
├── components/      # Reusable React UI components
├── lib/             # Supabase & Gemini API clients
├── pages/           # Next.js routes and API endpoints
├── public/          # Static assets (icons, images)
├── styles/          # Global and Tailwind styles
├── utils/           # Helper functions
└── .env.local       # Environment variables (not committed)


🔮 Roadmap

 Add template themes (modern, minimalist, creative)

 Drag-and-drop editor with formatting toolbar

 Collaborative document editing

 Add downloadable .docx support

 Versioning & history timeline

🧪 Testing
Basic testing can be done using:
npm run lint
npm run build

📄 License
MIT License
Copyright © 2025
Created by Muneer Ali Subzwari

🙏 Acknowledgements
Next.js

Supabase

Google Gemini

Tailwind CSS

pptxgenjs

Built with 💙 to simplify and supercharge document creation for everyone.
