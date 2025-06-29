# DocMagic ✨📄 - AI-Powered Document Creation

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat&logo=supabase)](https://supabase.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?style=flat&logo=google)](https://ai.google.dev)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=flat&logo=netlify)](https://www.netlify.com)

## Table of Contents
1. [Features](#-features)
2. [Tech Stack](#-tech-stack)
3. [Quick Start](#-quick-start)
4. [API Documentation](#-api-documentation)
5. [Architecture](#-architecture)
6. [Contributing](#-contributing)
7. [License](#-license)

## ✨ Features [▶](#table-of-contents)

- **AI-Powered Document Generation**
  - Resumes, CVs, Presentations, Letters
  - ATS Optimization
  - Guided Creation Workflows

- **Professional Output**
  - Multiple Templates
  - Data Visualizations
  - High-Quality Images
  - Multiple Export Formats (PDF, DOCX, PPTX)

- **User Management**
  - Secure Authentication
  - Subscription System
  - Document History

## 🛠️ Tech Stack [▶](#table-of-contents)

| Category       | Technologies                          |
|----------------|---------------------------------------|
| Frontend       | Next.js 14, React, Tailwind CSS, shadcn/ui |
| Backend        | Next.js API Routes, Node.js          |
| Database       | Supabase (PostgreSQL)                |
| Authentication | Supabase Auth                        |
| AI             | Google Gemini 2.0 Flash              |
| Payments       | Stripe                               |
| Deployment     | Netlify                              |

## 🚀 Quick Start [▶](#table-of-contents)

### Prerequisites
- Node.js 18+
- Supabase account
- Google Gemini API key
- Stripe account

### Installation
```bash
git clone https://github.com/yourusername/docmagic.git
cd docmagic
npm install
```

### Configuration
Create `.env.local` with required environment variables.

### Running the App
```bash
npm run dev
```

## 📚 API Documentation [▶](#table-of-contents)

For complete API documentation, see [API_REFERENCE.md](API_REFERENCE.md).

Key Endpoints:
- `/api/generate/*` - Document generation
- `/api/analyze/*` - Document analysis
- `/api/auth/*` - Authentication
- `/api/stripe/*` - Payments

## 🏗️ Architecture [▶](#table-of-contents)

![Architecture Diagram](docs/architecture.png)

Key Components:
1. **Frontend**: Next.js app with Tailwind CSS
2. **Backend**: API routes for document processing
3. **Database**: Supabase for data storage
4. **AI Integration**: Gemini for document generation
5. **Payment System**: Stripe for subscriptions

## 🤝 Contributing [▶](#table-of-contents)

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License [▶](#table-of-contents)

MIT License - See [LICENSE](LICENSE) for details.

---

<div align="center">
  <p>Built with ❤️ by the DocMagic Team</p>
  <p>© 2025 DocMagic. All rights reserved.</p>
</div>
