export type TrackId = 'sales' | 'hr' | 'finance';

export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  avatarInitials: string;
  createdAt: string;
}

export interface LessonContent {
  overview: string;
  keyPoints: string[];
  practicalExercise: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  promptTemplate?: string;
  xpReward: number;
}

export interface ModuleItem {
  id: string;
  title: string;
  duration: string;
  type: 'Video' | 'Interactive' | 'Lab' | 'AI Roleplay' | 'Case study' | 'Exam';
  status: 'done' | 'current' | 'locked';
  content: LessonContent;
}

export interface TrackProgress {
  completed: number;
  total: number;
  xp: number;
  streak: number;
  lastLesson: string;
  modules: ModuleItem[];
}

export interface RoleplayMessage {
  id: string;
  role: 'assistant' | 'user' | 'system';
  content: string;
  timestamp: string;
  isSystem?: boolean;
  coachingFeedback?: {
    clarityScore: number;
    empathyScore: number;
    tacticalTip: string;
  };
}

export interface Scenario {
  id: string;
  title: string;
  role: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  initialPrompt: string;
  firstMessage: string;
  context: string;
  learningGoal: string;
  suggestedResponses: string[];
}

export interface KnowledgeDocument {
  id: string;
  name: string;
  source: 'Google Drive' | 'Microsoft 365' | 'Salesforce' | 'Manual Upload';
  size: string;
  track: 'Sales' | 'HR' | 'Finance' | 'General';
  indexedAt: string;
  status: 'Ready' | 'Processing';
  summary: string;
  chunksCount: number;
}

export interface DataSource {
  id: string;
  name: string;
  status: 'Connected' | 'Available' | 'Syncing';
  docsCount: number;
  lastUpdated: string;
  iconType: 'drive' | 'm365' | 'salesforce' | 'notion' | 'slack';
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  track: 'Sales' | 'HR' | 'Finance';
  progress: number;
  xp: number;
  status: 'active' | 'away';
  joinedDate: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  type: 'lesson' | 'milestone' | 'knowledge' | 'system';
}

export type ViewType =
  | 'dashboard'
  | 'track-sales'
  | 'track-hr'
  | 'track-finance'
  | 'playground'
  | 'knowledge'
  | 'analytics'
  | 'team';
