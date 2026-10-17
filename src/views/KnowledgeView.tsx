import React, { useState } from 'react';
import { KnowledgeDocument, DataSource } from '../types';
import {
  Database,
  Upload,
  Search,
  FileText,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Filter,
  Eye,
  X
} from 'lucide-react';

interface KnowledgeViewProps {
  documents: KnowledgeDocument[];
  dataSources: DataSource[];
  onOpenUpload: () => void;
}

export const KnowledgeView: React.FC<KnowledgeViewProps> = ({
  documents,
  dataSources,
  onOpenUpload
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<'All' | 'Sales' | 'HR' | 'Finance'>('All');
  const [previewDoc, setPreviewDoc] = useState<KnowledgeDocument | null>(null);

  const filteredDocs = documents.filter((doc) => {
    const matchesTrack = selectedTrackFilter === 'All' || doc.track === selectedTrackFilter;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrack && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Overview & Upload Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900">Enterprise RAG Knowledge Base</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Synchronized corporate playbooks, policies, and SOPs powering your AI training models
          </p>
        </div>
        <button
          onClick={onOpenUpload}
          className="bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition shadow-xs flex items-center gap-2 shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Upload & Vectorize SOP</span>
        </button>
      </div>

      {/* Connected Integrations Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dataSources.slice(0, 3).map((source) => (
          <div key={source.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs card-hover flex flex-col justify-between">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-700">
                <Database className="w-5 h-5 text-brand-600" />
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {source.status}
              </span>
            </div>
            <div>
              <div className="font-display font-bold text-base text-slate-900">{source.name}</div>
              <div className="text-xs text-slate-500 mt-0.5">
                {source.docsCount} documents indexed • Synced {source.lastUpdated}
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-xs">
              <span className="text-slate-400">Auto-sync: Every 6 hrs</span>
              <button className="text-brand-600 hover:text-brand-800 font-semibold transition">
                Manage Connector →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Indexed Documents Table & Filters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-lg text-slate-900">Vectorized Corporate Playbooks</h3>
            <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
              {filteredDocs.length} Documents
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Track Filter Tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
              {(['All', 'Sales', 'HR', 'Finance'] as const).map((track) => (
                <button
                  key={track}
                  onClick={() => setSelectedTrackFilter(track)}
                  className={`px-3 py-1 rounded-lg transition ${
                    selectedTrackFilter === track
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {track}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search indexed files..."
                className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 w-48 focus:w-60 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="divide-y divide-slate-100">
          {filteredDocs.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No matching playbooks or documents found.
            </div>
          ) : (
            filteredDocs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setPreviewDoc(doc)}
                className="py-3.5 flex items-center justify-between hover:bg-slate-50/80 rounded-xl px-3 transition cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-brand-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-slate-900 truncate group-hover:text-brand-600">
                      {doc.name}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 truncate max-w-xl">
                      {doc.summary}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      doc.track === 'Sales'
                        ? 'bg-brand-50 text-brand-700'
                        : doc.track === 'HR'
                        ? 'bg-purple-50 text-purple-700'
                        : doc.track === 'Finance'
                        ? 'bg-pink-50 text-pink-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {doc.track}
                  </span>
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-medium text-slate-700">{doc.chunksCount} Vector Chunks</div>
                    <div className="text-[10px] text-slate-400">{doc.indexedAt}</div>
                  </div>
                  <button className="p-1.5 rounded-lg text-slate-400 group-hover:text-brand-600 hover:bg-slate-100 transition">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Document Detail Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-600" />
                <h3 className="font-display font-bold text-slate-900 truncate max-w-xs">{previewDoc.name}</h3>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl text-center text-xs">
                <div>
                  <div className="text-slate-400">Track</div>
                  <div className="font-bold text-slate-800 mt-0.5">{previewDoc.track}</div>
                </div>
                <div>
                  <div className="text-slate-400">Size</div>
                  <div className="font-bold text-slate-800 mt-0.5">{previewDoc.size}</div>
                </div>
                <div>
                  <div className="text-slate-400">Embedding Chunks</div>
                  <div className="font-bold text-brand-600 mt-0.5">{previewDoc.chunksCount} Chunks</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Semantic Content Summary
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                  {previewDoc.summary}
                </p>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Indexed with 1536-dimension embeddings. Active in simulated AI roleplay prompt injection.</span>
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setPreviewDoc(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
