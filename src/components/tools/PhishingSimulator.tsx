import React, { useState } from 'react';
import { PHISHING_SCENARIOS } from '../../data/learningContent';
import { PhishingScenario } from '../../types';
import { AlertCircle, CheckCircle2, XCircle, ArrowRight, RotateCcw, ShieldAlert, Smartphone, Mail, Phone, MessageSquare } from 'lucide-react';

interface Props {
  onEarnPoints?: (points: number) => void;
}

export const PhishingSimulator: React.FC<Props> = ({ onEarnPoints }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userSelection, setUserSelection] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const scenario: PhishingScenario = PHISHING_SCENARIOS[currentIndex];

  const handleAnswer = (isScamSelected: boolean) => {
    setUserSelection(isScamSelected);
    setShowFeedback(true);
    const isCorrect = isScamSelected === scenario.isScam;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      if (onEarnPoints) {
        onEarnPoints(25);
      }
    }
  };

  const handleNext = () => {
    setUserSelection(null);
    setShowFeedback(false);
    if (currentIndex + 1 < PHISHING_SCENARIOS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserSelection(null);
    setShowFeedback(false);
    setScore(0);
    setFinished(false);
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'WhatsApp':
        return <MessageSquare className="w-4 h-4 text-emerald-500" />;
      case 'SMS':
        return <Smartphone className="w-4 h-4 text-blue-500" />;
      case 'Correo':
        return <Mail className="w-4 h-4 text-indigo-500" />;
      case 'Llamada':
        return <Phone className="w-4 h-4 text-amber-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-purple-500" />;
    }
  };

  if (finished) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center space-y-5">
        <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            ¡Entrenamiento de Detección Finalizado!
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Obtuviste <strong className="text-purple-600 dark:text-purple-400 font-bold">{score}</strong> de {PHISHING_SCENARIOS.length} casos identificados correctamente.
          </p>
        </div>

        <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl text-xs text-purple-900 dark:text-purple-200 text-left space-y-1.5 border border-purple-200 dark:border-purple-800">
          <p className="font-semibold">💡 Recuerda siempre las 3 reglas de oro ante mensajes sospechosos:</p>
          <p>1. Ningún banco ni cliente legítimo te pedirá códigos de 6 dígitos que lleguen a tu SMS.</p>
          <p>2. Revisa siempre los saldos directamente en tu app oficial antes de entregar productos.</p>
          <p>3. Desconfía de la urgencia fingida y de enlaces con dominios extraños (.cc, .online, etc.).</p>
        </div>

        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm rounded-xl shadow-sm transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          Repetir Simulador
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Progress header */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>Caso {currentIndex + 1} de {PHISHING_SCENARIOS.length}</span>
        <span className="font-medium text-purple-600 dark:text-purple-400">
          Puntaje actual: {score} aciertos
        </span>
      </div>

      {/* Simulated Screen / Message Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-700 space-y-4">
        {/* Fake message header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            {getChannelIcon(scenario.channel)}
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Canal: {scenario.channel}
            </span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
            Dificultad: {scenario.difficulty}
          </span>
        </div>

        <div>
          <div className="text-xs text-slate-400">Remitente: <span className="text-slate-200 font-mono">{scenario.sender}</span></div>
          <h4 className="text-sm font-semibold text-white mt-1">{scenario.title}</h4>
        </div>

        {/* Message bubble */}
        <div className="bg-slate-800/90 rounded-xl p-3.5 border border-slate-700/80 text-sm leading-relaxed text-slate-100 font-sans">
          "{scenario.previewMessage}"
        </div>

        <p className="text-xs text-slate-400 italic">
          Contexto: {scenario.details}
        </p>
      </div>

      {/* Decision Buttons */}
      {!showFeedback ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => handleAnswer(true)}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-red-500 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 font-semibold text-sm transition-all active:scale-95"
          >
            <ShieldAlert className="w-4 h-4" />
            ¡Es una Estafa / Fraude!
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold text-sm transition-all active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            Es un Mensaje Legítimo
          </button>
        </div>
      ) : (
        /* Feedback Box */
        <div className="space-y-4">
          <div
            className={`p-4 rounded-2xl border ${
              userSelection === scenario.isScam
                ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                : 'bg-red-50 dark:bg-red-950/20 border-red-300 dark:border-red-800'
            }`}
          >
            <div className="flex items-start gap-3">
              {userSelection === scenario.isScam ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-2 text-xs sm:text-sm">
                <p className="font-bold text-slate-900 dark:text-white">
                  {userSelection === scenario.isScam
                    ? '¡Excelente reflejo! Identificaste correctamente la situación.'
                    : '¡Cuidado! Este mensaje representa un riesgo latente de fraude.'}
                </p>

                <div className="space-y-1 text-slate-700 dark:text-slate-300">
                  <p className="font-semibold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Señales de alerta detectadas:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    {scenario.warningSigns.map((sign, idx) => (
                      <li key={idx}>{sign}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-1 text-xs text-purple-700 dark:text-purple-300 font-medium">
                  <strong>Acción segura recomendada:</strong> {scenario.safeAction}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm"
            >
              <span>{currentIndex + 1 === PHISHING_SCENARIOS.length ? 'Ver Resultados' : 'Siguiente Caso'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
