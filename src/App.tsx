import React, { useState } from 'react';
import { UserProfile } from './types';
import { Navbar } from './components/layout/Navbar';
import { MobileApp } from './components/mobile/MobileApp';
import { ScrumDashboard } from './components/scrum/ScrumDashboard';
import { SosCenter } from './components/sos/SosCenter';

export default function App() {
  const [activeView, setActiveView] = useState<'mobile' | 'scrum'>('mobile');
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);
  const [showGlobalSos, setShowGlobalSos] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    name: 'Camila Restrepo',
    businessName: 'Artesanías & Moda Andina',
    businessType: 'Moda y Calzado',
    email: 'contacto@artesaniasandina.co',
    phone: '+57 311 548 9201',
    securityLevel: 'Intermedio',
    completedLessons: ['l1-1'],
    completedQuizzes: { 'quiz-1': 3 },
    unlockedBadges: ['badge-1', 'badge-2'],
    points: 210,
  });

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updated };
      // Recalculate security level
      if (next.points >= 700) {
        next.securityLevel = 'Blindado';
      } else if (next.points >= 400) {
        next.securityLevel = 'Avanzado';
      } else if (next.points >= 150) {
        next.securityLevel = 'Intermedio';
      } else {
        next.securityLevel = 'Básico';
      }
      return next;
    });
  };

  const handleEarnPoints = (additionalPoints: number) => {
    setProfile((prev) => {
      const newPoints = prev.points + additionalPoints;
      let newLevel = prev.securityLevel;
      if (newPoints >= 700) newLevel = 'Blindado';
      else if (newPoints >= 400) newLevel = 'Avanzado';
      else if (newPoints >= 150) newLevel = 'Intermedio';

      return {
        ...prev,
        points: newPoints,
        securityLevel: newLevel,
      };
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      {/* Top Universal Navbar */}
      <Navbar
        activeView={activeView}
        onSelectView={setActiveView}
        isPhoneFrame={isPhoneFrame}
        onTogglePhoneFrame={() => setIsPhoneFrame(!isPhoneFrame)}
        onOpenSos={() => setShowGlobalSos(true)}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 py-4 sm:py-6 px-2 sm:px-4">
        {activeView === 'mobile' ? (
          <MobileApp
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onEarnPoints={handleEarnPoints}
            isPhoneFrame={isPhoneFrame}
            onTogglePhoneFrame={() => setIsPhoneFrame(!isPhoneFrame)}
          />
        ) : (
          <ScrumDashboard />
        )}
      </main>

      {/* Global SOS Emergency Modal */}
      {showGlobalSos && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto border border-red-500/40">
            <SosCenter
              onClose={() => setShowGlobalSos(false)}
              userName={profile.name}
              businessName={profile.businessName}
            />
          </div>
        </div>
      )}

      {/* Subtle Footer with Academic Attribution */}
      <footer className="py-3 px-4 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
        <p>
          <strong>Mujeres Conectadas, Seguras</strong> • Proyecto de Ingeniería II — Fase 3: Gestión del Proyecto • UNAD Grupo 202337121_212
        </p>
      </footer>
    </div>
  );
}
