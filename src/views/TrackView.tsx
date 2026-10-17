import React from 'react';
import { TrackProgress, ModuleItem, ViewType } from '../types';
import {
  CheckCircle2,
  Lock,
  Play,
  Award,
  Flame,
  Bot,
  ArrowRight,
  Sparkles,
  BookOpen,
  FileCheck2
} from 'lucide-react';

interface TrackViewProps {
  trackId: 'sales' | 'hr' | 'finance';
  progress: TrackProgress;
  onOpenLesson: (module: ModuleItem, trackName: string, trackColor: 'brand' | 'purple' | 'pink') => void;
  onNavigateToPlayground: (trackId: 'sales' | 'hr' | 'finance') => void;
}

export const TrackView: React.FC<TrackViewProps> = ({
  trackId,
  progress,
  onOpenLesson,
  onNavigateToPlayground
}) => {
  const trackConfigs = {
    sales: {
      name: 'Sales Enablement',
      color: 'brand' as const,
      gradient: 'from-brand-600 via-indigo-600 to-indigo-800',
      description: 'Master AI-powered intent prospecting, predictive lead scoring, and skeptical CFO objection handling.',
      stats: [
        { label: 'Avg. Ramp Reduction', value: '42%' },
        { label: 'Pipeline Lift', value: '+28%' },
        { label: 'Active Learners', value: '487 reps' }
      ]
    },
    hr: {
      name: 'HR & People Operations',
      color: 'purple' as const,
      gradient: 'from-purple-600 via-purple-700 to-indigo-900',
      description: 'Deploy ethical, bias-aware screening workflows, build policy RAG chatbots, and practice high-stakes employee dialogues.',
      stats: [
        { label: 'Time-to-Hire Cut', value: '38%' },
        { label: 'Screening Accuracy', value: '94%' },
        { label: 'Active Learners', value: '312 specialists' }
      ]
    },
    finance: {
      name: 'Corporate Finance & FP&A',
      color: 'pink' as const,
      gradient: 'from-pink-600 via-rose-600 to-purple-900',
      description: 'Automate Accounts Payable invoice ingestion, detect threshold evasions, and defend variance forecasts before leadership.',
      stats: [
        { label: 'Close Cycle Cut', value: '51%' },
        { label: 'Error Rate Reduction', value: '95%' },
        { label: 'Active Learners', value: '256 analysts' }
      ]
    }
  };

  const currentConfig = trackConfigs[trackId];
  const completionPercentage = Math.round((progress.completed / progress.total) * 100);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className={`bg-gradient-to-br ${currentConfig.gradient} text-white rounded-2xl p-8 relative overflow-hidden shadow-lg shadow-black/5`}>
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full pointer-events-none" />
        <div className="relative max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center font-bold text-xl font-display">
              {currentConfig.name[0]}
            </div>
            <div>
              <div className="text-xs uppercase font-bold tracking-widest text-white/80">Specialized Enterprise Curriculum</div>
              <h2 className="font-display text-3xl font-extrabold tracking-tight">{currentConfig.name}</h2>
            </div>
          </div>
          <p className="text-sm text-white/90 leading-relaxed mb-6">
            {currentConfig.description}
          </p>

          <div className="grid grid-cols-3 gap-3">
            {currentConfig.stats.map((s, idx) => (
              <div key={idx} className="bg-white/15 backdrop-blur-md rounded-xl p-3 border border-white/10">
                <div className="text-[11px] font-medium text-white/80">{s.label}</div>
                <div className="font-display text-2xl font-bold text-white mt-0.5">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Two-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Curriculum List */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">Curriculum Roadmap</h3>
              <p className="text-xs text-slate-500">
                {progress.completed} of {progress.total} modules mastered ({completionPercentage}%)
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              <span>Accredited Track</span>
            </div>
          </div>

          <div className="space-y-3">
            {progress.modules.map((m, index) => {
              const isLocked = m.status === 'locked';
              const isDone = m.status === 'done';
              const isCurrent = m.status === 'current';

              return (
                <div
                  key={m.id}
                  onClick={() => !isLocked && onOpenLesson(m, currentConfig.name, currentConfig.color)}
                  className={`flex items-center justify-between p-4 rounded-xl border transition ${
                    isLocked
                      ? 'border-slate-200 bg-slate-50/60 opacity-60 cursor-not-allowed'
                      : isCurrent
                      ? 'border-brand-300 bg-brand-50/40 hover:bg-brand-50/70 cursor-pointer shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Status Icon */}
                    <div className="shrink-0">
                      {isDone ? (
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      ) : isCurrent ? (
                        <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center animate-pulse">
                          <Play className="w-4 h-4 fill-white ml-0.5" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                          <Lock className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    {/* Module Title & Metadata */}
                    <div className="min-w-0">
                      <div className="font-bold text-sm text-slate-900 truncate flex items-center gap-2">
                        <span>{m.title}</span>
                        {isCurrent && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-600 text-white px-2 py-0.5 rounded-full">
                            Up Next
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                        <span>{m.duration}</span>
                        <span>•</span>
                        <span>{m.type}</span>
                        <span>•</span>
                        <span className="font-semibold text-amber-600">+{m.content.xpReward} XP</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Action */}
                  <div className="shrink-0 ml-4">
                    {isDone ? (
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                        Completed
                      </span>
                    ) : isCurrent ? (
                      <button className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs transition">
                        Start Lesson
                      </button>
                    ) : (
                      <span className="text-xs font-medium text-slate-400">Locked</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Stats & Practice */}
        <div className="space-y-6">
          {/* Progress Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h3 className="font-display font-bold text-lg text-slate-900 mb-4">Track Progress Telemetry</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-sm">
                <span className="text-slate-500">XP Accumulated</span>
                <span className="font-display font-bold text-slate-900 text-base">{progress.xp} XP</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-sm">
                <span className="text-slate-500">Active Streak</span>
                <span className="font-bold text-amber-600 flex items-center gap-1">
                  <Flame className="w-4 h-4 fill-amber-500" />
                  <span>{progress.streak} Days</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Last Completed</span>
                <span className="font-medium text-slate-800 truncate ml-2 max-w-[140px] text-right">
                  {progress.lastLesson}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="text-xs font-semibold text-slate-500 mb-2">Track Mastery Level</div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden mb-1">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 to-purple-600 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-400 text-right">{completionPercentage}% Completed</div>
            </div>
          </div>

          {/* Practice in Sandbox */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-brand-400 mb-3">
              <Bot className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-lg text-white mb-1.5">Interactive Roleplay Coach</h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              Put this track's frameworks to the test in simulated negotiations and customer pushbacks with real-time feedback.
            </p>
            <button
              onClick={() => onNavigateToPlayground(trackId)}
              className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Launch {currentConfig.name.split(' ')[0]} Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
