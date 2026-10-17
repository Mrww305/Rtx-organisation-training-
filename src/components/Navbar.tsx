import React from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onOpenDemo }) => {
  return (
    <nav className="fixed top-0 inset-x-0 z-40 glass border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-bold font-display shadow-md shadow-brand-500/20">
            R
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl tracking-tight text-slate-900 leading-none">
              ReshmaTex
            </span>
            <span className="text-[10px] font-semibold text-brand-600 tracking-wider uppercase mt-0.5">
              Workforce AI
            </span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-brand-600 transition">Features</a>
          <a href="#tracks" className="hover:text-brand-600 transition">Tracks</a>
          <a href="#roi" className="hover:text-brand-600 transition">Enterprise ROI</a>
          <a href="#pricing" className="hover:text-brand-600 transition">Pricing</a>
          <a href="#faq" className="hover:text-brand-600 transition">FAQ</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDemo}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 text-slate-700 hover:text-brand-600 hover:bg-slate-100 rounded-lg transition"
          >
            <Play className="w-3.5 h-3.5 text-brand-600 fill-brand-600" />
            <span>2-Min Demo</span>
          </button>
          <button
            onClick={() => onOpenAuth('login')}
            className="text-sm font-medium text-slate-700 hover:text-brand-600 transition px-2"
          >
            Sign In
          </button>
          <button
            onClick={() => onOpenAuth('register')}
            className="text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-xl transition shadow-sm shadow-brand-500/25"
          >
            Start Free
          </button>
        </div>
      </div>
    </nav>
  );
};
