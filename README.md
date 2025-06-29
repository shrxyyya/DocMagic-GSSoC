# DocMagic ✨📄

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?style=flat&logo=google)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=flat&logo=netlify)

## 🚀 Overview

**DocMagic** is an AI-powered document creation platform that transforms simple text prompts into professional documents. Create stunning resumes, presentations, CVs, and letters with the power of AI.

> **Create professional documents in seconds with AI magic ✨**

## ✨ Features

- **🧠 AI-Powered Generation**: Create professional documents from simple text prompts
- **📄 Multiple Document Types**: Resumes, presentations, CVs, and letters
- **🎯 ATS Optimization**: Ensure your resume passes Applicant Tracking Systems
- **📊 Professional Charts**: Data visualizations for presentations
- **🖼️ High-Quality Images**: Automatic integration of professional Pexels images
- **💼 Professional Templates**: Multiple design options for each document type
- **📱 Responsive Design**: Works on all devices
- **🔒 User Authentication**: Secure login with Supabase
- **💳 Subscription System**: Free and premium tiers with Stripe integration
- **⬇️ Multiple Export Formats**: PDF, DOCX, PPTX

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Node.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: Google Gemini 2.0 Flash
- **Payments**: Stripe
- **Deployment**: Netlify

## 📸 Screenshots

<div align="center">
  <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" alt="DocMagic Dashboard" width="80%"/>
  <p><em>AI-powered document creation dashboard</em></p>
  
  <img src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" alt="Resume Generator" width="80%"/>
  <p><em>ATS-optimized resume generator</em></p>
  
  <img src="https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" alt="Presentation Creator" width="80%"/>
  <p><em>Professional presentation creator with charts and images</em></p>
</div>

## 📁 Project Structure

```
docmagic/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   ├── analyze/          # Resume analysis endpoints
│   │   ├── auth/             # Authentication endpoints
│   │   ├── generate/         # Document generation endpoints
│   │   ├── send-email/       # Email sending functionality
│   │   ├── stripe/           # Stripe payment integration
│   │   └── user/             # User data endpoints
│   ├── auth/                 # Authentication pages
│   ├── cv/                   # CV generator page
│   ├── letter/               # Letter generator page
│   ├── presentation/         # Presentation generator page
│   ├── resume/               # Resume generator pages
│   ├── settings/             # User settings page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout component
│   └── page.tsx              # Home page
├── components/               # React components
│   ├── auth-provider.tsx     # Authentication context provider
│   ├── document-card.tsx     # Document type card component
│   ├── features-section.tsx  # Features showcase section
│   ├── hero-section.tsx      # Landing page hero section
│   ├── letter/               # Letter-specific components
│   ├── presentation/         # Presentation-specific components
│   ├── resume/               # Resume-specific components
│   ├── site-header.tsx       # Navigation header
│   ├── sponsor-banner.tsx    # Sponsor information banner
│   ├── subscription-button.tsx # Subscription management
│   ├── testimonials-section.tsx # User testimonials
│   ├── theme-provider.tsx    # Dark/light theme provider
│   ├── theme-toggle.tsx      # Theme toggle button
│   └── ui/                   # UI components (shadcn/ui)
├── hooks/                    # Custom React hooks
│   ├── use-subscription.ts   # Subscription state management
│   └── use-toast.ts          # Toast notifications
├── lib/                      # Utility libraries
│   ├── gemini.ts             # Google Gemini AI integration
│   ├── parsers/              # Document parsing utilities
│   ├── stripe.ts             # Stripe payment configuration
│   ├── supabase/             # Supabase client configuration
│   └── utils.ts              # General utility functions
├── public/                   # Static assets
├── supabase/                 # Supabase configuration
│   └── migrations/           # Database migration files
├── types/                    # TypeScript type definitions
│   └── supabase.ts           # Supabase database types
├── .env.local                # Environment variables (not in repo)
├── .eslintrc.json            # ESLint configuration
├── .gitignore                # Git ignore file
├── CONTRIBUTING.md           # Contribution guidelines
├── LICENSE                   # MIT license
├── README.md                 # Project documentation
├── middleware.ts             # Next.js middleware
├── netlify.toml              # Netlify deployment configuration
├── next.config.js            # Next.js configuration
├── package.json              # Project dependencies
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Google Gemini API key
- Stripe account (for payment processing)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/docmagic.git
   cd docmagic
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GEMINI_API_KEY=your_gemini_api_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   STRIPE_PRICE_ID=your_stripe_price_id
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deployment

The application is deployed on Netlify. To deploy your own instance:

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add your environment variables in the Netlify dashboard

## 📝 API Routes Documentation

### Document Generation

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/generate/resume` | POST | Generate a resume | `{ prompt, name, email }` | Resume JSON |
| `/api/generate/guided-resume` | POST | Generate guided resume | `{ personalInfo, workExperience, ... }` | Resume JSON |
| `/api/generate/presentation` | POST | Generate presentation | `{ prompt, pageCount }` | Slides array |
| `/api/generate/presentation-outline` | POST | Generate outline | `{ prompt, pageCount }` | Outline array |
| `/api/generate/presentation-full` | POST | Generate full presentation | `{ outlines, template, prompt }` | Slides array |
| `/api/generate/letter` | POST | Generate letter | `{ prompt, fromName, toName, letterType, ... }` | Letter JSON |
| `/api/generate/resume-guidance` | POST | Get resume guidance | `{ step, targetRole, existingData }` | Guidance JSON |

