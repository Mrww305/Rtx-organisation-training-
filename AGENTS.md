# AGENTS.md — LLM & AI Agent Architecture Guide

> **Target Audience**: Autonomous coding agents, LLM tool-calling bots, prompt-driven engineers, and automated refactoring pipelines operating on the **ReshmaTex** codebase.

---

## 1. System Overview & Core Mission

**ReshmaTex** is an enterprise-grade AI workforce upskilling web application built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Vite 8**.

The platform provides:
1. **Interactive Role-Specific Curricula**: Sequential learning modules for Sales, HR, and Finance teams.
2. **AI Roleplay Sandbox**: Dynamic stakeholder simulation with real-time rubric scoring (Clarity, Empathy, Tactical Framework).
3. **Enterprise RAG Knowledge Base**: Document vectorization simulator and data connectors (Google Drive, M365, Salesforce).
4. **Executive ROI Telemetry**: Business impact metrics and learning velocity analytics.
5. **Team Administration**: Cohort management and CSV directory onboarding.

---

## 2. Technical Stack & Environmental Invariants

| Component | Specification | Invariant / Rule for Agents |
| :--- | :--- | :--- |
| **Runtime / Bundler** | Vite 8 + ESNext modules | Run dev server on port `3000`, host `0.0.0.0`. |
| **Framework** | React 19 (`react`, `react-dom`) | Use functional components with hooks. Avoid legacy class components. |
| **Language** | TypeScript 5.x (strict mode) | Run `npm run lint` (`tsc --noEmit`) to verify zero type regressions. |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`) | Do NOT create a `tailwind.config.js`. Use CSS variables and `@theme` in `src/index.css`. |
| **Icons** | `lucide-react` | Standard SVG icons. Top-level named imports only. |
| **Animations** | `canvas-confetti` | Used for lesson and quiz completion celebrations. |
| **State Persistence** | `localStorage` (`reshmatex_app_v2_*`) | Always provide safe JSON parsing with fallback defaults. |

---

## 3. Directory Map for Agents

```
/
├── index.html                   # HTML entry point: fonts (Inter, Plus Jakarta Sans), OG meta
├── metadata.json                # AI Studio manifest (keep majorCapabilities synchronized)
├── package.json                 # Dependencies (React 19, Lucide, Tailwind v4, Canvas Confetti)
├── tsconfig.json                # TypeScript compiler config (paths: @/* -> ./*)
├── vite.config.ts               # Vite configuration (server port: 3000, hmr toggle)
├── README.md                    # Human-facing master documentation
├── AGENTS.md                    # This document (AI agent operating manual)
└── src/
    ├── main.tsx                 # Root React DOM mounter
    ├── App.tsx                  # Root state container, routing, modals & toast manager
    ├── index.css                # Tailwind v4 theme, fonts, scrollbars, gradient utilities
    ├── types.ts                 # Canonical TypeScript contracts (User, Track, Lesson, etc.)
    ├── data/
    │   └── mockData.ts          # Curricula modules, scenarios, knowledge docs, team seeds
    ├── components/
    │   ├── Navbar.tsx           # Glassmorphic top navigation for unauthenticated users
    │   ├── LandingPage.tsx      # Public landing page with features, tracks, pricing & FAQ
    │   ├── Sidebar.tsx          # Authenticated app shell sidebar with track badges
    │   ├── Header.tsx           # Search bar, notifications popover, XP streak badges
    │   ├── AuthModal.tsx        # Sign In / Register modal + 1-click Demo Personas
    │   ├── DemoModal.tsx        # Interactive 2-minute product tour modal
    │   ├── LessonModal.tsx      # Interactive lesson runner, quiz check & XP awarding
    │   ├── UploadDocModal.tsx   # Simulated 3-stage vectorization & RAG ingestion modal
    │   └── InviteModal.tsx      # Team member invitation modal
    └── views/
        ├── DashboardView.tsx    # KPI stat cards, velocity chart & radial progress ring
        ├── TrackView.tsx        # Curriculum roadmap (Sales, HR, or Finance)
        ├── PlaygroundView.tsx   # AI roleplay simulator & real-time rubric coach
        ├── KnowledgeView.tsx    # Enterprise RAG connectors & vectorized documents
        ├── AnalyticsView.tsx    # Business impact metrics & executive report export
        └── TeamView.tsx         # User directory, track assignments & CSV import
