import React, { useState } from 'react';
import { ViewType, TrackProgress, ModuleItem } from '../types';
import {
  TrendingUp,
  Clock,
  Award,
  CheckCircle2,
  Play,
  ArrowRight,
  Flame,
  Bot,
  Sparkles,
  Users2
} from 'lucide-react';

interface DashboardViewProps {
  progress: Record<'sales' | 'hr' | 'finance', TrackProgress>;
  onNavigate: (view: ViewType) => void;
  onOpenLesson: (module: ModuleItem, trackName: string, trackColor: 'brand' | 'purple' | 'pink') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  progress,
  onNavigate,
  onOpenLesson
}) => {
  const [activityTimeframe, setActivityTimeframe] = useState<'week' | 'month' | 'quarter'>('week');
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  const totalCompleted = progress.sales.completed + progress.hr.completed + progress.finance.completed;
  const totalLessons = progress.sales.total + progress.hr.total + progress.finance.total;
  const overallPercentage = Math.round((totalCompleted / totalLessons) * 100);
  const totalXP = progress.sales.xp + progress.hr.xp + progress.finance.xp;

  // Chart data
  const chartDatasets = {
    week: {
      data: [42, 58, 51, 74, 68, 86, 94],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    month: {
      data: [210, 245, 290, 340],
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    },
    quarter: {
      data: [820, 940, 1150],
      labels: ['Month 1', 'Month 2', 'Month 3']
    }
  };

  const currentDataset = chartDatasets[activityTimeframe];
  const maxVal = Math.max(...currentDataset.data);

  // Active lessons that are "current" or "done" to continue
  const currentLessons = [
    {
      module: progress.sales.modules.find((m) => m.status === 'current') || progress.sales.modules[0],
      trackName: 'Sales',
      trackId: 'track-sales' as ViewType,
      color: 'brand' as const,
      colorClass: 'bg-brand-50 text-brand-700 border-brand-200'
    },
    {
      module: progress.hr.modules.find((m) => m.status === 'current') || progress.hr.modules[0],
      trackName: 'HR',
      trackId: 'track-hr' as ViewType,
      color: 'purple' as const,
      colorClass: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      module: progress.finance.modules.find((m) => m.status === 'current') || progress.finance.modules[0],
      trackName: 'Finance',
      trackId: 'track-finance' as ViewType,
      color: 'pink' as const,
      colorClass: 'bg-pink-50 text-pink-700 border-pink-200'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-700 text-white rounded-2xl p-6 shadow-md shadow-brand-500/10 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full pointer-events-none" />
        <div className="relative">
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-brand-100 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Workforce Readiness: High</span>
          </div>
          <h2 className="font-display text-2xl font-bold">Welcome back, Team Lead!</h2>
          <p className="text-xs text-brand-100 mt-1 max-w-xl leading-relaxed">
            Your organization has completed {totalCompleted} of {totalLessons} curriculum modules across 3 departments with 24.8k estimated hours saved.
          </p>
        </div>

        <div className="relative flex items-center gap-3">
          <button
            onClick={() => onNavigate('playground')}
            className="bg-white text-brand-700 hover:bg-brand-50 font-bold px-4 py-2.5 rounded-xl text-xs shadow-sm transition flex items-center gap-2"
          >
            <Bot className="w-4 h-4" />
            <span>Practice Roleplay</span>
          </button>
          <button
            onClick={() => onNavigate('analytics')}
            className="bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-2.5 rounded-xl text-xs backdrop-blur transition"
          >
            View ROI Report
          </button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 card-hover">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-3">
            <span>Active Learners</span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
              <Users2 className="w-4 h-4" />
            </div>
          </div>
          <div className="font-display text-3xl font-bold text-slate-900 mb-1">1,284</div>
          <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <span>↑ 12.4%</span>
            <span className="text-slate-400 font-normal">vs last month</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 card-hover">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-3">
            <span>Curriculum Completion</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="font-display text-3xl font-bold text-slate-900 mb-1">{overallPercentage}%</div>
          <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <span>↑ 5.2%</span>
            <span className="text-slate-400 font-normal">on-track</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 card-hover">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-3">
            <span>Hours Saved (YTD)</span>
            <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-display text-3xl font-bold text-slate-900 mb-1">24.8k hrs</div>
          <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <span>↑ 31%</span>
            <span className="text-slate-400 font-normal">efficiency lift</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 card-hover">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-3">
            <span>Audited ROI</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="font-display text-3xl font-bold text-emerald-600 mb-1">312%</div>
          <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <span>↑ 18%</span>
            <span className="text-slate-400 font-normal">over target</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity Bar Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900">Learning Activity Velocity</h3>
                <p className="text-xs text-slate-500">Modules completed & roleplays practiced</p>
              </div>
              <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                {(['week', 'month', 'quarter'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setActivityTimeframe(t)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition ${
                      activityTimeframe === t ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Bars */}
            <div className="h-56 flex items-end gap-3 pt-6 pb-2">
              {currentDataset.data.map((val, idx) => {
                const heightPct = Math.round((val / maxVal) * 100);
                const isHovered = hoveredBarIndex === idx;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredBarIndex(idx)}
                    onMouseLeave={() => setHoveredBarIndex(null)}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                  >
                    {/* Tooltip */}
                    <div
                      className={`absolute -top-10 bg-slate-900 text-white text-[11px] font-mono px-2.5 py-1 rounded-lg shadow-lg pointer-events-none transition-all ${
                        isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
                      }`}
                    >
                      {val} completed
                    </div>

                    {/* Bar */}
                    <div
                      className={`w-full rounded-t-xl transition-all duration-300 ${
                        isHovered
                          ? 'bg-gradient-to-t from-brand-600 to-purple-600 shadow-md shadow-brand-500/30'
                          : 'bg-gradient-to-t from-brand-400 to-purple-400/90'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                    <span className="text-[11px] font-medium text-slate-400 mt-2 truncate w-full text-center">
                      {currentDataset.labels[idx]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>🔥 Peak learning time: Thursdays at 11:00 AM</span>
            <span className="font-semibold text-brand-600">Total this period: {currentDataset.data.reduce((a, b) => a + b, 0)}</span>
          </div>
        </div>

        {/* Overall Progress Radial Ring */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900 mb-1">Curriculum Mastery</h3>
            <p className="text-xs text-slate-500 mb-6">Aggregate across Sales, HR & Finance</p>

            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <svg width="170" height="170" className="-rotate-90">
                  <circle cx="85" cy="85" r="70" stroke="#f1f5f9" strokeWidth="14" fill="none" />
                  <circle
                    cx="85"
                    cy="85"
                    r="70"
                    stroke="url(#radialGradient)"
                    strokeWidth="14"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 70}
                    strokeDashoffset={2 * Math.PI * 70 * (1 - overallPercentage / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                  <defs>
                    <linearGradient id="radialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="50%" stopColor="#9333ea" />
                      <stop offset="100%" stopColor="#db2777" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-4xl font-extrabold text-slate-900">{overallPercentage}%</span>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Overall</span>
                </div>
              </div>
            </div>

            {/* Track Breakdown Rows */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Sales Enablement</span>
                  <span className="text-slate-500 font-mono">
                    {progress.sales.completed}/{progress.sales.total}
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.round((progress.sales.completed / progress.sales.total) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">HR & Talent Ops</span>
                  <span className="text-slate-500 font-mono">
                    {progress.hr.completed}/{progress.hr.total}
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.round((progress.hr.completed / progress.hr.total) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Corporate Finance</span>
                  <span className="text-slate-500 font-mono">
                    {progress.finance.completed}/{progress.finance.total}
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-pink-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.round((progress.finance.completed / progress.finance.total) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Learning Modules & AI Roleplay Promo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning Cards */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">Current Assigned Modules</h3>
              <p className="text-xs text-slate-500">Pick up where your team left off to maintain streak</p>
            </div>
            <button
              onClick={() => onNavigate('track-sales')}
              className="text-xs font-bold text-brand-600 hover:text-brand-800 transition flex items-center gap-1"
            >
              <span>View All Tracks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {currentLessons.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onOpenLesson(item.module, item.trackName, item.color)}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 hover:border-brand-300 hover:bg-slate-50/70 transition cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${item.colorClass}`}>
                    {item.trackName[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-slate-900 truncate group-hover:text-brand-600">
                      {item.module.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {item.trackName} Track · {item.module.duration} · {item.module.type}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                    +{item.module.content.xpReward} XP
                  </span>
                  <div className="p-2 rounded-lg text-slate-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Roleplay Sandbox Quick Callout */}
        <div className="bg-gradient-to-br from-brand-600 via-indigo-700 to-purple-800 text-white rounded-2xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full pointer-events-none" />
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <Bot className="w-3.5 h-3.5" />
              <span>Simulated Practice</span>
            </div>
            <h3 className="font-display font-bold text-xl mb-2">Practice With Skeptical AI Buyers</h3>
            <p className="text-xs text-brand-100 leading-relaxed mb-6">
              Sharpen cold objection handling, PIP delivery, and audit defenses in a realistic sandbox before real customer calls.
            </p>
          </div>

          <button
            onClick={() => onNavigate('playground')}
            className="w-full bg-white text-brand-700 hover:bg-slate-50 font-bold py-3 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2"
          >
            <span>Open AI Roleplay Sandbox</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
