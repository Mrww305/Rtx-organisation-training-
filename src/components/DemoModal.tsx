import React, { useState } from 'react';
import { X, Play, Pause, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTrial: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose, onStartTrial }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  if (!isOpen) return null;

  const steps = [
    {
      title: '1. Connect Your Enterprise Knowledge',
      subtitle: 'Instant ingestion of SOPs, CRM notes, and company playbooks',
      content: (
        <div className="bg-slate-900 text-white rounded-xl p-6 font-mono text-xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <Zap className="w-4 h-4" />
            <span>Syncing corporate knowledge base...</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-lg space-y-1.5 border border-slate-700">
            <div className="text-slate-400">✓ Ingested Sales_Playbook_2026.pdf (84 chunks, 1536-dim embeddings)</div>
            <div className="text-slate-400">✓ Ingested HR_Policies_Handbook.docx (62 chunks, zero-PII redacted)</div>
            <div className="text-slate-400">✓ Ingested Q3_Ledger_SOP.xlsx (45 schema nodes verified)</div>
          </div>
          <div className="text-brand-300 text-sm font-sans font-medium">
            AI automatically customizes training curriculums to match your exact processes and compliance standards.
          </div>
        </div>
      )
    },
    {
      title: '2. Role-Specific AI Practice Sandbox',
      subtitle: 'Learners roleplay with realistic, skeptical AI counterparts',
      content: (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
              CFO
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-sm text-xs text-slate-700">
              "We froze all discretionary software spend for Q4. Why should I make an exception for your tool?"
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <div className="bg-brand-600 text-white p-3 rounded-2xl rounded-tr-sm text-xs max-w-[80%]">
              "Understood David. Rather than an expense, our customers see an audited 60-day payback period. Could we review their 3x cash ROI model?"
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-2.5 rounded-lg text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>AI Coaching Score: 94/100</strong> — High empathy & financial reframing without defensiveness.</span>
          </div>
        </div>
      )
    },
    {
      title: '3. Measurable ROI & Real-Time Tracking',
      subtitle: 'Executive dashboards demonstrate pipeline lift and hours saved',
      content: (
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white border border-slate-200 p-4 rounded-xl text-center">
            <div className="text-xs text-slate-500 mb-1">Ramp Time</div>
            <div className="text-2xl font-bold font-display text-brand-600">-42%</div>
            <div className="text-[11px] text-green-600 mt-1">Faster quota attainment</div>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-xl text-center">
            <div className="text-xs text-slate-500 mb-1">Time to Hire</div>
            <div className="text-2xl font-bold font-display text-purple-600">-38%</div>
            <div className="text-[11px] text-green-600 mt-1">Faster candidate screening</div>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-xl text-center">
            <div className="text-xs text-slate-500 mb-1">Close Cycle</div>
            <div className="text-2xl font-bold font-display text-pink-600">-51%</div>
            <div className="text-[11px] text-green-600 mt-1">Days saved in month-end</div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              R
            </div>
            <div>
              <h3 className="font-display font-bold text-slate-900">ReshmaTex Interactive Product Tour</h3>
              <p className="text-xs text-slate-500">How enterprises upskill 500+ employees in 14 days</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tour Body */}
        <div className="p-6">
          {/* Step tabs */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {steps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`py-2 px-3 rounded-lg text-xs font-medium text-left transition border ${
                  activeStep === idx
                    ? 'bg-brand-50 border-brand-300 text-brand-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold">Step {idx + 1}</div>
                <div className="truncate text-[11px] opacity-80">{s.title.split('. ')[1]}</div>
              </button>
            ))}
          </div>

          {/* Current Step Content */}
          <div className="mb-6">
            <h4 className="font-display font-bold text-lg text-slate-900 mb-1">{steps[activeStep].title}</h4>
            <p className="text-sm text-slate-500 mb-4">{steps[activeStep].subtitle}</p>
            {steps[activeStep].content}
          </div>

          {/* Security badge & Features */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>SOC-2 Type II & GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : 2))}
                className="hover:text-slate-800 transition"
              >
                Previous
              </button>
              <button
                onClick={() => setActiveStep((prev) => (prev < 2 ? prev + 1 : 0))}
                className="hover:text-slate-800 font-semibold text-brand-600 transition"
              >
                Next Step →
              </button>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Close Tour
          </button>
          <button
            onClick={() => {
              onClose();
              onStartTrial();
            }}
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-brand-500/25 transition"
          >
            <span>Start 14-Day Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