```

---

## 4. Canonical Data Models (`src/types.ts`)

When reading, updating, or generating new features, agents must strictly conform to these TypeScript interfaces:

```typescript
export type TrackId = 'sales' | 'hr' | 'finance';

export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  avatarInitials: string;
  createdAt: string;
}

export interface LessonContent {
  overview: string;
  keyPoints: string[];
  practicalExercise: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  promptTemplate?: string;
  xpReward: number;
}

export interface ModuleItem {
  id: string;
  title: string;
  duration: string;
  type: 'Video' | 'Interactive' | 'Lab' | 'AI Roleplay' | 'Case study' | 'Exam';
  status: 'done' | 'current' | 'locked';
  content: LessonContent;
}

export interface TrackProgress {
  completed: number;
  total: number;
  xp: number;
  streak: number;
  lastLesson: string;
  modules: ModuleItem[];
}

export interface Scenario {
  id: string;
  title: string;
  role: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  initialPrompt: string;
  firstMessage: string;
  context: string;
  learningGoal: string;
  suggestedResponses: string[];
}
```

---

## 5. Agent Instructions for Common Code Edits

### A. Adding or Modifying Curriculum Lessons
1. Open `src/data/mockData.ts`.
2. Locate `INITIAL_SALES_MODULES`, `INITIAL_HR_MODULES`, or `INITIAL_FINANCE_MODULES`.
3. Ensure every new module conforms to `ModuleItem`:
   - `id`: unique string (e.g., `s-9`, `h-8`, `f-7`).
   - `status`: `'done' | 'current' | 'locked'`.
   - `practicalExercise`: must include `question`, 4 `options`, 0-indexed `correctIndex`, and an `explanation`.
   - `xpReward`: number between `50` and `300`.
4. Run `npm run lint` to verify syntax.

### B. Extending Roleplay Scenarios & AI Responses
1. Open `src/data/mockData.ts` -> `SCENARIOS`.
2. Scenarios are categorized under `sales`, `hr`, and `finance`.
3. In `src/views/PlaygroundView.tsx`, the function `generateAIResponse(track, userMsg, scenario)` parses incoming user messages and returns:
   - `reply`: Realistic conversational turn.
   - `scores`: `{ clarity: number, empathy: number, tactical: number }` (integers between 0 and 100).
   - `coachingTip`: Tactical advice for the learner.
4. *Optional Gemini API Enhancement*: If integrating server-side `@google/genai`, proxy calls through a backend endpoint rather than exposing API keys on the client.

### C. Updating State & LocalStorage
`src/App.tsx` maintains synchronization with browser `localStorage` using keys prefixed with `reshmatex_app_v2_`:
- `reshmatex_app_v2_user`
- `reshmatex_app_v2_progress`
- `reshmatex_app_v2_docs`
- `reshmatex_app_v2_team`
- `reshmatex_app_v2_notifs`

When modifying any state interface, provide defensive fallbacks so existing browser storage does not cause runtime crashes.

---

## 6. Verification & Build Protocol for Agents

Before completing any task turn, agents must run the following validation pipeline:

```bash
# 1. Type validation (must exit with code 0)
npm run lint

# 2. Production build compilation (must succeed)
npm run build
```

---

## 7. Operational Guardrails

- **Zero Inline Styles**: Use Tailwind utility classes or classes declared in `src/index.css`.
- **No Mock API Breakage**: The app is designed to function completely offline and in sandboxed browser iframes without throwing uncaught exceptions.
- **No Device Frames**: When rendering UI mockups or generating screenshots, generate only the web application interface without surrounding laptop/phone bezel frames.
- **Tone & Copy**: Professional, enterprise B2B SaaS tone (aligned with Fortune 500 corporate training, SOC 2 compliance, and measurable ROI).
