import React, { useState, useEffect, useRef } from 'react';
import { RoleplayMessage, Scenario } from '../types';
import { SCENARIOS } from '../data/mockData';
import {
  Bot,
  User as UserIcon,
  Send,
  RotateCcw,
  Sparkles,
  Award,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PlaygroundViewProps {
  initialTrack?: 'sales' | 'hr' | 'finance';
  onAwardXP: (amount: number) => void;
}

export const PlaygroundView: React.FC<PlaygroundViewProps> = ({
  initialTrack = 'sales',
  onAwardXP
}) => {
  const [selectedTrack, setSelectedTrack] = useState<'sales' | 'hr' | 'finance'>(initialTrack);
  const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[initialTrack][0]);
  const [messages, setMessages] = useState<RoleplayMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [evaluationScores, setEvaluationScores] = useState<{
    clarity: number;
    empathy: number;
    tactical: number;
  }>({ clarity: 88, empathy: 85, tactical: 90 });
  const [latestTip, setLatestTip] = useState<string>(
    'Focus on acknowledging the buyer objection before immediately pitching software features.'
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize or reset scenario
  const initScenario = (scenario: Scenario) => {
    setActiveScenario(scenario);
    const initialMsgs: RoleplayMessage[] = [
      {
        id: 'msg-sys',
        role: 'system',
        content: `Scenario Brief: ${scenario.context}\nObjective: ${scenario.learningGoal}`,
        timestamp: 'Just now',
        isSystem: true
      },
      {
        id: 'msg-start',
        role: 'assistant',
        content: scenario.firstMessage,
        timestamp: 'Just now'
      }
    ];
    setMessages(initialMsgs);
    setLatestTip(`Objective: ${scenario.learningGoal}`);
  };

  useEffect(() => {
    initScenario(SCENARIOS[selectedTrack][0]);
  }, [selectedTrack]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMsg: RoleplayMessage = {
      id: 'usr-' + Date.now(),
      role: 'user',
      content: text,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Dynamic AI response simulation with tactical evaluation
    setTimeout(() => {
      const generated = generateAIResponse(selectedTrack, text, activeScenario);

      const aiMsg: RoleplayMessage = {
        id: 'ai-' + Date.now(),
        role: 'assistant',
        content: generated.reply,
        timestamp: 'Just now'
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      setEvaluationScores(generated.scores);
      setLatestTip(generated.coachingTip);

      // Award XP for participating in high-value simulation
      if (messages.length >= 3) {
        onAwardXP(25);
      }
    }, 900 + Math.random() * 600);
  };

  const handleSelectSuggested = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)] min-h-[640px]">
      {/* Left Column: Scenarios selector */}
      <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between overflow-hidden">
        <div className="overflow-y-auto space-y-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Track Selection</div>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
              {(['sales', 'hr', 'finance'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTrack(t)}
                  className={`py-1.5 text-xs font-bold rounded-lg capitalize transition ${
                    selectedTrack === t ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Active Scenarios</div>
            <div className="space-y-2">
              {SCENARIOS[selectedTrack].map((sc) => {
                const isSelected = activeScenario.id === sc.id;
                return (
                  <button
                    key={sc.id}
                    onClick={() => initScenario(sc)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/50 text-brand-900 shadow-2xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-bold mb-1 truncate text-slate-900">{sc.title}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-2">{sc.role}</div>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {sc.difficulty}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Real-time coaching panel */}
        <div className="pt-4 border-t border-slate-100 mt-2 bg-slate-50/70 p-3 rounded-xl">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>AI Real-Time Rubric</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-500">Clarity & Confidence</span>
              <span className="font-bold text-brand-600">{evaluationScores.clarity}%</span>
            </div>
            <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-brand-500 rounded-full" style={{ width: `${evaluationScores.clarity}%` }} />
            </div>

            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-500">Empathy / Non-Defensiveness</span>
              <span className="font-bold text-purple-600">{evaluationScores.empathy}%</span>
            </div>
            <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: `${evaluationScores.empathy}%` }} />
            </div>

            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-500">Tactical Framework Match</span>
              <span className="font-bold text-pink-600">{evaluationScores.tactical}%</span>
            </div>
            <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-pink-500 rounded-full" style={{ width: `${evaluationScores.tactical}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Chat simulator */}
      <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-col justify-between overflow-hidden">
        {/* Scenario Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-slate-900">{activeScenario.title}</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full">
                {selectedTrack} Simulation
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{activeScenario.role}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => initScenario(activeScenario)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
              title="Reset scenario conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat message history */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m) => {
            if (m.isSystem) {
              return (
                <div key={m.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-600 space-y-1">
                  <div className="font-bold text-slate-700 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    <span>Learning Objective & Constraints</span>
                  </div>
                  <div className="whitespace-pre-line leading-relaxed">{m.content}</div>
                </div>
              );
            }

            const isUser = m.role === 'user';
            return (
              <div key={m.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                    AI
                  </div>
                )}
                <div
                  className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    isUser
                      ? 'bg-brand-600 text-white rounded-br-sm shadow-xs'
                      : 'bg-slate-100 text-slate-800 rounded-bl-sm border border-slate-200/60'
                  }`}
                >
                  {m.content}
                </div>
                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    You
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                AI
              </div>
              <div className="bg-slate-100 border border-slate-200/60 rounded-2xl rounded-bl-sm px-4 py-3 text-xs text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse delay-150" />
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse delay-300" />
                <span>Formulating counter-objection...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Response Chips */}
        {activeScenario.suggestedResponses && activeScenario.suggestedResponses.length > 0 && (
          <div className="px-6 py-2 bg-slate-50/80 border-t border-slate-100 overflow-x-auto flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase text-slate-400 shrink-0">Quick Responses:</span>
            {activeScenario.suggestedResponses.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSuggested(s)}
                className="shrink-0 text-[11px] bg-white border border-slate-200 hover:border-brand-300 hover:bg-brand-50/40 text-slate-700 px-3 py-1 rounded-full transition truncate max-w-xs"
                title={s}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Draft your response to the stakeholder..."
              className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition shadow-sm flex items-center gap-1.5"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Response logic simulating realistic enterprise conversation turns
function generateAIResponse(
  track: 'sales' | 'hr' | 'finance',
  userMsg: string,
  scenario: Scenario
) {
  const lower = userMsg.toLowerCase();

  const replies = {
    sales: [
      {
        reply:
          "That sounds logical, but my VP of Engineering insists that new tool rollouts cause downtime. What concrete SLA or deployment guarantee can you commit to in writing before I put this in front of the board?",
        scores: { clarity: 92, empathy: 88, tactical: 94 },
        coachingTip: "Excellent job framing the financial return. Now reassure on technical deployment and risk mitigation."
      },
      {
        reply:
          "Okay, let's suppose we entertain this. What happens if our active seat count drops by 20% due to team restructuring? Are we locked into the full annual commitment or can we flex licenses dynamically?",
        scores: { clarity: 89, empathy: 91, tactical: 90 },
        coachingTip: "Good engagement! Address their contract flexibility concerns while protecting minimum tier profitability."
      },
      {
        reply:
          "Send me that 1-page financial case study by 3 PM today. If the payback period is under 90 days as you claimed, I will schedule our technical lead for a 30-minute diligence call next Tuesday.",
        scores: { clarity: 95, empathy: 93, tactical: 96 },
        coachingTip: "Strong closing! You successfully earned the next step with an enterprise executive."
      }
    ],
    hr: [
      {
        reply:
          "Thank you for confirming that anti-retaliation policy. It gives me some relief. What happens next? Does someone interview my manager immediately or do you collect written statements first?",
        scores: { clarity: 94, empathy: 96, tactical: 92 },
        coachingTip: "Very compassionate and legally precise response. Clearly outline the next procedural steps."
      },
      {
        reply:
          "I appreciate the sign-on bonus offer. If we can also add accelerated 6-month equity vesting or flexible home office stipend, I am prepared to sign and turn down the competing offer today.",
        scores: { clarity: 90, empathy: 89, tactical: 93 },
        coachingTip: "Great trade-off structure without breaking internal salary bands."
      },
      {
        reply:
          "I understand this decision is final. It hurts, but thank you for treating me with respect and offering severance support. Please email my healthcare paperwork to my personal address.",
        scores: { clarity: 96, empathy: 97, tactical: 95 },
        coachingTip: "Masterful de-escalation of a difficult conversation with dignity and compliance."
      }
    ],
    finance: [
      {
        reply:
          "Your ASC 350-40 memo rationale on preliminary research stage compute is coherent. Upload the project stage-gate sign-offs and vendor invoices to our data room by tomorrow morning so we can close the testing sample.",
        scores: { clarity: 94, empathy: 88, tactical: 97 },
        coachingTip: "Bulletproof audit defense. Precision citations to US GAAP guidelines prevented a material audit adjustment."
      },
      {
        reply:
          "That explains the CAC efficiency trade-off. However, the board needs to see this reflected in next month's forecast. Bring the revised EBITDA sensitivity matrix to Monday's executive committee.",
        scores: { clarity: 91, empathy: 90, tactical: 92 },
        coachingTip: "Great root cause articulation. You bridged the variance while providing concrete forward mitigations."
      },
      {
        reply:
          "Extending the term by 24 months in exchange for tier restructuring is acceptable to our commercial committee. Send over the contract addendum reflecting the blended seat rate.",
        scores: { clarity: 95, empathy: 92, tactical: 95 },
        coachingTip: "Outstanding vendor renegotiation! You contained cost without sacrificing relationship goodwill."
      }
    ]
  };

  const pool = replies[track];
  return pool[Math.floor(Math.random() * pool.length)];
}
