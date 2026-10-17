import React, { useState } from 'react';
import { TeamMember } from '../types';
import {
  Users,
  UserPlus,
  Search,
  CheckCircle2,
  MoreVertical,
  Mail,
  Shield,
  FileSpreadsheet,
  Award
} from 'lucide-react';

interface TeamViewProps {
  teamMembers: TeamMember[];
  onOpenInvite: () => void;
}

export const TeamView: React.FC<TeamViewProps> = ({ teamMembers, onOpenInvite }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<'All' | 'Sales' | 'HR' | 'Finance'>('All');
  const [showCsvModal, setShowCsvModal] = useState(false);

  const filteredMembers = teamMembers.filter((m) => {
    const matchesTrack = selectedTrackFilter === 'All' || m.track === selectedTrackFilter;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrack && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900">Enterprise Team Members</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage track allocations, track mastery percentages, and invite colleagues
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowCsvModal(true)}
            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs px-3.5 py-2.5 rounded-xl transition shadow-2xs flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Import CSV</span>
          </button>
          <button
            onClick={onOpenInvite}
            className="bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition shadow-xs flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite Team Member</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        {/* Table Filters Header */}
        <div className="p-5 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-slate-900 text-base">Active Enrollees</h3>
            <span className="text-xs font-semibold bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded-full">
              {filteredMembers.length} Members
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-200/70 p-1 rounded-xl text-xs font-semibold text-slate-600">
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

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email..."
                className="pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 w-48 focus:w-60 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Member</th>
                <th className="px-6 py-3.5">Assigned Track</th>
                <th className="px-6 py-3.5">Curriculum Mastery</th>
                <th className="px-6 py-3.5">XP Earned</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/70 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                        {member.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{member.name}</div>
                        <div className="text-xs text-slate-500">{member.email} · {member.role}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        member.track === 'Sales'
                          ? 'bg-brand-50 text-brand-700'
                          : member.track === 'HR'
                          ? 'bg-purple-50 text-purple-700'
                          : 'bg-pink-50 text-pink-700'
                      }`}
                    >
                      {member.track} Track
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-28 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-brand-500 to-purple-600 rounded-full"
                          style={{ width: `${member.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-700">{member.progress}%</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md flex items-center gap-1 w-fit">
                      <Award className="w-3.5 h-3.5 text-amber-600" />
                      <span>{member.xp} XP</span>
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                        member.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          member.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                        }`}
                      />
                      <span className="capitalize">{member.status}</span>
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CSV Import Sample Modal */}
      {showCsvModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display font-bold text-slate-900">Batch Import via CSV</h3>
              <button onClick={() => setShowCsvModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload your employee directory in standard CSV format to automatically assign them to tracks with enterprise SSO links.
            </p>
            <div className="bg-slate-900 text-slate-200 p-3.5 rounded-xl font-mono text-xs leading-loose select-all">
              name,email,role,track<br />
              Sarah Miller,sarah@acme.com,Account Executive,Sales<br />
              David Clark,david@acme.com,HR Specialist,HR<br />
              Elena Vance,elena@acme.com,Financial Analyst,Finance
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowCsvModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowCsvModal(false);
                }}
                className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
              >
                Upload CSV File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
