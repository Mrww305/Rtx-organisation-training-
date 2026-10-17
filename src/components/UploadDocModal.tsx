import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { KnowledgeDocument } from '../types';

interface UploadDocModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDocument: (doc: KnowledgeDocument) => void;
}

export const UploadDocModal: React.FC<UploadDocModalProps> = ({ isOpen, onClose, onAddDocument }) => {
  if (!isOpen) return null;

  const [fileName, setFileName] = useState('');
  const [track, setTrack] = useState<'Sales' | 'HR' | 'Finance' | 'General'>('Sales');
  const [source, setSource] = useState<'Google Drive' | 'Microsoft 365' | 'Salesforce' | 'Manual Upload'>('Manual Upload');
  const [summary, setSummary] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    setIsProcessing(true);
    setProcessStep(1); // Parsing document text

    setTimeout(() => {
      setProcessStep(2); // Generating vector embeddings & chunking
      setTimeout(() => {
        setProcessStep(3); // Injecting into RAG knowledge index
        setTimeout(() => {
          const newDoc: KnowledgeDocument = {
            id: 'doc-' + Date.now(),
            name: fileName.endsWith('.pdf') || fileName.endsWith('.docx') || fileName.endsWith('.xlsx')
              ? fileName
              : `${fileName}.pdf`,
            source,
            size: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
            track,
            indexedAt: 'Just now',
            status: 'Ready',
            summary: summary.trim() || `Enterprise SOP document for ${track} department workflows with automated entity recognition.`,
            chunksCount: Math.floor(Math.random() * 50 + 20)
          };
          onAddDocument(newDoc);
          setIsProcessing(false);
          setProcessStep(0);
          onClose();
        }, 600);
      }, 700);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-slate-900">Upload & Vectorize Document</h3>
              <p className="text-xs text-slate-500">Add policies and playbooks to your AI training RAG</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isProcessing ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 animate-pulse">
              <Loader2 className="w-7 h-7 animate-spin" />
            </div>
            <div>
              <h4 className="font-display font-bold text-slate-900 text-lg">Indexing Document into Enterprise RAG</h4>
              <p className="text-xs text-slate-500 mt-1">Applying privacy guardrails and vector chunking...</p>
            </div>

            <div className="max-w-xs mx-auto text-left space-y-2 text-xs">
              <div className={`flex items-center gap-2 ${processStep >= 1 ? 'text-emerald-600 font-medium' : 'text-slate-400'}`}>
                <CheckCircle2 className="w-4 h-4" />
                <span>1. Optical character recognition & text extraction</span>
              </div>
              <div className={`flex items-center gap-2 ${processStep >= 2 ? 'text-emerald-600 font-medium' : 'text-slate-400'}`}>
                <CheckCircle2 className="w-4 h-4" />
                <span>2. Semantic chunking & 1536-dim vector embedding</span>
              </div>
              <div className={`flex items-center gap-2 ${processStep >= 3 ? 'text-emerald-600 font-medium' : 'text-slate-400'}`}>
                <CheckCircle2 className="w-4 h-4" />
                <span>3. Real-time grounding sync for AI roleplay</span>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Document Name or File
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="e.g. Sales_Discounting_Policy_2026.pdf"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Target Track
                </label>
                <select
                  value={track}
                  onChange={(e) => setTrack(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Sales">Sales</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="General">General / All</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Source Channel
                </label>
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Manual Upload">Manual File Upload</option>
                  <option value="Google Drive">Google Drive Folder</option>
                  <option value="Microsoft 365">SharePoint / M365</option>
                  <option value="Salesforce">Salesforce CRM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Brief Description or Key Topics
              </label>
              <textarea
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Highlight important clauses, approval thresholds, or customer guidelines to emphasize during AI simulation..."
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-100 flex items-center gap-2 text-xs text-brand-800">
              <Sparkles className="w-4 h-4 text-brand-600 shrink-0" />
              <span>Once vectorized, AI roleplay agents will automatically cite this document when training your reps.</span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-2 rounded-xl text-sm transition shadow-sm"
              >
                Index & Vectorize
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
