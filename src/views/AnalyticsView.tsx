import React, { useState } from 'react';
import {
  TrendingUp,
  Download,
  Calendar,
  CheckCircle2,
  Award,
  Zap,
  DollarSign,
  Clock,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<'12m' | '6m' | '30d'>('12m');
  const [showExportToast, setShowExportToast] = useState(false);

  const monthlyData = [32, 45, 38, 58, 62, 71, 68, 82, 89, 94, 88, 104];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const maxVal = Math.max(...monthlyData);

  const handleExport = () => {
    setShowExportToast(true);
    setTimeout(() => setShowExportToast(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900">Workforce AI Analytics & Business Impact</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Demonstrating tangible bottom-line acceleration, quota attainment, and cost reduction
          </p>
        </div>
        <button
          onClick={handleExport}
          className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-xs px-4 py-2.5 rounded-xl transition shadow-xs flex items-center gap-2 shrink-0"
        >
          <Download className="w-4 h-4 text-brand-600" />
          <span>Export Executive ROI Deck (.PDF / .CSV)</span>
        </button>
      </div>

      {showExportToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800 animate-fade-in shadow-xs">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Executive ROI deck generated successfully: ReshmaTex_Q3_Workforce_Impact_Report.pdf</span>
          </div>
          <span className="font-bold">Downloaded</span>
        </div>
      )}

      {/* Top Impact KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Net Pipeline Lift</div>
          <div className="font-display text-3xl font-bold text-brand-600 mb-1">$4.2M</div>
          <div className="text-xs text-emerald-600 font-semibold">↑ 28% win rate increase</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Hiring Cycle Saved</div>
          <div className="font-display text-3xl font-bold text-purple-600 mb-1">14 Days</div>
          <div className="text-xs text-emerald-600 font-semibold">-38% time-to-hire</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Month-End Close Cut</div>
          <div className="font-display text-3xl font-bold text-pink-600 mb-1">6 Days</div>
          <div className="text-xs text-emerald-600 font-semibold">-51% cycle acceleration</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="text-xs text-slate-500 font-medium mb-1">AP Error Rate Cut</div>
          <div className="font-display text-3xl font-bold text-emerald-600 mb-1">95%</div>
          <div className="text-xs text-emerald-600 font-semibold">Near-zero payment duplicates</div>
        </div>
      </div>

      {/* 12-Month Learning Velocity Chart & Track Share */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900">Module Completion Velocity</h3>
                <p className="text-xs text-slate-500">Curricula completed across all enterprise cohorts</p>
              </div>
              <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                {(['12m', '6m', '30d'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRange(r)}
                    className={`px-3 py-1 rounded-lg uppercase transition ${
                      selectedRange === r ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly Bar Chart */}
            <div className="h-60 flex items-end gap-2.5 pt-6 pb-2">
              {monthlyData.map((val, idx) => {
                const heightPct = Math.round((val / maxVal) * 100);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative">
                    <div className="absolute -top-8 bg-slate-900 text-white text-[11px] font-mono px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                      {val} lessons
                    </div>
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-brand-500 to-purple-500 group-hover:from-brand-600 group-hover:to-purple-600 transition-all duration-300"
                      style={{ height: `${heightPct}%` }}
                    />
                    <span className="text-[10px] text-slate-400 mt-2">{months[idx]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Average hours spent learning: 3.4 hrs/week per rep</span>
            <span className="font-semibold text-emerald-600">Cohort retention: 96.8%</span>
          </div>
        </div>

        {/* Breakdown by Track & Top Skill */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900 mb-1">Curriculum Track Share</h3>
            <p className="text-xs text-slate-500 mb-6">Distribution of active training hours</p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-800">Sales Enablement</span>
                  <span className="text-brand-600 font-mono">42%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-500 rounded-full" style={{ width: '42%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-800">HR & Talent Ops</span>
                  <span className="text-purple-600 font-mono">31%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '31%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-800">Corporate Finance</span>
                  <span className="text-pink-600 font-mono">27%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: '27%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5 border-t border-slate-100 mt-6">
            <div className="text-[11px] uppercase font-bold text-slate-400 mb-1.5">Top Acquired Skill</div>
            <div className="font-display font-bold text-slate-900 text-sm">
              Predictive Objection Defusal
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-normal">
              Adopted by 84% of revenue reps with +32% higher qualification velocity on first calls.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
