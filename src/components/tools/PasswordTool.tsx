import React, { useState } from 'react';
import { CheckCircle2, XCircle, Copy, Check, Sparkles, Shield, AlertTriangle, RefreshCw, Eye, EyeOff } from 'lucide-react';

interface Props {
  onEarnPoints?: (points: number) => void;
}

export const PasswordTool: React.FC<Props> = ({ onEarnPoints }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedPass, setGeneratedPass] = useState('');
  const [genCopied, setGenCopied] = useState(false);

  // Criteria calculations
  const hasLength = password.length >= 12;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const hasObviousWords = /123|password|clave|admin|tienda|negocio|colombia|2024|2025|2026/i.test(password);

  const criteriaPassed = [hasLength, hasUpper, hasLower, hasNumber, hasSymbol, !hasObviousWords].filter(Boolean).length;

  let strengthLabel = 'Muy Débil';
  let strengthColor = 'bg-red-500';
  let strengthTextColor = 'text-red-600 dark:text-red-400';
  let percentage = 15;

  if (password.length === 0) {
    strengthLabel = 'Sin evaluar';
    strengthColor = 'bg-slate-300';
    percentage = 0;
  } else if (criteriaPassed <= 2) {
    strengthLabel = 'Débil (Vulnerable)';
    strengthColor = 'bg-red-500';
    strengthTextColor = 'text-red-500';
    percentage = 30;
  } else if (criteriaPassed <= 4) {
    strengthLabel = 'Moderada (Aceptable)';
    strengthColor = 'bg-amber-500';
    strengthTextColor = 'text-amber-500';
    percentage = 65;
  } else {
    strengthLabel = 'Blindada (Excelente)';
    strengthColor = 'bg-emerald-500';
    strengthTextColor = 'text-emerald-500';
    percentage = 100;
  }

  const handleCopy = (text: string, isGen: boolean = false) => {
    navigator.clipboard.writeText(text);
    if (isGen) {
      setGenCopied(true);
      setTimeout(() => setGenCopied(false), 2000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const generatePassphrase = () => {
    const words = [
      'Café', 'Orquídea', 'Colibrí', 'Esmeralda', 'Tejido', 'Cacao', 'Montaña', 'Brisa',
      'Artesana', 'Semilla', 'Estrella', 'Palma', 'Canela', 'Valiente', 'Victoria', 'Voz'
    ];
    const symbols = ['#', '$', '!', '&', '@', '%', '?'];
    const randomWord1 = words[Math.floor(Math.random() * words.length)];
    const randomWord2 = words[Math.floor(Math.random() * words.length)];
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    const randomNum = Math.floor(100 + Math.random() * 900);
    const result = `${randomWord1}${randomSymbol}${randomWord2}${randomNum}!`;
    setGeneratedPass(result);
    if (onEarnPoints) {
      onEarnPoints(15);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header info */}
      <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 border border-purple-200 dark:border-purple-800/40 rounded-2xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-purple-600 text-white rounded-xl shadow-sm shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              Verificador & Creador de Contraseñas Blindadas
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              Comprueba la resistencia de tus claves comerciales frente a ataques automatizados y genera contraseñas seguras fáciles de recordar.
            </p>
          </div>
        </div>
      </div>

      {/* Real-time analyzer */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Escribe una contraseña para evaluarla (no se guardará ni enviará a ningún servidor):
        </label>
        
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ejemplo: MiNegocio#2026!"
            className="w-full px-4 py-3 pr-24 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-mono text-sm"
          />
          <div className="absolute right-2 top-2 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              title={showPassword ? 'Ocultar' : 'Mostrar'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            {password && (
              <button
                type="button"
                onClick={() => handleCopy(password)}
                className="p-1.5 text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                title="Copiar"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Strength Progress */}
        {password.length > 0 && (
          <div className="space-y-2 pt-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-slate-600 dark:text-slate-300">Nivel de Fortaleza:</span>
              <span className={`font-bold ${strengthTextColor}`}>{strengthLabel}</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${strengthColor}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Criteria Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
            {hasLength ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> : <XCircle className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />}
            <span>Mínimo 12 caracteres ({password.length}/12)</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
            {hasUpper && hasLower ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> : <XCircle className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />}
            <span>Mayúsculas y minúsculas</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
            {hasNumber ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> : <XCircle className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />}
            <span>Al menos un número (0-9)</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
            {hasSymbol ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> : <XCircle className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />}
            <span>Símbolo especial (!, #, $, %)</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 sm:col-span-2">
            {!hasObviousWords ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />}
            <span>Sin palabras obvias (clave, 123, 2026, tienda)</span>
          </div>
        </div>
      </div>

      {/* Generator */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-purple-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
              Generador de Frases Clave Seguras para Emprendedoras
            </h4>
          </div>
          <button
            onClick={generatePassphrase}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-medium transition-all shadow-sm active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Generar Clave
          </button>
        </div>

        {generatedPass ? (
          <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-purple-200 dark:border-purple-800">
            <span className="font-mono text-purple-700 dark:text-purple-300 text-sm font-semibold tracking-wide">
              {generatedPass}
            </span>
            <button
              onClick={() => handleCopy(generatedPass, true)}
              className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 hover:bg-purple-200 rounded-lg text-xs font-medium transition-colors"
            >
              {genCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {genCopied ? '¡Copiada!' : 'Copiar'}
            </button>
          </div>
        ) : (
          <p className="text-xs text-slate-500 dark:text-slate-400 italic">
            Presiona el botón "Generar Clave" para crear una frase de contraseña inolvidable pero blindada para tu negocio.
          </p>
        )}
      </div>

      {/* 2FA Guide Box */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
        <h4 className="font-semibold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Pasos recomendados para activar el Doble Factor (2FA) hoy mismo:
        </h4>
        <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
          <li><strong>WhatsApp Business:</strong> Ajustes &gt; Cuenta &gt; Verificación en dos pasos &gt; Activar PIN de 6 dígitos + Correo de respaldo.</li>
          <li><strong>Instagram de la Tienda:</strong> Configuración &gt; Centro de Cuentas &gt; Contraseña y seguridad &gt; Autenticación en dos pasos.</li>
          <li><strong>Correo Gmail / Outlook del Negocio:</strong> Seguridad &gt; Verificación en 2 pasos &gt; Activar con la app Google Authenticator.</li>
        </ul>
      </div>
    </div>
  );
};
