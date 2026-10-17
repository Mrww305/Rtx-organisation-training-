import React, { useState, useRef, useEffect } from 'react';
import { ViewType, NotificationItem, TrackProgress } from '../types';
import { Search, Bell, Flame, Award, Bot, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  notifications: NotificationItem[];
  onMarkNotificationsAsRead: () => void;
  progress: Record<'sales' | 'hr' | 'finance', TrackProgress>;
  onSelectSearchItem: (type: 'lesson' | 'scenario', trackId: string, id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  notifications,
  onMarkNotificationsAsRead,
  progress,
  onSelectSearchItem
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const totalXP = progress.sales.xp + progress.hr.xp + progress.finance.xp;
  const maxStreak = Math.max(progress.sales.streak, progress.hr.streak, progress.finance.streak);
  const unreadCount = notifications.filter((n) => n.unread).length;

  const viewTitles: Record<ViewType, { title: string; crumb: string }> = {
    dashboard: { title: 'Executive Workforce Overview', crumb: 'Enterprise Portal / Dashboard' },
    'track-sales': { title: 'Sales & Revenue Enablement Track', crumb: 'Tracks / Sales' },
    'track-hr': { title: 'People Ops & Talent Acquisition Track', crumb: 'Tracks / HR' },
    'track-finance': { title: 'Corporate Finance & FP&A Track', crumb: 'Tracks / Finance' },
    playground: { title: 'AI Roleplay Simulator', crumb: 'Tools / Roleplay Sandbox' },
    knowledge: { title: 'Enterprise Knowledge Grounding (RAG)', crumb: 'Tools / Knowledge Base' },
    analytics: { title: 'Business Impact & ROI Metrics', crumb: 'Reports / Analytics' },
    team: { title: 'Team Members & Track Distribution', crumb: 'Organization / Team' }
  };

  const { title, crumb } = viewTitles[currentView] || { title: 'Dashboard', crumb: 'Portal' };

  // Quick search across modules
  const allSearchableModules = [
    ...progress.sales.modules.map((m) => ({ ...m, track: 'Sales', trackId: 'sales' })),
    ...progress.hr.modules.map((m) => ({ ...m, track: 'HR', trackId: 'hr' })),
    ...progress.finance.modules.map((m) => ({ ...m, track: 'Finance', trackId: 'finance' }))
  ].filter(
    (m) =>
      searchQuery.trim() !== '' &&
      (m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.content.overview.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-8 py-3.5 flex items-center justify-between">
      {/* Title & Breadcrumb */}
      <div>
        <div className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
          <span>{crumb}</span>
        </div>
        <h1 className="font-display text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative" ref={searchRef}>
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              placeholder="Search lessons, SOPs, prompts..."
              className="pl-9 pr-3.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl w-60 focus:w-72 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
            />
          </div>

          {/* Search Dropdown */}
          {isSearchOpen && searchQuery.trim() !== '' && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 p-2 animate-fade-in">
              <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase">
                Matching Curricula ({allSearchableModules.length})
              </div>
              {allSearchableModules.length === 0 ? (
                <div className="text-xs text-slate-400 p-3 text-center">No matching lessons found</div>
              ) : (
                <div className="max-h-64 overflow-y-auto space-y-1">
                  {allSearchableModules.slice(0, 5).map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                        onSelectSearchItem('lesson', m.trackId, m.id);
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-50 transition text-xs flex items-center justify-between group"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-semibold text-slate-800 truncate group-hover:text-brand-600">
                          {m.title}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {m.track} Track · {m.type}
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-600 shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Streaks & XP Chips */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-lg text-xs font-bold text-amber-700 shadow-2xs">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{maxStreak} Day Streak</span>
          </div>
          <div className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-200/80 px-2.5 py-1 rounded-lg text-xs font-bold text-indigo-700 shadow-2xs">
            <Award className="w-3.5 h-3.5 text-indigo-600" />
            <span>{totalXP} XP</span>
          </div>
        </div>

        {/* Notifications Popover */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications && unreadCount > 0) {
                onMarkNotificationsAsRead();
              }
            }}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50 animate-fade-in">
              <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <span className="text-xs font-bold text-slate-900">Notifications</span>
                <span className="text-[10px] font-medium text-slate-500">
                  {notifications.length} recent
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-slate-50 transition text-xs">
                    <div className="font-semibold text-slate-800 flex items-center justify-between mb-0.5">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                    </div>
                    <p className="text-slate-600 leading-normal">{n.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Simulator CTA */}
        <button
          onClick={() => onNavigate('playground')}
          className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-700 hover:to-purple-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xs transition"
        >
          <Bot className="w-3.5 h-3.5" />
          <span>Launch AI Sandbox</span>
        </button>
      </div>
    </header>
  );
};
