import React, { useState } from 'react';
import { Navbar } from './Navbar';
import {
  ArrowRight,
  Play,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Users2,
  PieChart,
  ShieldCheck,
  Cpu,
  Layers,
  BarChart,
  Building2,
  ChevronDown,
  ChevronUp,
  Flame,
  Award
} from 'lucide-react';

interface LandingPageProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuth, onOpenDemo }) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How fast can our company deploy ReshmaTex?',
      a: 'Most enterprises are fully onboarded and actively training in under 5 business days. Our native connectors automatically sync with your existing Google Drive, Microsoft 365, or Salesforce to ground the AI on your exact playbooks and policies.'
    },
    {
      q: 'Do our proprietary SOPs or employee conversations train public models?',
      a: 'Never. ReshmaTex is built on enterprise zero-data-retention isolation. Your documents and training dialogues reside within private tenant containers with AES-256 encryption. We are SOC 2 Type II certified and GDPR compliant.'
    },
    {
      q: 'Can we customize the scenarios and objection simulations?',
      a: 'Yes! While we provide 20+ expert-vetted curricula out of the box, our AI curriculum editor allows you to upload bespoke SOPs, battlecards, and negotiation rubrics to generate custom roleplay scenarios in seconds.'
    },
    {
      q: 'What kind of business ROI can leadership expect?',
      a: 'On average, sales teams achieve a 42% reduction in rep ramp time, HR teams report 38% faster time-to-hire with unbiased screening, and corporate finance teams slash month-end close cycles by 51%.'
    },
    {
      q: 'What happens when our 14-day free trial concludes?',
      a: 'You can seamlessly continue on our Starter tier with up to 5 seats or upgrade to Growth for unlimited users and full custom RAG indexing. No credit card is required to begin.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar onOpenAuth={onOpenAuth} onOpenDemo={onOpenDemo} />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-grid">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50/60 via-transparent to-purple-50/60 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 bg-white border border-brand-200/80 rounded-full px-4 py-1.5 text-xs font-semibold text-brand-700 mb-6 shadow-xs animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Enterprise AI Upskilling Engine · Multi-Modal Roleplay</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.08] text-slate-900 max-w-4xl mx-auto">
            Upskill your workforce with <br />
            <span className="gradient-text">AI that knows their role</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            ReshmaTex delivers role-tailored AI curricula and real-time objection sandboxes for Sales, HR, and Finance teams — grounded on your internal SOPs and playbooks.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-16">
            <button
              onClick={() => onOpenAuth('register')}
              className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-brand-500/25 transition flex items-center justify-center gap-2 group"
            >
              <span>Start 14-Day Free Trial</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
            <button
              onClick={onOpenDemo}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold px-8 py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-xs"
            >
              <Play className="w-4 h-4 fill-brand-600 text-brand-600" />
              <span>Watch 2-Min Interactive Demo</span>
            </button>
          </div>

          {/* Interactive Mockup Preview Card */}
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-400 to-purple-400 rounded-3xl blur-2xl opacity-20 pointer-events-none" />
            <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden text-left">
              {/* Window Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50/80">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs text-slate-500 font-mono ml-2">app.reshmatex.com/enterprise</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active Workspace: Northwind Corp
                </div>
              </div>

              {/* Preview Content */}
              <div className="p-6 bg-slate-50/50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-5">
                  <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                    <div className="text-xs text-slate-500 mb-1">Active Learners</div>
                    <div className="text-2xl font-bold font-display text-slate-900">1,284</div>
                    <div className="text-xs text-emerald-600 font-semibold mt-1">↑ 14.2% this month</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                    <div className="text-xs text-slate-500 mb-1">Curriculum Completion</div>
                    <div className="text-2xl font-bold font-display text-slate-900">87%</div>
                    <div className="text-xs text-emerald-600 font-semibold mt-1">↑ 6.1% vs target</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                    <div className="text-xs text-slate-500 mb-1">Hours Recovered</div>
                    <div className="text-2xl font-bold font-display text-slate-900">24.8k</div>
                    <div className="text-xs text-emerald-600 font-semibold mt-1">↑ 31% efficiency lift</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                    <div className="text-xs text-slate-500 mb-1">Measured Payback</div>
                    <div className="text-2xl font-bold font-display text-brand-600">312% ROI</div>
                    <div className="text-xs text-emerald-600 font-semibold mt-1">60-day break-even</div>
                  </div>
                </div>

                {/* Track mini preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-brand-600 to-indigo-700 p-4 rounded-xl text-white shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase tracking-wider font-semibold opacity-85">Sales Track</span>
                      <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">Active</span>
                    </div>
                    <div className="text-lg font-bold">Pipeline & Objection AI</div>
                    <div className="mt-3 text-xs opacity-90 flex justify-between mb-1">
                      <span>Module 4 of 8 Complete</span>
                      <span>68%</span>
                    </div>
                    <div className="h-1.5 bg-white/25 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full w-[68%]" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-4 rounded-xl text-white shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase tracking-wider font-semibold opacity-85">HR Track</span>
                      <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">Active</span>
                    </div>
                    <div className="text-lg font-bold">Talent & Policy RAG</div>
                    <div className="mt-3 text-xs opacity-90 flex justify-between mb-1">
                      <span>Module 3 of 7 Complete</span>
                      <span>54%</span>
                    </div>
                    <div className="h-1.5 bg-white/25 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full w-[54%]" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-pink-600 to-pink-800 p-4 rounded-xl text-white shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase tracking-wider font-semibold opacity-85">Finance Track</span>
                      <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">Active</span>
                    </div>
                    <div className="text-lg font-bold">Ledger & AP Automation</div>
                    <div className="mt-3 text-xs opacity-90 flex justify-between mb-1">
                      <span>Module 2 of 6 Complete</span>
                      <span>42%</span>
                    </div>
                    <div className="h-1.5 bg-white/25 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full w-[42%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Logos */}
      <section className="py-12 border-y border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-6">
            Empowering 500+ High-Performance Organizations Worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70">
            <span className="font-display font-extrabold text-xl text-slate-700 tracking-tight">ACME CORP</span>
            <span className="font-display font-extrabold text-xl text-slate-700 tracking-tight">NORTHWIND</span>
            <span className="font-display font-extrabold text-xl text-slate-700 tracking-tight">GLOBEX GLOBAL</span>
            <span className="font-display font-extrabold text-xl text-slate-700 tracking-tight">INITECH LABS</span>
            <span className="font-display font-extrabold text-xl text-slate-700 tracking-tight">UMBRELLA ENTERPRISE</span>
            <span className="font-display font-extrabold text-xl text-slate-700 tracking-tight">SOYLENT CORP</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-2">
              Next-Gen Architecture
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Everything required to upskill entire departments
            </h2>
            <p className="text-slate-600 text-lg">
              Generic prompts don't prepare teams for high-stakes business moments. ReshmaTex combines structured curricula with simulated practice.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-hover bg-slate-50/60 border border-slate-200/80 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2 text-slate-900">Role-Specific Curricula</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Pre-built, peer-vetted modules customized specifically for Sales, HR, and Finance workflows — adaptable to your company's playbook in minutes.
              </p>
            </div>

            <div className="card-hover bg-slate-50/60 border border-slate-200/80 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2 text-slate-900">Your Data, Your Grounded AI</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Connect Google Drive, SharePoint, or Salesforce. Our contextual RAG vectorizes your policies so roleplay agents follow your exact compliance bounds.
              </p>
            </div>

            <div className="card-hover bg-slate-50/60 border border-slate-200/80 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2 text-slate-900">Quantifiable Business ROI</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Directly measure quota attainment, cycle acceleration, and hour savings. Generate board-ready PDF reports with verified skill mastery milestones.
              </p>
            </div>

            <div className="card-hover bg-slate-50/60 border border-slate-200/80 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2 text-slate-900">Real-Time Roleplay Sandbox</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Let sales reps overcome skeptical CFO price pushes, HR managers navigate sensitive PIPs, and finance leaders explain budget variances safely.
              </p>
            </div>

            <div className="card-hover bg-slate-50/60 border border-slate-200/80 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2 text-slate-900">Enterprise Security & Isolation</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                SOC-2 Type II, GDPR, and HIPAA-ready architecture. Zero data retention for model training, customer-managed encryption keys, SSO & SCIM.
              </p>
            </div>

            <div className="card-hover bg-slate-50/60 border border-slate-200/80 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-4">
                <BarChart className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2 text-slate-900">Team Progress Telemetry</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Monitor team completion velocities, identify skill gaps, celebrate learning streaks, and recognize top performers across all divisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tracks Breakdown */}
      <section id="tracks" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-2">
              Tailored Curricula
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Three tracks. Built for daily enterprise reality.
            </h2>
            <p className="text-slate-600 text-lg">
              Each track includes sequential video modules, hands-on lab sandboxes, knowledge checks, and professional certification.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Sales Card */}
            <div className="card-hover bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-2 bg-gradient-to-r from-brand-500 to-indigo-600" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-lg">
                      S
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-slate-900">Sales Enablement</h3>
                      <p className="text-xs text-slate-500">Revenue & Deal Velocity</p>
                    </div>
                  </div>
                  <ul className="space-y-2.5 text-sm text-slate-600 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                      <span>AI prospecting & predictive intent scoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                      <span>Pain-Hypothesis personalized outreach</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                      <span>Skeptical CFO objection simulator</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                      <span>Post-call transcription & automated CRM recap</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Avg. Ramp Time Cut</span>
                <span className="font-display font-bold text-brand-600 text-lg">-42%</span>
              </div>
            </div>

            {/* HR Card */}
            <div className="card-hover bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-700" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg">
                      H
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-slate-900">People & HR</h3>
                      <p className="text-xs text-slate-500">Talent & Ethical Governance</p>
                    </div>
                  </div>
                  <ul className="space-y-2.5 text-sm text-slate-600 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                      <span>Anonymized bias-aware resume screening</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                      <span>Company handbook policy RAG builder</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                      <span>Sensitive conversation & termination sandbox</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                      <span>Pulse survey theme extraction & action plans</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Time-to-Hire Reduction</span>
                <span className="font-display font-bold text-purple-600 text-lg">-38%</span>
              </div>
            </div>

            {/* Finance Card */}
            <div className="card-hover bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-2 bg-gradient-to-r from-pink-500 to-pink-700" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-lg">
                      F
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-slate-900">Corporate Finance</h3>
                      <p className="text-xs text-slate-500">Control, AP/AR & FP&A</p>
                    </div>
                  </div>
                  <ul className="space-y-2.5 text-sm text-slate-600 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0" />
                      <span>Multi-modal invoice OCR & GL auto-coding</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0" />
                      <span>Split-invoice & threshold fraud detection</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0" />
                      <span>Executive variance narrative generation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0" />
                      <span>Forecasting sensitivity & audit defense</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Close Cycle Reduced</span>
                <span className="font-display font-bold text-pink-600 text-lg">-51%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI & Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-2">
              Transparent Pricing
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Predictable investment. Compounding ROI.
            </h2>
            <p className="text-slate-600 text-lg mb-8">
              Start with a 14-day full workspace pilot. Expand across your organization with volume tiers.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="inline-flex items-center gap-3 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                  billingPeriod === 'monthly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingPeriod('annual')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                  billingPeriod === 'annual' ? 'bg-brand-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Annual Billing</span>
                <span className="bg-emerald-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">20% OFF</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="card-hover bg-white border border-slate-200 rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Starter Pilot</div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-display text-5xl font-extrabold text-slate-900">$0</span>
                  <span className="text-slate-500 text-sm">/ 14 days</span>
                </div>
                <p className="text-xs text-slate-500 mb-6">Perfect for small teams testing role-specific curricula.</p>
                <ul className="space-y-3 text-sm text-slate-600 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Up to 5 team seats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>1 dedicated role track</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Core interactive lesson library</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Community support</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onOpenAuth('register')}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 rounded-xl transition text-sm"
              >
                Get Started Free
              </button>
            </div>

            {/* Growth Tier */}
            <div className="card-hover bg-gradient-to-br from-brand-600 via-brand-700 to-purple-800 text-white rounded-2xl p-8 relative shadow-xl shadow-brand-500/25 md:scale-105 flex flex-col justify-between">
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-brand-200 mb-2">Growth Enterprise</div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-display text-5xl font-extrabold text-white">
                    {billingPeriod === 'annual' ? '$39' : '$49'}
                  </span>
                  <span className="text-brand-200 text-sm">/user/month</span>
                </div>
                <p className="text-xs text-brand-200 mb-6">For scaling revenue, HR, and finance departments.</p>
                <ul className="space-y-3 text-sm text-white/90 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>Unlimited team seats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>All 3 tracks (Sales, HR, Finance)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>Custom RAG knowledge grounding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>Unlimited AI roleplay sandbox sessions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>Executive ROI reports & CSV exports</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onOpenAuth('register')}
                className="w-full bg-white text-brand-700 hover:bg-slate-50 font-bold py-3.5 rounded-xl transition text-sm shadow-md"
              >
                Start 14-Day Free Trial
              </button>
            </div>

            {/* Enterprise Tier */}
            <div className="card-hover bg-white border border-slate-200 rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Global Enterprise</div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-display text-4xl font-extrabold text-slate-900">Custom</span>
                </div>
                <p className="text-xs text-slate-500 mb-6">For global corporations requiring custom integrations & SLA.</p>
                <ul className="space-y-3 text-sm text-slate-600 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Everything in Growth</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>SSO (Okta, Azure AD, Ping) & SCIM</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Dedicated L&D Customer Success Manager</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Custom ERP/CRM webhook automations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>99.9% Uptime SLA & DPA</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onOpenAuth('register')}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 rounded-xl transition text-sm"
              >
                Contact Enterprise Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section id="faq" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-2">
              Questions & Answers
            </div>
            <h2 className="font-display text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden transition shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 hover:bg-slate-50 transition"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-brand-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-br from-brand-600 via-brand-700 to-purple-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Build your high-performance AI workforce today
          </h2>
          <p className="text-lg text-brand-100 mb-8 max-w-2xl mx-auto">
            Join 500+ leading companies upskilling their Sales, HR, and Finance teams in days, not quarters.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenAuth('register')}
              className="bg-white text-brand-700 font-bold px-8 py-4 rounded-xl hover:bg-slate-100 transition shadow-lg shadow-black/20"
            >
              Start 14-Day Free Trial
            </button>
            <button
              onClick={onOpenDemo}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl backdrop-blur transition"
            >
              Explore Live Product Tour
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  R
                </div>
                <span className="font-display font-bold text-white text-lg">ReshmaTex</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-400 mb-4">
                The enterprise upskilling platform providing role-specific curricula, multi-modal roleplay, and grounded AI training.
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>SOC 2 Type II Certified · HIPAA Ready</span>
              </div>
            </div>

            <div>
              <div className="text-white font-bold text-xs uppercase tracking-wider mb-4">Role Curricula</div>
              <ul className="space-y-2 text-xs">
                <li><a href="#tracks" className="hover:text-white transition">Sales Pipeline & Objection AI</a></li>
                <li><a href="#tracks" className="hover:text-white transition">HR & Talent Acquisition RAG</a></li>
                <li><a href="#tracks" className="hover:text-white transition">Finance AP/AR & Ledger Automation</a></li>
                <li><a href="#tracks" className="hover:text-white transition">Certification Credentials</a></li>
              </ul>
            </div>

            <div>
              <div className="text-white font-bold text-xs uppercase tracking-wider mb-4">Platform</div>
              <ul className="space-y-2 text-xs">
                <li><a href="#features" className="hover:text-white transition">Roleplay Simulation Engine</a></li>
                <li><a href="#features" className="hover:text-white transition">Enterprise RAG Ingestion</a></li>
                <li><a href="#pricing" className="hover:text-white transition">ROI Measurement Dashboard</a></li>
                <li><a href="#features" className="hover:text-white transition">Security & Privacy Whitepaper</a></li>
              </ul>
            </div>

            <div>
              <div className="text-white font-bold text-xs uppercase tracking-wider mb-4">Company & Legal</div>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-white transition">About ReshmaTex</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy & DPA</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Enterprise Service</a></li>
                <li><a href="#" className="hover:text-white transition">Security Controls</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>© 2026 ReshmaTex, Inc. All rights reserved. Built for modern enterprise workforces.</div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition">LinkedIn</a>
              <a href="#" className="hover:text-white transition">Twitter / X</a>
              <a href="#" className="hover:text-white transition">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
