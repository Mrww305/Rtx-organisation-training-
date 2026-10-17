import React, { useState } from 'react';
import { User } from '../types';
import { DEMO_PERSONAS } from '../data/mockData';
import { Sparkles, ArrowRight, ShieldCheck, Check, Mail, Lock, Building, UserCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'register';
  onLogin: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode,
  onLogin
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = name.trim() || email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const initials = displayName
      .split(' ')
      .map((p) => p[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    const user: User = {
      id: 'usr-' + Date.now(),
      name: displayName,
      email: email.trim(),
      company: company.trim() || 'Enterprise Org',
      role: mode === 'register' ? 'Team Lead' : 'Learner',
      avatarInitials: initials || 'U',
      createdAt: new Date().toISOString()
    };

    onLogin(user);
    onClose();
  };

  const handleSelectPersona = (p: typeof DEMO_PERSONAS[0]) => {
    const user: User = {
      id: 'usr-' + p.initials.toLowerCase(),
      name: p.name,
      email: p.email,
      company: p.company,
      role: p.role,
      avatarInitials: p.initials,
      createdAt: new Date().toISOString()
    };
    onLogin(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row min-h-[540px]">
        {/* Left Side: Testimonial & Value Proof */}
        <div className="md:w-5/12 bg-gradient-to-br from-brand-600 via-brand-700 to-purple-800 text-white p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-10"></div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center font-bold font-display text-white">
                R
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">ReshmaTex</span>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-brand-100 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proven Enterprise Upskilling</span>
            </div>
            <blockquote className="text-lg font-medium leading-snug mb-3">
              "We cut onboarding ramp time by 42% and closed $1.8M in pipeline within the first quarter."
            </blockquote>
            <p className="text-xs text-brand-200">— Priya Sharma, VP of Revenue, Northwind Corp</p>
          </div>

          <div className="relative pt-6 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="font-display font-bold text-xl">500+</div>
              <div className="text-[11px] text-brand-200">Enterprises</div>
            </div>
            <div>
              <div className="font-display font-bold text-xl">50k+</div>
              <div className="text-[11px] text-brand-200">Learners</div>
            </div>
            <div>
              <div className="font-display font-bold text-xl">4.9/5</div>
              <div className="text-[11px] text-brand-200">Rating</div>
            </div>
          </div>
        </div>

        {/* Right Side: Form & Persona Switcher */}
        <div className="md:w-7/12 p-8 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-bold text-2xl text-slate-900">
                  {mode === 'login' ? 'Welcome back' : 'Start your 14-day trial'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {mode === 'login' ? 'Access your tracks & team dashboard' : 'No credit card required. Full track access.'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-700 text-sm font-medium"
              >
                ✕
              </button>
            </div>

            {/* Quick Demo Switcher */}
            <div className="mb-5 bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div className="text-xs font-semibold text-slate-600 mb-2 flex items-center justify-between">
                <span>⚡ Instant Demo Personas (1-click login):</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {DEMO_PERSONAS.map((p) => (
                  <button
                    key={p.initials}
                    type="button"
                    onClick={() => handleSelectPersona(p)}
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:border-brand-400 hover:bg-brand-50/40 text-left transition text-xs group"
                  >
                    <div className="font-bold text-slate-800 truncate group-hover:text-brand-700">{p.name.split(' ')[0]}</div>
                    <div className="text-[10px] text-slate-500 capitalize">{p.activeTrack} Track</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <span className="relative bg-white px-3 text-[11px] text-slate-400 uppercase font-semibold">
                Or sign in with email
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Cooper"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-10 pr-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Global Inc."
                      className="w-full pl-10 pr-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2.5 rounded-xl text-sm transition shadow-sm"
              >
                {mode === 'login' ? 'Sign In to Dashboard' : 'Create Free Workspace'}
              </button>
            </form>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            </span>
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="font-semibold text-brand-600 hover:underline"
            >
              {mode === 'login' ? 'Start 14-day trial' : 'Sign in instead'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
