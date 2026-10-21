import React, { useState } from 'react';
import { Quiz } from '../../types';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Award, Sparkles, HelpCircle } from 'lucide-react';

interface Props {
  quiz: Quiz;
  onComplete: (score: number, maxScore: number) => void;
  onClose: () => void;
}

export const QuizView: React.FC<Props> = ({ quiz, onComplete, onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQ = quiz.questions[currentQuestionIndex];
  const isCorrect = selectedOption === currentQ.correctAnswer;

  const handleSelectOption = (index: number) => {
    if (showExplanation) return;
    setSelectedOption(index);
    setShowExplanation(true);
    if (index === currentQ.correctAnswer) {
      setCorrectAnswersCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    if (currentQuestionIndex + 1 < quiz.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setFinished(true);
      onComplete(correctAnswersCount + (isCorrect ? 1 : 0), quiz.questions.length);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setCorrectAnswersCount(0);
    setFinished(false);
  };

  if (finished) {
    const passed = correctAnswersCount >= Math.ceil(quiz.questions.length * 0.65);
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center space-y-5">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto text-white shadow-md ${
            passed ? 'bg-gradient-to-tr from-emerald-500 to-teal-500' : 'bg-gradient-to-tr from-amber-500 to-orange-500'
          }`}
        >
          {passed ? <Award className="w-8 h-8" /> : <RotateCcw className="w-8 h-8" />}
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {passed ? '¡Felicitaciones! Cuestionario Superado' : '¡Buen intento! Repasemos para mejorar'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Acertaste <strong className="text-purple-600 dark:text-purple-400 font-bold">{correctAnswersCount}</strong> de {quiz.questions.length} preguntas ({Math.round((correctAnswersCount / quiz.questions.length) * 100)}%).
          </p>
        </div>

        <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl text-xs text-purple-900 dark:text-purple-200 border border-purple-200 dark:border-purple-800 text-left">
          <p className="font-semibold flex items-center gap-1.5 mb-1">
            <Sparkles className="w-4 h-4 text-purple-600" />
            Progreso Registrado en tu Perfil:
          </p>
          <p>
            Has ganado <strong>{correctAnswersCount * 30} Puntos de Ciberseguridad</strong> que contribuyen a tus medallas y nivel de protección.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {!passed && (
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors"
            >
              Intentar de nuevo
            </button>
          )}
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm"
          >
            Volver a los Módulos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-5">
      {/* Quiz Progress header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            {quiz.title}
          </span>
          <h4 className="text-sm font-semibold text-slate-800 dark:text-white">
            Pregunta {currentQuestionIndex + 1} de {quiz.questions.length}
          </h4>
        </div>
        <button
          onClick={onClose}
          className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          Cerrar
        </button>
      </div>

      {/* Question prompt */}
      <div className="space-y-3">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 mt-0.5 shrink-0">
            <HelpCircle className="w-4 h-4" />
          </div>
          <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white leading-relaxed">
            {currentQ.question}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-2 pt-2">
          {currentQ.options.map((option, idx) => {
            let optionStyles = 'border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300';

            if (showExplanation) {
              if (idx === currentQ.correctAnswer) {
                optionStyles = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200 font-medium';
              } else if (idx === selectedOption) {
                optionStyles = 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-200 line-through';
              } else {
                optionStyles = 'opacity-40 border-slate-200 dark:border-slate-800';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={showExplanation}
                className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyles}`}
              >
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 text-[11px] font-bold">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 leading-relaxed">{option}</span>
                {showExplanation && idx === currentQ.correctAnswer && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                )}
                {showExplanation && idx === selectedOption && idx !== currentQ.correctAnswer && (
                  <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation Box */}
      {showExplanation && (
        <div
          className={`p-4 rounded-xl border space-y-2 text-xs sm:text-sm ${
            isCorrect
              ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              : 'bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
          }`}
        >
          <div className="flex items-center gap-1.5 font-bold">
            {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-amber-600" />}
            <span>{isCorrect ? '¡Respuesta Correcta!' : 'Explicación Formativa:'}</span>
          </div>
          <p className="leading-relaxed">{currentQ.explanation}</p>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
            >
              <span>{currentQuestionIndex + 1 === quiz.questions.length ? 'Finalizar Cuestionario' : 'Siguiente Pregunta'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
