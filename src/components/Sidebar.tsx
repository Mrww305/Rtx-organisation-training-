import React from 'react';
import { ViewType, User, TrackProgress } from '../types';
import {
  LayoutDashboard,
  TrendingUp,
  Users2,
  PieChart,
  Bot,
  Database,
  BarChart3,
  Users,
  LogOut,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  user: User;
  onLogout: () => void;
  progress: Record<'sales' | 'hr' | 'finance', TrackProgress>;
  onReturnToLanding: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  user,
  onLogout,
  progress,
  onReturnToLanding
}) => {
  const navItems = [
    { id: 'dashboard' as ViewType, label: 'Dashboard', icon: LayoutDashboard }
  ];

  const tracks = [
    {
      id: 'track-sales' as ViewType,
      label: 'Sales',
      color: 'bg-brand-500',
      textColor: 'text-brand-600',
      badgeBg: 'bg-brand-100',
      progress: progress.sales
    },
    {
      id: 'track-hr' as ViewType,
      label: 'HR & People',
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      badgeBg: 'bg-purple-100',
      progress: progress.hr
    },
    {
      id: 'track-finance' as ViewType,
      label: 'Finance & FP&A',
      color: 'bg-pink-500',
      textColor: 'text-pink-600',
      badgeBg: 'bg-pink-100',
      progress: progress.finance
    }
  ];

  const toolItems = [
    { id: 'playground' as ViewType, label: 'AI Roleplay Sandbox', icon: Bot, badge: 'Interactive' },
    { id: 'knowledge' as ViewType, label: 'Knowledge Base', icon: Database, badge: 'RAG' },
    { id: 'analytics' as ViewType, label: 'Impact Analytics', icon: BarChart3 },
    { id: 'team' as ViewType, label: 'Team Members', icon: Users }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col fixed inset-y-0 left-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <button
          onClick={onReturnToLanding}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-bold font-display shadow-sm shadow-brand-500/20 group-hover:scale-105 transition">
            R
          </div>
          <div>
            <div className="font-display font-bold text-slate-900 text-base leading-none">ReshmaTex</div>
            <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">Enterprise Portal</div>
          </div>
        </button>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 p-3 space-y-6 overflow-y-auto">
        {/* Core items */}
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tracks */}
        <div>
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Role Curricula
          </div>
          <div className="space-y-1">
            {tracks.map((t) => {
              const isActive = currentView === t.id;
              const pct = Math.round((t.progress.completed / t.progress.total) * 100);
              return (
                <button
                  key={t.id}
                  onClick={() => onNavigate(t.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 font-semibold shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${t.color}`} />
                    <span>{t.label}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {pct}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools */}
        <div>
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            AI Tools & Systems
          </div>
          <div className="space-y-1">
            {toolItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-semibold bg-brand-100 text-brand-700 px-1.5 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* User Footer */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-200/70 shadow-xs">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
            {user.avatarInitials}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="text-xs font-bold text-slate-800 truncate">{user.name}</div>
            <div className="text-[11px] text-slate-400 truncate">{user.company}</div>
          </div>
          <button
            onClick={onLogout}
            title="Sign out"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
