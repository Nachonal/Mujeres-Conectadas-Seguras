import React from 'react';
import { Lesson } from '../../types';
import { ArrowLeft, CheckCircle2, Clock, Lightbulb, AlertTriangle, ShieldCheck } from 'lucide-react';

interface Props {
  lesson: Lesson;
  isCompleted: boolean;
  onComplete: () => void;
  onBack: () => void;
}

export const LessonReader: React.FC<Props> = ({ lesson, isCompleted, onComplete, onBack }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
      {/* Top navigation */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a las lecciones
        </button>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span>{lesson.duration} de lectura</span>
        </div>
      </div>

      {/* Lesson Title & Summary */}
      <div className="space-y-2">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight">
          {lesson.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 bg-purple-50/60 dark:bg-purple-950/20 p-3.5 rounded-xl border border-purple-100 dark:border-purple-900/30">
          💡 <strong>En resumen:</strong> {lesson.summary}
        </p>
      </div>

      {/* Main Content Paragraphs */}
      <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        {lesson.content.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {/* Alert Warning if any */}
      {lesson.alertWarning && (
        <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-red-900 dark:text-red-200">
            <strong className="font-semibold block mb-0.5">Alerta Crítica:</strong>
            {lesson.alertWarning}
          </div>
        </div>
      )}

      {/* Actionable Tips */}
      {lesson.tips && lesson.tips.length > 0 && (
        <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl space-y-2.5">
          <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-emerald-600" />
            Recomendaciones Prácticas Inmediatas:
          </h4>
          <ul className="space-y-1.5 text-xs text-emerald-950 dark:text-emerald-100">
            {lesson.tips.map((tip, tIdx) => (
              <li key={tIdx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Mark Completed Button */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-purple-500" />
          Capacitación Mujeres Conectadas, Seguras
        </span>

        <button
          onClick={onComplete}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-95 ${
            isCompleted
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          {isCompleted ? '¡Lección Completada! (+20 pts)' : 'Marcar como Completada (+20 pts)'}
        </button>
      </div>
    </div>
  );
};
