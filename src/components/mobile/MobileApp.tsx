import React, { useState } from 'react';
import { MODULES_DATA, BADGES_DATA } from '../../data/learningContent';
import { Module, UserProfile, Lesson, Quiz } from '../../types';
import { PasswordTool } from '../tools/PasswordTool';
import { PhishingSimulator } from '../tools/PhishingSimulator';
import { SosCenter } from '../sos/SosCenter';
import { ChatbotConectaSegura } from '../chat/ChatbotConectaSegura';
import { QuizView } from '../learning/QuizView';
import { LessonReader } from '../learning/LessonReader';
import { ProfileView } from '../profile/ProfileView';
import {
  Home,
  BookOpen,
  Wrench,
  MessageCircle,
  User,
  Shield,
  Siren,
  Sparkles,
  ChevronRight,
  CheckCircle,
  Lock,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';

interface Props {
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onEarnPoints: (points: number) => void;
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
}

export const MobileApp: React.FC<Props> = ({
  profile,
  onUpdateProfile,
  onEarnPoints,
  isPhoneFrame,
  onTogglePhoneFrame,
}) => {
  const [currentTab, setCurrentTab] = useState<'home' | 'modules' | 'tools' | 'chat' | 'profile'>('home');
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [showSosModal, setShowSosModal] = useState(false);
  const [activeTool, setActiveTool] = useState<'password' | 'phishing'>('password');

  // Handle lesson completion
  const handleCompleteLesson = (lessonId: string) => {
    if (!profile.completedLessons.includes(lessonId)) {
      const updatedLessons = [...profile.completedLessons, lessonId];
      onEarnPoints(20);
      onUpdateProfile({ completedLessons: updatedLessons });
    }
  };

  // Handle quiz completion
  const handleCompleteQuiz = (quizId: string, score: number, maxScore: number) => {
    const updatedQuizzes = { ...profile.completedQuizzes, [quizId]: score };
    const earned = score * 30;
    onEarnPoints(earned);

    // Check badges
    const newBadges = [...profile.unlockedBadges];
    if (score >= Math.ceil(maxScore * 0.7) && !newBadges.includes('badge-2')) {
      newBadges.push('badge-2');
    }
    if (profile.points + earned >= 600 && !newBadges.includes('badge-5')) {
      newBadges.push('badge-5');
    }

    onUpdateProfile({
      completedQuizzes: updatedQuizzes,
      unlockedBadges: newBadges,
    });
  };

  const totalLessonsCount = MODULES_DATA.reduce((acc, m) => acc + m.lessons.length, 0);
  const overallProgressPercentage = Math.min(
    100,
    Math.round((profile.completedLessons.length / totalLessonsCount) * 100)
  );

  return (
    <div className={`transition-all mx-auto ${isPhoneFrame ? 'max-w-md' : 'max-w-4xl'}`}>
      {/* Smartphone Outer Shell Container */}
      <div
        className={`relative bg-slate-900 overflow-hidden ${
          isPhoneFrame
            ? 'rounded-[44px] border-[10px] border-slate-800 shadow-2xl ring-1 ring-slate-700/50 my-4'
            : 'rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm'
        }`}
      >
        {/* Smartphone Notch & Status Bar (Only in Phone Frame) */}
        {isPhoneFrame && (
          <div className="bg-slate-900 px-6 pt-3 pb-2 flex items-center justify-between text-white text-[11px] select-none">
            <span className="font-semibold">9:41</span>
            {/* Dynamic Island / Notch */}
            <div className="w-24 h-4 bg-black rounded-full mx-auto" />
            <div className="flex items-center gap-1.5 text-xs">
              <span>5G</span>
              <div className="w-4 h-2 border border-white rounded-xs p-0.5">
                <div className="w-full h-full bg-white rounded-xs" />
              </div>
            </div>
          </div>
        )}

        {/* Top App Header */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-white shadow-inner">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-tight leading-none">
                Mujeres Conectadas
              </h1>
              <span className="text-[10px] text-purple-200 font-medium">
                Seguridad & Marketing Digital
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct SOS Button in Header */}
            <button
              onClick={() => setShowSosModal(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-all active:scale-95 animate-pulse"
              title="Abrir botón SOS de emergencia"
            >
              <Siren className="w-3.5 h-3.5" />
              <span>SOS</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-4 sm:p-5 min-h-[580px] max-h-[720px] overflow-y-auto bg-slate-50 dark:bg-slate-950">
          {/* Active Lesson Modal / Screen */}
          {activeLesson ? (
            <LessonReader
              lesson={activeLesson}
              isCompleted={profile.completedLessons.includes(activeLesson.id)}
              onComplete={() => handleCompleteLesson(activeLesson.id)}
              onBack={() => setActiveLesson(null)}
            />
          ) : activeQuiz ? (
            /* Active Quiz Screen */
            <QuizView
              quiz={activeQuiz}
              onComplete={(score, max) => handleCompleteQuiz(activeQuiz.id, score, max)}
              onClose={() => setActiveQuiz(null)}
            />
          ) : (
            <>
              {/* TAB 1: INICIO */}
              {currentTab === 'home' && (
                <div className="space-y-5">
                  {/* Entrepreneur Welcome Card */}
                  <div className="bg-gradient-to-br from-purple-700 via-indigo-700 to-pink-600 text-white rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-semibold text-purple-200">
                          Bienvenida de nuevo,
                        </span>
                        <h2 className="text-lg font-bold">{profile.name}</h2>
                        <p className="text-xs text-purple-100 flex items-center gap-1 mt-0.5">
                          {profile.businessName} • Nivel{' '}
                          <span className="underline decoration-purple-300 font-semibold">
                            {profile.securityLevel}
                          </span>
                        </p>
                      </div>

                      <div className="bg-white/10 rounded-xl px-2.5 py-1.5 text-center backdrop-blur-xs">
                        <span className="block font-mono font-extrabold text-sm">{profile.points}</span>
                        <span className="text-[9px] uppercase tracking-wider text-purple-200">Puntos</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[11px] text-purple-200">
                        <span>Progreso General del Curso:</span>
                        <span className="font-bold">{overallProgressPercentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                          style={{ width: `${overallProgressPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quick SOS Red Alert Banner */}
                  <div
                    onClick={() => setShowSosModal(true)}
                    className="cursor-pointer bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl p-3.5 shadow-sm flex items-center justify-between hover:shadow-md transition-all active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-white/20 rounded-xl">
                        <Siren className="w-5 h-5 text-white animate-bounce" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm">¿Sientes una amenaza digital?</h4>
                        <p className="text-[11px] text-rose-100">
                          Presiona aquí para ver el protocolo SOS y líneas de auxilio
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-rose-200 shrink-0" />
                  </div>

                  {/* Tip of the day */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase tracking-wider">
                      <Lightbulb className="w-4 h-4" />
                      Tip Clave para Emprendedoras
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      "Nunca envíes productos únicamente con el pantallazo de transferencia de Nequi o Daviplata. Entra a tu app oficial y confirma que el saldo real aumentó. ¡Los comprobantes digitales se falsifican en 10 segundos!"
                    </p>
                  </div>

                  {/* Modules Quick Access */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Módulos de Aprendizaje
                      </h3>
                      <button
                        onClick={() => setCurrentTab('modules')}
                        className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                      >
                        Ver todos
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      {MODULES_DATA.slice(0, 2).map((mod) => (
                        <div
                          key={mod.id}
                          onClick={() => {
                            setActiveModule(mod);
                            setCurrentTab('modules');
                          }}
                          className="cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-2xs hover:border-purple-300 dark:hover:border-purple-700 transition-all flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-xs">
                              {mod.number}
                            </div>
                            <div>
                              <h4 className="font-semibold text-xs text-slate-900 dark:text-white">
                                {mod.title}
                              </h4>
                              <p className="text-[11px] text-slate-500">
                                {mod.lessons.length} lecciones • Cuestionario interactivo
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Quick Tools Banner */}
                  <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-3">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Herramientas Prácticas Disponibles
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => {
                          setActiveTool('password');
                          setCurrentTab('tools');
                        }}
                        className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-left hover:border-purple-400 transition-all"
                      >
                        <Lock className="w-4 h-4 text-purple-600 mb-1" />
                        <span className="block text-xs font-bold text-slate-800 dark:text-white">
                          Verificador Claves
                        </span>
                        <span className="text-[10px] text-slate-500">Evalúa tu contraseña</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTool('phishing');
                          setCurrentTab('tools');
                        }}
                        className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-left hover:border-purple-400 transition-all"
                      >
                        <Shield className="w-4 h-4 text-pink-600 mb-1" />
                        <span className="block text-xs font-bold text-slate-800 dark:text-white">
                          Detector Estafas
                        </span>
                        <span className="text-[10px] text-slate-500">Simulador de casos</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MODULOS */}
              {currentTab === 'modules' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                        Módulos de Ciberseguridad & Marketing
                      </h3>
                      <p className="text-xs text-slate-500">
                        Capacitación integral para proteger tu negocio
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {MODULES_DATA.map((mod) => (
                      <div
                        key={mod.id}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <span className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                              {mod.number}
                            </span>
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                                {mod.category}
                              </span>
                              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                                {mod.title}
                              </h4>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          {mod.description}
                        </p>

                        {/* Lessons List */}
                        <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
                          <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                            Lecciones del módulo:
                          </span>
                          {mod.lessons.map((lesson) => {
                            const isDone = profile.completedLessons.includes(lesson.id);
                            return (
                              <button
                                key={lesson.id}
                                onClick={() => setActiveLesson(lesson)}
                                className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-purple-50 dark:hover:bg-purple-950/20 text-left flex items-center justify-between text-xs transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  {isDone ? (
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                  ) : (
                                    <span className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-slate-600 shrink-0" />
                                  )}
                                  <span className={`font-medium ${isDone ? 'text-slate-400 line-through' : 'text-slate-800 dark:text-slate-200'}`}>
                                    {lesson.title}
                                  </span>
                                </div>
                                <span className="text-[10px] text-slate-400">{lesson.duration}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Quiz Trigger Button */}
                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={() => setActiveQuiz(mod.quiz)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-95"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            {profile.completedQuizzes[mod.quiz.id] !== undefined
                              ? `Repetir Cuestionario (Nota: ${profile.completedQuizzes[mod.quiz.id]}/${mod.quiz.questions.length})`
                              : 'Realizar Cuestionario (+90 pts)'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: HERRAMIENTAS */}
              {currentTab === 'tools' && (
                <div className="space-y-4">
                  <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <button
                      onClick={() => setActiveTool('password')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                        activeTool === 'password'
                          ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-2xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Comprobador de Claves
                    </button>
                    <button
                      onClick={() => setActiveTool('phishing')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                        activeTool === 'phishing'
                          ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-2xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Detector de Estafas
                    </button>
                  </div>

                  {activeTool === 'password' ? (
                    <PasswordTool onEarnPoints={onEarnPoints} />
                  ) : (
                    <PhishingSimulator onEarnPoints={onEarnPoints} />
                  )}
                </div>
              )}

              {/* TAB 4: CHATBOT */}
              {currentTab === 'chat' && (
                <div className="space-y-3">
                  <ChatbotConectaSegura userName={profile.name} onEarnPoints={onEarnPoints} />
                </div>
              )}

              {/* TAB 5: PERFIL */}
              {currentTab === 'profile' && (
                <ProfileView profile={profile} onUpdateProfile={onUpdateProfile} />
              )}
            </>
          )}
        </div>

        {/* Bottom Navigation Bar */}
        <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-2 py-2 flex items-center justify-around shrink-0 select-none">
          {[
            { id: 'home', label: 'Inicio', icon: Home },
            { id: 'modules', label: 'Módulos', icon: BookOpen },
            { id: 'tools', label: 'Herramientas', icon: Wrench },
            { id: 'chat', label: 'ConectaSegura', icon: MessageCircle },
            { id: 'profile', label: 'Mi Perfil', icon: User },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id && !activeLesson && !activeQuiz;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveLesson(null);
                  setActiveQuiz(null);
                  setCurrentTab(item.id as any);
                }}
                className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
                  isActive
                    ? 'text-purple-600 dark:text-purple-400 font-bold scale-105'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-xs'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SOS Modal Dialog */}
      {showSosModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto border border-red-500/30">
            <SosCenter
              onClose={() => setShowSosModal(false)}
              userName={profile.name}
              businessName={profile.businessName}
            />
          </div>
        </div>
      )}
    </div>
  );
};
