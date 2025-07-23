# DocMagic

🪄 **DocMagic** is an open source AI-powered document creation platform. Create professional resumes, presentations, CVs, and letters in seconds.

[![Version](https://img.shields.io/badge/version-1.7-blue.svg)](https://github.com/Xenonesis/DocMagic)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.4.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue)](https://www.typescriptlang.org/)

## Features

- **AI-Powered Document Generation**
  - ATS-optimized resumes with keyword analysis
  - Professional presentations with Canva-style design
  - Formal letters and CVs with perfect formatting
  
- **Advanced Export Options**
  - PDF, DOCX, Markdown, LaTeX export
  - Google Drive and Dropbox integration
  - PowerPoint (PPTX) export for presentations
  
- **User Experience**
  - Multi-language support for global users
  - Intuitive dashboard with document management
  - Collaboration tools for team projects
  - Accessibility-focused design
  
- **Technical Excellence**
  - Modern React with Next.js 15
  - TypeScript for type safety
  - Responsive design with Tailwind CSS
  - Supabase authentication and storage

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn package manager
- Supabase account for authentication and storage
- Google Gemini API key for AI features

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Xenonesis/DocMagic.git
   cd DocMagic
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys and configuration
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Latest Updates (v1.7)

- **Enhanced TypeScript Support**: Improved type definitions across the codebase
- **Next.js Image Optimization**: Replaced standard img tags with Next.js Image components
- **Accessibility Improvements**: Fixed alt attributes and improved screen reader support
- **API Route Enhancements**: Fixed TypeScript errors in API routes for better reliability
- **Supabase Integration**: Updated client and server implementations for latest Supabase SDK

See the [Changelog](CHANGELOG.md) for complete details.

## Documentation

- [Changelog](CHANGELOG.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Roadmap](ROADMAP.md)
- [Contributors](CONTRIBUTORS.md)

## License

MIT License

## Credits

Developed by [Xenonesis](https://github.com/Xenonesis) and the DocMagic community.
