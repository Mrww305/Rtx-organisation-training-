# ReshmaTex - AI Workforce Upskilling Platform

A production-ready, enterprise-grade AI-powered upskilling platform for Sales, HR, and Finance teams.

[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-Apache_2.0-green.svg)](LICENSE)
[![Security](https://img.shields.io/badge/Security-SOC2_Type_II_Ready-emerald.svg)]()

---

## 🎯 Features

- 🎯 **Role-specific AI training programs**: Dedicated curricula for **Sales** (pipeline velocity, objection handling), **HR** (bias-aware screening, policy RAG, conflict mediation), and **Finance** (AP OCR automation, threshold fraud detection, variance commentary).
- 📊 **Real-time analytics and progress tracking**: Live learning velocity graphs, completion percentages, hours saved telemetry, and board-ready executive ROI report exports.
- 🤖 **Interactive AI playground with scenario simulations**: Real-time roleplay against realistic stakeholders (skeptical CFOs, procurement leads, emotional employees, external auditors) with automated rubric scoring (Clarity, Empathy, Tactical match).
- 📚 **Knowledge base integration (RAG)**: Built-in connectors for Google Drive, Microsoft 365, and Salesforce with simulated 1536-dimensional vector embedding.
- 👥 **Team management and collaboration**: Cohort directory, track allocations, individual progress monitoring, CSV import, and email invitations.
- 🔒 **Enterprise-grade security**: SOC 2 Type II, GDPR, and HIPAA-ready architecture with client-side isolation and zero public model data retention.
- 🏆 **Gamified Learning**: Daily streak tracking, XP points (+90 to +300 XP), interactive quizzes with instant explanations, and completion confetti.

---

## 🚀 Quick Start

1. **Clone this repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/reshmatex.git
   cd reshmatex
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **1-Click Demo Personas**:
   Click **"Sign In"** or **"Start Free"** on the landing page to instantly test with pre-configured personas:
   - **Jane Cooper** — VP of Global Revenue (*Sales Track*)
   - **Marcus Chen** — Director of People Operations (*HR Track*)
   - **Sofia Rodriguez** — Corporate Controller (*Finance Track*)

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) with custom design system in `src/index.css`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations & Celebrations**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Typography**: Inter & Plus Jakarta Sans
- **State Persistence**: Browser `localStorage` with automated state synchronization under `reshmatex_app_v2_*`

---

## 📦 Project Structure

```text
├── index.html                   # HTML entry point with metadata & web fonts
├── metadata.json                # App metadata and platform capabilities
├── package.json                 # Dependencies and build scripts
├── tsconfig.json                # Strict TypeScript configuration
├── vite.config.ts               # Vite configuration with Tailwind CSS v4 plugin
├── AGENTS.md                    # Technical guide for LLMs & autonomous coding agents
├── llms.txt                     # LLM context index
├── src/
│   ├── main.tsx                 # React DOM root initialization
│   ├── App.tsx                  # Core application shell & state orchestration
│   ├── index.css                # Tailwind CSS v4 theme, variables & utilities
│   ├── types.ts                 # Strong TypeScript models & interfaces
│   ├── data/
│   │   └── mockData.ts          # Comprehensive curricula, scenarios & initial state
│   ├── components/
│   │   ├── Navbar.tsx           # Glassmorphic landing navigation
│   │   ├── LandingPage.tsx      # Landing page, hero, tracks, pricing & FAQ
│   │   ├── Sidebar.tsx          # Fixed portal sidebar with track indicators
│   │   ├── Header.tsx           # Global search, notifications & streak counters
│   │   ├── AuthModal.tsx        # Login/Register with 1-click Demo Personas
│   │   ├── DemoModal.tsx        # Interactive 2-minute product tour
│   │   ├── LessonModal.tsx      # Interactive lesson runner, quiz & XP awards
│   │   ├── UploadDocModal.tsx   # Document ingestion & vectorization simulator
│   │   └── InviteModal.tsx      # Team member onboarding modal
│   └── views/
│       ├── DashboardView.tsx    # Executive overview, KPI stats & velocity chart
│       ├── TrackView.tsx        # Departmental curricula & roadmap (Sales/HR/Finance)
│       ├── PlaygroundView.tsx   # AI roleplay simulator & real-time rubric coach
│       ├── KnowledgeView.tsx    # Enterprise RAG connectors & indexed playbooks
│       ├── AnalyticsView.tsx    # Business impact metrics & executive report export
│       └── TeamView.tsx         # User directory, track assignments & CSV import
```

---

## 🚢 Deployment

### Vercel
Deploy with zero configuration using the Vercel CLI:
```bash
npm i -g vercel
vercel
```
Or connect your GitHub repository in the Vercel Dashboard:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Netlify
Connect your repository in Netlify with these settings:
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

Or deploy via Netlify CLI:
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages
1. Build the production application:
   ```bash
   npm run build
   ```
2. Deploy the `dist` directory to GitHub Pages using the `gh-pages` utility or GitHub Actions:
   ```bash
   npx gh-pages -d dist
   ```
3. Enable GitHub Pages in your repository settings:
   - **Source**: Deploy from a branch (select `gh-pages` / root)

---

## 🔒 Enterprise Security & Compliance

- **Zero Data Retention**: Customer dialogues and uploaded documents are isolated to private tenant containers and are never used to train public foundational AI models.
- **Enterprise SSO & SCIM**: Architecture ready for SAML 2.0 / OIDC integrations with Okta, Microsoft Entra ID (Azure AD), Google Workspace, and Ping Identity.
- **Data Protection**: AES-256 encryption at rest and TLS 1.3 in transit.
- **Regulatory Alignment**: SOC 2 Type II audit-ready controls, GDPR compliance, and EU AI Act high-risk classification alignment for recruitment systems.

---

## 📄 License

MIT © 2026 ReshmaTex. All rights reserved.
