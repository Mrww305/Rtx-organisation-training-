import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Award, Sparkles, BookOpen, ArrowRight, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ModuleItem } from '../types';

interface LessonModalProps {
  module: ModuleItem | null;
  trackName: string;
  trackColor: 'brand' | 'purple' | 'pink';
  isOpen: boolean;
  onClose: () => void;
  onComplete: (moduleId: string, xpEarned: number) => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  module,
  trackName,
  trackColor,
  isOpen,
  onClose,
  onComplete
}) => {
  if (!isOpen || !module) return null;

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmittedQuiz, setHasSubmittedQuiz] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const colors = {
    brand: {
      badge: 'bg-brand-50 text-brand-700 border-brand-200',
      btn: 'bg-brand-600 hover:bg-brand-700',
      accent: 'text-brand-600'
    },
    purple: {
      badge: 'bg-purple-50 text-purple-700 border-purple-200',
      btn: 'bg-purple-600 hover:bg-purple-700',
      accent: 'text-purple-600'
    },
    pink: {
      badge: 'bg-pink-50 text-pink-700 border-pink-200',
      btn: 'bg-pink-600 hover:bg-pink-700',
      accent: 'text-pink-600'
    }
  }[trackColor];

  const handleQuizSubmit = () => {
    if (selectedOption === null) return;
    setHasSubmittedQuiz(true);
    if (selectedOption === module.content.practicalExercise.correctIndex) {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleFinishLesson = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    onComplete(module.id, module.content.xpReward);
    onClose();
  };

  const copyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const isCorrect = selectedOption === module.content.practicalExercise.correctIndex;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${colors.badge}`}>
              {trackName} Track · {module.type}
            </span>
            <span className="text-xs text-slate-500 font-medium">⏱ {module.duration}</span>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> +{module.content.xpReward} XP
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">{module.title}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{module.content.overview}</p>
          </div>

          {/* Key Takeaways */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-brand-600" />
              Core Competencies & SOP Best Practices
            </h4>
            <ul className="space-y-2">
              {module.content.keyPoints.map((pt, i) => (
                <li key={i} className="text-sm text-slate-700 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prompt Template if available */}
          {module.content.promptTemplate && (
            <div className="border border-brand-200 bg-brand-50/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-brand-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Verified Enterprise Prompt Template
                </span>
                <button
                  onClick={() => copyPrompt(module.content.promptTemplate!)}
                  className="text-xs text-brand-600 hover:text-brand-800 font-medium flex items-center gap-1 transition"
                >
                  {copiedPrompt ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedPrompt ? 'Copied!' : 'Copy Template'}
                </button>
              </div>
              <div className="bg-white p-3 rounded-lg border border-brand-100 text-xs font-mono text-slate-800 leading-relaxed select-all">
                {module.content.promptTemplate}
              </div>
            </div>
          )}

          {/* Interactive Check / Quiz */}
          <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-slate-900">Knowledge Check & Scenario Application</h4>
              <span className="text-xs font-medium text-slate-500">Passing unlocks next lesson</span>
            </div>
            <p className="text-sm text-slate-700 font-medium mb-4">{module.content.practicalExercise.question}</p>

            <div className="space-y-2.5">
              {module.content.practicalExercise.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let optStyle = 'border-slate-200 hover:bg-slate-50 text-slate-700';

                if (hasSubmittedQuiz) {
                  if (idx === module.content.practicalExercise.correctIndex) {
                    optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium';
                  } else if (isSelected) {
                    optStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                  }
                } else if (isSelected) {
                  optStyle = 'border-brand-500 bg-brand-50/50 text-brand-900 font-medium';
                }

                return (
                  <button
                    key={idx}
                    disabled={hasSubmittedQuiz}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full text-left p-3 rounded-xl border text-sm transition flex items-start gap-3 ${optStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{opt}</span>
                  </button>
                );
              })}
            </div>

            {!hasSubmittedQuiz ? (
              <button
                disabled={selectedOption === null}
                onClick={handleQuizSubmit}
                className="mt-4 w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl text-sm transition"
              >
                Submit Answer
              </button>
            ) : (
              <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center gap-2 font-bold mb-1">
                  {isCorrect ? (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Correct! Excellent judgment.
                    </span>
                  ) : (
                    <span className="text-amber-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> Review Recommendation
                    </span>
                  )}
                </div>
                <p className="text-slate-600">{module.content.practicalExercise.explanation}</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Review Later
          </button>
          <button
            onClick={handleFinishLesson}
            className={`inline-flex items-center gap-2 ${colors.btn} text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-md transition`}
          >
            <span>{module.status === 'done' ? 'Re-complete Lesson' : 'Complete & Earn XP'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
