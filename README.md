# 🚀 AI Competitor Intelligence Tracker

An end-to-end AI-powered platform that monitors competitor websites, classifies updates using artificial intelligence, and delivers strategic insights via automated weekly digests and real-time Slack notifications.

## ✨ Features

- **🕷️ Automated Monitoring**: Track competitors across websites, changelogs, and social media
- **🤖 AI-Powered Analysis**: GPT-4o classifies updates by category and strategic impact
- **📊 Analytics Dashboard**: Visual insights with trends and competitive intelligence
- **📢 Slack Integration**: Real-time notifications and weekly digest delivery
- **⏰ Scheduled Reporting**: Automated weekly summaries with strategic recommendations

## 🏗️ Architecture

- **Backend**: Express.js + TypeScript + PostgreSQL (Neon)
- **Frontend**: React + TanStack Query + Radix UI + Tailwind CSS
- **AI**: OpenAI GPT-4o for content analysis and digest generation
- **Database**: Drizzle ORM with PostgreSQL
- **Scheduling**: Node-cron for automated tasks
- **Notifications**: Slack Web API

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   DATABASE_URL=your_postgresql_connection_string
   OPENAI_API_KEY=your_openai_api_key
   SLACK_BOT_TOKEN=your_slack_bot_token
   SLACK_CHANNEL_ID=your_slack_channel_id
   ```

3. **Initialize database**:
   ```bash
   npm run db:push
   ```

4. **Start development server**:
   ```bash
   npm run dev
   # or
   node index.js
   ```

5. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## 📱 Usage

### Dashboard
Visit `http://localhost:5000` to access the web dashboard with:
- Competitor overview and analytics
- Recent updates with AI classifications
- Source management interface
- System status and health monitoring

### API Endpoints
- `GET /api/competitors` - List all competitors
- `GET /api/updates/recent` - Recent competitor updates
- `GET /api/dashboard/stats` - Dashboard statistics
- `POST /api/scraping/run` - Trigger manual scraping
- `POST /api/digests/generate` - Generate weekly digest

### Slack Integration
- Real-time notifications for high-impact updates
- Weekly digest delivery with strategic insights
- System status and health monitoring alerts

## 🎯 Monitored Competitors

The system currently tracks major tech companies including:
- Notion (Productivity)
- Linear (Project Management)
- GitHub (Developer Platform)
- Vercel (Frontend Cloud)
- Supabase (Backend Platform)
- Figma (Design Tools)
- And more...

## 🤖 AI Classifications

Updates are automatically categorized by:
- **Category**: Feature, Bug Fix, UI Update, Performance, Integration, Pricing
- **Impact Level**: High, Medium, Low
- **Confidence Score**: AI certainty rating (0-1)
- **Summary**: Strategic insights and implications

## 📊 Weekly Digest Example

```markdown
# 🚀 Weekly Competitor Intelligence Digest
### July 14-20, 2025 | AI-Generated Summary

## 📈 Executive Summary
6 major updates detected with focus on AI integrations and performance improvements.

## 🔥 High Impact Updates
• GitHub - Copilot PR Integration (High Impact)
• Vercel - 60% faster Edge Runtime (High Impact)
• Supabase - Visual Database Migrations (High Impact)

## 🎯 Strategic Recommendations
1. Benchmark AI features vs GitHub Copilot
2. Performance audit against Vercel improvements
3. UI/UX review of customization options
```

## 🛠️ Development

```bash
# Type checking
npm run check

# Database operations  
npm run db:push

# Environment setup
NODE_ENV=development npm run dev
```

## 📁 Project Structure

```
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared types and schemas
├── index.js         # Main entry point
└── replit.md        # Project documentation
```

## 🔧 Configuration

The system supports configurable:
- Scraping frequencies (6 hours, daily, weekly)
- AI classification categories
- Notification thresholds
- Slack channel routing

## 📈 Monitoring

Built-in monitoring includes:
- Source health and status tracking
- API rate limiting and error handling
- Slack connectivity verification
- Database performance metrics

---

Built with ❤️ for product managers and competitive intelligence teams.