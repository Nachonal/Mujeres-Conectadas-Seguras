import React from 'react';
import { Shield, Smartphone, Monitor, BookOpen, Siren, Layers, Award } from 'lucide-react';

interface Props {
  activeView: 'mobile' | 'scrum';
  onSelectView: (view: 'mobile' | 'scrum') => void;
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
  onOpenSos: () => void;
}

export const Navbar: React.FC<Props> = ({
  activeView,
  onSelectView,
  isPhoneFrame,
  onTogglePhoneFrame,
  onOpenSos,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Logo and Project Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-600 text-white flex items-center justify-center shadow-sm shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight">
                Mujeres Conectadas, Seguras
              </span>
              <span className="hidden sm:inline px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[10px] font-bold">
                UNAD 2026
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              Seguridad Digital & Marketing para Emprendedoras • Grupo 202337121_212
            </p>
          </div>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile vs Scrum Switcher */}
          <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center gap-1">
            <button
              onClick={() => onSelectView('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeView === 'mobile'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>App Móvil</span>
            </button>

            <button
              onClick={() => onSelectView('scrum')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeView === 'scrum'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Gestión Scrum</span>
            </button>
          </div>

          {/* Toggle Phone Frame (Only visible when activeView is mobile) */}
          {activeView === 'mobile' && (
            <button
              onClick={onTogglePhoneFrame}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              title={isPhoneFrame ? 'Cambiar a vista expandida' : 'Cambiar a marco de celular'}
            >
              {isPhoneFrame ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
              <span className="text-[11px] font-medium">
                {isPhoneFrame ? 'Vista Expandida' : 'Marco Celular'}
              </span>
            </button>
          )}

          {/* Quick SOS Shortcut */}
          <button
            onClick={onOpenSos}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-all active:scale-95 animate-pulse"
          >
            <Siren className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">SOS</span>
          </button>
        </div>
      </div>
    </header>
  );
};
