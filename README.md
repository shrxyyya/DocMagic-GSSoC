# DocMagic ✨📄

[![License](https://img.shields.io/github/license/Muneerali199/DocMagic?color=blue)](LICENSE)
[![Issues](https://img.shields.io/github/issues/Muneerali199/DocMagic)](https://github.com/Muneerali199/DocMagic/issues)
[![Last Commit](https://img.shields.io/github/last-commit/Muneerali199/DocMagic)](https://github.com/Muneerali199/DocMagic/commits/main)
[![Deploy Status](https://img.shields.io/badge/deploy-passing-brightgreen)](#)

---

## 🚀 Project Overview

**DocMagic** is an AI-powered document generation platform that empowers users to create stunning, professional documents—such as resumes, CVs, cover letters, statements, and more—from a simple prompt. Built on the latest technologies including **Next.js**, **Supabase**, and Google’s **Gemini 2.0 Flash** model, DocMagic streamlines content creation for professionals, students, and businesses.

> **Why DocMagic?**  
> Save hours on formatting and writing. Just describe what you need, and let the AI handle the rest—beautifully and intelligently.

---

## 🛠️ Tech Stack

- **Next.js** – Server-side rendering & frontend
- **Supabase** – Authentication and Postgres database
- **Gemini 2.0 Flash** – LLM backend for intelligent document generation
- **Tailwind CSS** – Sleek and customizable UI styling
- **pptxgenjs** – Export presentations in PowerPoint format
- **LaTeX.js** – In-browser LaTeX rendering for scientific and mathematical documents

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Muneerali199/DocMagic.git
cd DocMagic
npm install
```

Create a `.env.local` file in the root directory and configure your environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
# Add other required keys as needed
```

Run the development server:

```bash
npm run dev
```

The app will be running at [http://localhost:3000](http://localhost:3000).

---

## 💡 Usage

1. **Sign up** or **login** with your account.
2. Enter a prompt describing the document you want (e.g., "A modern CV for a software engineer with 5 years of experience.").
3. Let the AI generate your document draft.
4. **Preview**, **edit**, and **export** to formats like PDF, DOCX, or PowerPoint.
5. Use LaTeX rendering for scientific documents and equations.

---

## ✨ Features

- **AI Document Generation**: Create CVs, cover letters, statements, and more from natural language prompts.
- **Export Options**: Download as PDF, DOCX, or PowerPoint (PPTX) with one click.
- **Live LaTeX Preview**: Render and preview LaTeX equations and documents in-browser.
- **User Authentication**: Secure sign-in and document management via Supabase.
- **Modern UI**: Responsive, accessible, and customizable interface powered by Tailwind CSS.
- **History Tracking**: View and manage your previously generated documents.

---

## 🖼️ Screenshots

<!-- Replace the example image links below with actual screenshots from your project -->
<p align="center">
  <img src="screenshots/homepage.png" alt="DocMagic Homepage" width="700"/>
</p>
<p align="center">
  <img src="screenshots/editor.png" alt="AI Document Editor" width="700"/>
</p>
<p align="center">
  <img src="screenshots/latex-preview.png" alt="LaTeX Preview" width="700"/>
</p>

---

## 🤝 Contributing

We welcome contributions! To get started:

1. **Fork** the repository.
2. **Create** your feature branch: `git checkout -b feature/YourFeature`
3. **Commit** your changes: `git commit -am 'Add cool feature'`
4. **Push** to the branch: `git push origin feature/YourFeature`
5. **Open a pull request**.

**Reporting Issues:**  
If you find a bug or have a feature request, [open an issue](https://github.com/Muneerali199/DocMagic/issues) and describe it clearly. Please include steps to reproduce if applicable.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Gemini 2.0 Flash](https://ai.google.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [pptxgenjs](https://gitbrent.github.io/PptxGenJS/)
- [LaTeX.js](https://github.com/michael-brade/LaTeX.js)

---

> _Empower your productivity and creativity with DocMagic. Let AI handle your documents, so you can focus on what matters most!_