### Analysis

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/analyze/resume` | POST | Analyze resume for ATS | FormData with `file` and `jobDescription` | Analysis JSON |

### Email

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/send-email` | POST | Send email | `{ to, subject, content, letterContent, ... }` | Success status |

### Authentication

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/auth/register` | POST | Register user | `{ name, email, password }` | User data |

### Payments

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/stripe/check-subscription` | GET | Check subscription status | - | Subscription status |
| `/api/stripe/create-checkout` | POST | Create checkout session | - | Checkout URL |
| `/api/stripe/create-portal` | POST | Create customer portal | - | Portal URL |
| `/api/stripe/webhook` | POST | Handle Stripe webhooks | Stripe event | Success status |

### User

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/user` | GET | Get user data | - | User data with subscription |

## 🔒 Authentication

Authentication is handled by Supabase Auth. The system includes:

- User registration with email/password
- Secure login
- Protected routes with middleware
- User profile management
- Session persistence

## 💾 Database Schema

The Supabase database includes the following tables:

### Users Table
- `id` (UUID, primary key)
- `email` (text, unique)
- `name` (text)
- `password` (text, hashed)
- `stripe_customer_id` (text, optional)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Subscriptions Table
- `id` (UUID, primary key)
- `user_id` (UUID, foreign key to users)
- `stripe_subscription_id` (text, unique)
- `stripe_price_id` (text)
- `stripe_current_period_end` (timestamp)
- `status` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Documents Table
- `id` (UUID, primary key)
- `user_id` (UUID, foreign key to users)
- `title` (text)
- `type` (text) - resume, presentation, letter, cv
- `content` (jsonb) - document data
- `prompt` (text) - original user prompt
- `created_at` (timestamp)
- `updated_at` (timestamp)

## 💰 Subscription Model

DocMagic offers a freemium model:
- **Free tier**: Basic document generation with limited features
- **Pro tier**: Unlimited documents, premium templates, and advanced features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See the [CONTRIBUTING.md](CONTRIBUTING.md) file for detailed guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Google Gemini AI](https://ai.google.dev/)
- [Stripe](https://stripe.com/)
- [Pexels](https://www.pexels.com/) for professional images
- [Recharts](https://recharts.org/) for data visualization
- [Netlify](https://www.netlify.com/) for hosting

---

<div align="center">
  <p>Built with ❤️ by the DocMagic Team</p>
  <p>© 2025 DocMagic. All rights reserved.</p>
</div>
