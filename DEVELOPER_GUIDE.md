# Developer Guide

## Setting Up Development Environment

### Prerequisites
- Node.js 18+
- npm
- Docker (optional for local database)

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
   Create `.env.local` with:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GEMINI_API_KEY=your_gemini_api_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   STRIPE_PRICE_ID=your_stripe_price_id
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

## Code Organization

### Directory Structure
```
docmagic/
├── app/            # Next.js app directory
├── components/     # React components
├── hooks/          # Custom React hooks
├── lib/            # Utility libraries
├── public/         # Static assets
├── supabase/       # Supabase configuration
├── types/          # TypeScript type definitions
```

### Key Files
- `app/layout.tsx`: Root layout component
- `app/page.tsx`: Home page
- `lib/gemini.ts`: AI integration
- `lib/stripe.ts`: Payment configuration

## Testing

### Running Tests
```bash
npm test
```

### Test Coverage
```bash
npm run test:coverage
```

## Debugging

### Debugging in VSCode
1. Set breakpoints in your code
2. Run debug configuration
3. Use debug console and variables panel

### Common Issues
- API key not set: Check `.env.local`
- Database connection issues: Verify Supabase credentials
- Payment processing: Check Stripe dashboard

## Deployment

### Local Deployment
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Deployment to Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Configure build settings
4. Add environment variables