import React, { useState } from 'react';
import { EMERGENCY_CONTACTS, EMERGENCY_GUIDES } from '../../data/learningContent';
import { AlertTriangle, PhoneCall, ShieldAlert, FileText, Copy, Check, ExternalLink, X, ChevronRight, Siren } from 'lucide-react';

interface Props {
  onClose?: () => void;
  userName?: string;
  businessName?: string;
}

export const SosCenter: React.FC<Props> = ({ onClose, userName = 'Emprendedora', businessName = 'Mi Emprendimiento' }) => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>(EMERGENCY_GUIDES[0].id);
  const [copiedReport, setCopiedReport] = useState(false);
  const [reportDetails, setReportDetails] = useState({
    suspectPhone: '',
    incidentDate: new Date().toLocaleDateString('es-CO'),
    description: '',
  });

  const activeGuide = EMERGENCY_GUIDES.find((g) => g.id === selectedGuideId) || EMERGENCY_GUIDES[0];

  const generateReportTemplate = () => {
    return `REPORTE DE INCIDENTE DIGITAL - PROTOCOLO DE SEGURIDAD
Fecha del reporte: ${reportDetails.incidentDate}
Afectada: ${userName}
Emprendimiento: ${businessName}
Tipo de amenaza: ${activeGuide.threatType} (${activeGuide.title})
Número sospechoso / Enlace involucrado: ${reportDetails.suspectPhone || '[No especificado]'}

DETALLE DE LOS HECHOS:
${reportDetails.description || 'Se identificó una situación de riesgo digital que afecta la seguridad de la información personal/comercial.'}

ACCIONES PREVENTIVAS ADOPTADAS:
- Activación de protocolo de contención de la aplicación "Mujeres Conectadas, Seguras".
- Solicitud de asistencia y registro de evidencia digital (capturas de pantalla, comprobantes).

Ruta legal de radicación:
${activeGuide.legalRoute}`;
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(generateReportTemplate());
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner SOS */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white rounded-2xl p-5 shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white">
              <Siren className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider">
                Centro de Respuesta y SOS
              </div>
              <h2 className="text-lg sm:text-xl font-bold mt-1">
                Orientación Urgente ante Riesgos Digitales
              </h2>
              <p className="text-xs sm:text-sm text-rose-100 max-w-xl mt-0.5">
                Mantén la calma. Aquí tienes los pasos inmediatos de contención, rutas oficiales de denuncia en Colombia y plantilla de reporte.
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Official Hotlines Quick Grid */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Líneas de Atención Oficiales Directas (Colombia)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EMERGENCY_CONTACTS.map((contact, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-sm hover:border-purple-300 dark:hover:border-purple-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                    {contact.badge}
                  </span>
                  <span className="text-xs text-slate-400">{contact.serviceHours}</span>
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mt-2">
                  {contact.name}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                  {contact.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  Llamar: {contact.phone}
                </a>
                <a
                  href={contact.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 hover:underline font-medium"
                >
                  Portal Web
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Emergency Incident Guides */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          Selecciona tu situación para ver el protocolo de contención:
        </h3>

        {/* Tab pills */}
        <div className="flex flex-wrap gap-2">
          {EMERGENCY_GUIDES.map((guide) => (
            <button
              key={guide.id}
              onClick={() => setSelectedGuideId(guide.id)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-left flex items-center gap-2 ${
                selectedGuideId === guide.id
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>{guide.title}</span>
              {selectedGuideId === guide.id && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
            </button>
          ))}
        </div>

        {/* Guide Content */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {activeGuide.title}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-semibold">
              Prioridad: {activeGuide.severity}
            </span>
          </div>

          {/* Immediate Steps */}
          <div>
            <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              1. Pasos Inmediatos de Contención:
            </h5>
            <ol className="list-decimal list-inside space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {activeGuide.immediateSteps.map((step, sIdx) => (
                <li key={sIdx} className="leading-relaxed pl-1">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Evidence Preservation */}
          <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
            <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              2. Cómo Preservar la Evidencia para la Denuncia:
            </h5>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              {activeGuide.evidencePreservation.map((ev, eIdx) => (
                <li key={eIdx}>{ev}</li>
              ))}
            </ul>
          </div>

          {/* Legal route */}
          <div className="border-t border-slate-200 dark:border-slate-700 pt-3 text-xs text-purple-700 dark:text-purple-300">
            <strong>Ruta Legal Oficial:</strong> {activeGuide.legalRoute}
          </div>
        </div>
      </div>

      {/* Quick Incident Report Generator */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
              Generador de Minuta de Reporte Formal (Listo para Copiar)
            </h3>
          </div>
          <button
            onClick={handleCopyReport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-medium transition-all shadow-sm active:scale-95"
          >
            {copiedReport ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedReport ? '¡Reporte Copiado!' : 'Copiar Reporte'}
          </button>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Usa este texto estructurado para enviarlo por WhatsApp al banco, radicarlo en el CAI Virtual o conservarlo como registro formal.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-slate-600 dark:text-slate-400 mb-1">
              Teléfono sospechoso / enlace:
            </label>
            <input
              type="text"
              value={reportDetails.suspectPhone}
              onChange={(e) => setReportDetails({ ...reportDetails, suspectPhone: e.target.value })}
              placeholder="Ej: +57 312 000 0000 o link recibido"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-slate-600 dark:text-slate-400 mb-1">
              Breve descripción del suceso:
            </label>
            <input
              type="text"
              value={reportDetails.description}
              onChange={(e) => setReportDetails({ ...reportDetails, description: e.target.value })}
              placeholder="Ej: Me solicitaron código SMS fingiendo ser cliente"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="p-3.5 bg-slate-950 text-slate-200 rounded-xl font-mono text-[11px] leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap select-all">
          {generateReportTemplate()}
        </div>
      </div>
    </div>
  );
};
