// Types for Mujeres Conectadas, Seguras Application & UNAD Scrum Project

export interface UserProfile {
  name: string;
  businessName: string;
  businessType: string;
  email: string;
  phone: string;
  securityLevel: 'Básico' | 'Intermedio' | 'Avanzado' | 'Blindado';
  completedLessons: string[];
  completedQuizzes: { [quizId: string]: number };
  unlockedBadges: string[];
  points: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  scenario?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  summary: string;
  content: string[];
  tips: string[];
  alertWarning?: string;
}

export interface Module {
  id: string;
  number: number;
  title: string;
  description: string;
  iconName: string;
  category: 'Ciberseguridad' | 'Protección de Datos' | 'Marketing Seguro' | 'Gestión de Contraseñas';
  lessons: Lesson[];
  quiz: Quiz;
  color: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  requiredPoints: number;
}

export interface PhishingScenario {
  id: string;
  channel: 'WhatsApp' | 'SMS' | 'Correo' | 'Nequi/Daviplata' | 'Llamada';
  sender: string;
  title: string;
  previewMessage: string;
  details: string;
  isScam: boolean;
  warningSigns: string[];
  safeAction: string;
  difficulty: 'Fácil' | 'Media' | 'Avanzada';
}

export interface EmergencyContact {
  name: string;
  entity: string;
  phone: string;
  website: string;
  description: string;
  serviceHours: string;
  category: 'Policía' | 'Fiscalía' | 'Apoyo Mujer' | 'Comercio/Datos';
  badge: string;
}

export interface EmergencyGuide {
  id: string;
  title: string;
  threatType: string;
  severity: 'Urgente' | 'Alta' | 'Media';
  immediateSteps: string[];
  evidencePreservation: string[];
  legalRoute: string;
}

// Scrum Management Types (UNAD Anexo 3)
export interface BacklogItem {
  id: string;
  code: string; // HU01, HU02...
  title: string;
  userRole: string;
  requirement: string;
  uatCriteria: string;
  priority: 'Alta' | 'Media' | 'Baja' | 'Must' | 'Should';
  storyPoints: number;
  sprint: number;
  status: 'Pendiente' | 'En Progreso' | 'En Revisión' | 'Terminado';
  assignee: string;
}

export interface ScrumStakeholder {
  id: string;
  name: string;
  role: string;
  type: 'CORE' | 'NO CORE';
  roleDescription: string;
  personDescription: string;
  email: string;
  phone?: string;
}

export interface ImpedimentItem {
  id: number;
  sprint: number;
  reportDate: string;
  type: string;
  description: string;
  correctiveActions: string;
  responsible: string;
  status: 'Atendido' | 'En proceso' | 'En análisis';
}

export interface BurndownDataPoint {
  day: number;
  planned: number;
  actual: number;
  notes?: string;
}
