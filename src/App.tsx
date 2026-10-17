import React, { useState, useEffect } from 'react';
import {
  User,
  ViewType,
  TrackProgress,
  ModuleItem,
  KnowledgeDocument,
  DataSource,
  TeamMember,
  NotificationItem
} from './types';
import {
  INITIAL_PROGRESS,
  INITIAL_KNOWLEDGE_DOCS,
  INITIAL_DATA_SOURCES,
  INITIAL_TEAM_MEMBERS,
  INITIAL_NOTIFICATIONS
} from './data/mockData';
import { LandingPage } from './components/LandingPage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { DemoModal } from './components/DemoModal';
import { LessonModal } from './components/LessonModal';
import { UploadDocModal } from './components/UploadDocModal';
import { InviteModal } from './components/InviteModal';

import { DashboardView } from './views/DashboardView';
import { TrackView } from './views/TrackView';
import { PlaygroundView } from './views/PlaygroundView';
import { KnowledgeView } from './views/KnowledgeView';
import { AnalyticsView } from './views/AnalyticsView';
import { TeamView } from './views/TeamView';

const STORAGE_KEY = 'reshmatex_app_v2';

export default function App() {
  // Load state from localStorage or defaults
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const [progress, setProgress] = useState<Record<'sales' | 'hr' | 'finance', TrackProgress>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_progress');
      return saved ? JSON.parse(saved) : INITIAL_PROGRESS;
    } catch {
      return INITIAL_PROGRESS;
    }
  });

  const [knowledgeDocs, setKnowledgeDocs] = useState<KnowledgeDocument[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_docs');
      return saved ? JSON.parse(saved) : INITIAL_KNOWLEDGE_DOCS;
    } catch {
      return INITIAL_KNOWLEDGE_DOCS;
    }
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_team');
      return saved ? JSON.parse(saved) : INITIAL_TEAM_MEMBERS;
    } catch {
      return INITIAL_TEAM_MEMBERS;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_notifs');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Modal States
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login'
  });
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isUploadDocOpen, setIsUploadDocOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  // Lesson runner modal
  const [activeLessonModal, setActiveLessonModal] = useState<{
    isOpen: boolean;
    module: ModuleItem | null;
    trackName: string;
    trackColor: 'brand' | 'purple' | 'pink';
  }>({
    isOpen: false,
    module: null,
    trackName: 'Sales',
    trackColor: 'brand'
  });

  // Roleplay initial track switch
  const [playgroundTrack, setPlaygroundTrack] = useState<'sales' | 'hr' | 'finance'>('sales');

  // Success toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY + '_user', JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY + '_user');
      }
    } catch {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_progress', JSON.stringify(progress));
      localStorage.setItem(STORAGE_KEY + '_docs', JSON.stringify(knowledgeDocs));
      localStorage.setItem(STORAGE_KEY + '_team', JSON.stringify(teamMembers));
      localStorage.setItem(STORAGE_KEY + '_notifs', JSON.stringify(notifications));
    } catch {}
  }, [progress, knowledgeDocs, teamMembers, notifications]);

  // Auth actions
  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setCurrentView('dashboard');
    showToast(`Welcome back, ${newUser.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('dashboard');
  };

  // Complete a lesson module & award XP
  const handleCompleteLesson = (moduleId: string, xpEarned: number) => {
    setProgress((prev) => {
      const next = { ...prev };
      // Locate which track contains this module
      (['sales', 'hr', 'finance'] as const).forEach((tKey) => {
        const modIndex = next[tKey].modules.findIndex((m) => m.id === moduleId);
        if (modIndex !== -1) {
          const updatedModules = [...next[tKey].modules];
          const curr = updatedModules[modIndex];

          // Mark current as done
          updatedModules[modIndex] = {
            ...curr,
            status: 'done'
          };

          // Unlock next module if it was locked
          if (modIndex + 1 < updatedModules.length && updatedModules[modIndex + 1].status === 'locked') {
            updatedModules[modIndex + 1] = {
              ...updatedModules[modIndex + 1],
              status: 'current'
            };
          }

          const newlyCompleted = updatedModules.filter((m) => m.status === 'done').length;

          next[tKey] = {
            ...next[tKey],
            completed: newlyCompleted,
            xp: next[tKey].xp + xpEarned,
            streak: next[tKey].streak + 1,
            lastLesson: curr.title,
            modules: updatedModules
          };

          showToast(`Lesson Completed! Earned +${xpEarned} XP & Day ${next[tKey].streak} Streak! 🔥`);

          // Add notification
          setNotifications((prevNotifs) => [
            {
              id: 'notif-' + Date.now(),
              title: `Lesson Completed: ${curr.title}`,
              body: `You earned +${xpEarned} XP towards your professional accreditation.`,
              time: 'Just now',
              unread: true,
              type: 'lesson'
            },
            ...prevNotifs
          ]);
        }
      });
      return next;
    });
  };

  const handleAwardXP = (amount: number) => {
    setProgress((prev) => {
      const next = { ...prev };
      next.sales.xp += amount;
      return next;
    });
    showToast(`AI Roleplay Practice: Earned +${amount} XP!`);
  };

  // Add document to knowledge base
  const handleAddDocument = (newDoc: KnowledgeDocument) => {
    setKnowledgeDocs((prev) => [newDoc, ...prev]);
    showToast(`Document "${newDoc.name}" successfully vectorized into RAG.`);
    setNotifications((prev) => [
      {
        id: 'notif-' + Date.now(),
        title: 'New RAG Document Vectorized',
        body: `"${newDoc.name}" is now indexed for AI roleplay prompt grounding.`,
        time: 'Just now',
        unread: true,
        type: 'knowledge'
      },
      ...prev
    ]);
  };

  // Add team member
  const handleAddTeamMember = (newMember: TeamMember) => {
    setTeamMembers((prev) => [newMember, ...prev]);
    showToast(`Invitation sent to ${newMember.email} with ${newMember.track} track allocation.`);
  };

  // Open Lesson Modal
  const openLesson = (module: ModuleItem, trackName: string, trackColor: 'brand' | 'purple' | 'pink') => {
    setActiveLessonModal({
      isOpen: true,
      module,
      trackName,
      trackColor
    });
  };

  // Search quick click
  const handleSelectSearchItem = (type: 'lesson' | 'scenario', trackId: string, id: string) => {
    const tKey = trackId as 'sales' | 'hr' | 'finance';
    const foundModule = progress[tKey]?.modules.find((m) => m.id === id);
    if (foundModule) {
      const colorMap: Record<string, 'brand' | 'purple' | 'pink'> = {
        sales: 'brand',
        hr: 'purple',
        finance: 'pink'
      };
      const nameMap: Record<string, string> = {
        sales: 'Sales',
        hr: 'HR',
        finance: 'Finance'
      };
      openLesson(foundModule, nameMap[trackId], colorMap[trackId]);
    }
  };

  // Render Landing Page if unauthenticated
  if (!user) {
    return (
      <>
        <LandingPage
          onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
          onOpenDemo={() => setIsDemoModalOpen(true)}
        />

        <AuthModal
          isOpen={authModal.isOpen}
          onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
          initialMode={authModal.mode}
          onLogin={handleLogin}
        />

        <DemoModal
          isOpen={isDemoModalOpen}
          onClose={() => setIsDemoModalOpen(false)}
          onStartTrial={() => setAuthModal({ isOpen: true, mode: 'register' })}
        />
      </>
    );
  }

  // Render Logged-in App Shell
  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl border border-slate-800 animate-slide-up flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        user={user}
        onLogout={handleLogout}
        progress={progress}
        onReturnToLanding={() => setUser(null)}
      />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
          notifications={notifications}
          onMarkNotificationsAsRead={() => {
            setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
          }}
          progress={progress}
          onSelectSearchItem={handleSelectSearchItem}
        />

        <main className="flex-1 p-8">
          {currentView === 'dashboard' && (
            <DashboardView
              progress={progress}
              onNavigate={(view) => setCurrentView(view)}
              onOpenLesson={openLesson}
            />
          )}

          {currentView === 'track-sales' && (
            <TrackView
              trackId="sales"
              progress={progress.sales}
              onOpenLesson={openLesson}
              onNavigateToPlayground={(t) => {
                setPlaygroundTrack(t);
                setCurrentView('playground');
              }}
            />
          )}

          {currentView === 'track-hr' && (
            <TrackView
              trackId="hr"
              progress={progress.hr}
              onOpenLesson={openLesson}
              onNavigateToPlayground={(t) => {
                setPlaygroundTrack(t);
                setCurrentView('playground');
              }}
            />
          )}

          {currentView === 'track-finance' && (
            <TrackView
              trackId="finance"
              progress={progress.finance}
              onOpenLesson={openLesson}
              onNavigateToPlayground={(t) => {
                setPlaygroundTrack(t);
                setCurrentView('playground');
              }}
            />
          )}

          {currentView === 'playground' && (
            <PlaygroundView
              initialTrack={playgroundTrack}
              onAwardXP={handleAwardXP}
            />
          )}

          {currentView === 'knowledge' && (
            <KnowledgeView
              documents={knowledgeDocs}
              dataSources={INITIAL_DATA_SOURCES}
              onOpenUpload={() => setIsUploadDocOpen(true)}
            />
          )}

          {currentView === 'analytics' && <AnalyticsView />}

          {currentView === 'team' && (
            <TeamView
              teamMembers={teamMembers}
              onOpenInvite={() => setIsInviteOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <LessonModal
        module={activeLessonModal.module}
        trackName={activeLessonModal.trackName}
        trackColor={activeLessonModal.trackColor}
        isOpen={activeLessonModal.isOpen}
        onClose={() => setActiveLessonModal((prev) => ({ ...prev, isOpen: false }))}
        onComplete={handleCompleteLesson}
      />

      <UploadDocModal
        isOpen={isUploadDocOpen}
        onClose={() => setIsUploadDocOpen(false)}
        onAddDocument={handleAddDocument}
      />

      <InviteModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        onAddMember={handleAddTeamMember}
      />

      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onStartTrial={() => {
          setIsDemoModalOpen(false);
          // Auto create session as a demo persona if trial clicked from inside demo
          handleLogin({
            id: 'usr-demo',
            name: 'Jane Cooper',
            email: 'jane.cooper@northwind.com',
            company: 'Northwind Enterprise',
            role: 'VP of Global Revenue',
            avatarInitials: 'JC',
            createdAt: new Date().toISOString()
          });
        }}
      />
    </div>
  );
}
