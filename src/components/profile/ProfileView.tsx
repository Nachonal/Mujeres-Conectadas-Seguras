import React, { useState } from 'react';
import { UserProfile, Badge } from '../../types';
import { BADGES_DATA } from '../../data/learningContent';
import { User, Award, Shield, CheckCircle, Sparkles, Building2, Phone, Mail, FileCheck, Check } from 'lucide-react';

interface Props {
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
}

export const ProfileView: React.FC<Props> = ({ profile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    businessName: profile.businessName,
    businessType: profile.businessType,
    phone: profile.phone,
    email: profile.email,
  });
  const [showCertificate, setShowCertificate] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const getSecurityBadgeColor = (level: string) => {
    switch (level) {
      case 'Blindado':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300';
      case 'Avanzado':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300';
      case 'Intermedio':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300';
      default:
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-700 text-white rounded-2xl p-5 sm:p-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 border-2 border-white/50 backdrop-blur-md flex items-center justify-center text-white shadow-md">
              <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <span className="absolute bottom-0 right-0 p-1 bg-emerald-500 rounded-full border-2 border-purple-800" title="Activa">
              <Check className="w-3 h-3 text-white" />
            </span>
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold">{profile.name}</h2>
                <p className="text-xs sm:text-sm text-purple-200 flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                  <Building2 className="w-3.5 h-3.5" />
                  {profile.businessName} • {profile.businessType}
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full border font-bold uppercase tracking-wider self-center sm:self-start ${getSecurityBadgeColor(
                  profile.securityLevel
                )}`}
              >
                Nivel {profile.securityLevel}
              </span>
            </div>

            {/* Points and lessons progress counter */}
            <div className="pt-3 grid grid-cols-3 gap-2 text-center border-t border-white/10 mt-3">
              <div className="bg-white/10 rounded-xl p-2 backdrop-blur-xs">
                <span className="block text-base sm:text-lg font-extrabold">{profile.points}</span>
                <span className="text-[10px] text-purple-200 uppercase font-medium">Puntos Ciber</span>
              </div>
              <div className="bg-white/10 rounded-xl p-2 backdrop-blur-xs">
                <span className="block text-base sm:text-lg font-extrabold">{profile.completedLessons.length}</span>
                <span className="text-[10px] text-purple-200 uppercase font-medium">Lecciones</span>
              </div>
              <div className="bg-white/10 rounded-xl p-2 backdrop-blur-xs">
                <span className="block text-base sm:text-lg font-extrabold">{profile.unlockedBadges.length}</span>
                <span className="text-[10px] text-purple-200 uppercase font-medium">Insignias</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form or Information Display */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Datos del Emprendimiento & Seguridad
          </h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline"
          >
            {isEditing ? 'Cancelar' : 'Editar Datos'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">Tu Nombre:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">Nombre de tu Marca o Negocio:</label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">Categoría del Negocio:</label>
              <select
                value={formData.businessType}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="Moda y Calzado">Moda y Calzado</option>
                <option value="Alimentos y Repostería">Alimentos y Repostería</option>
                <option value="Belleza y Cosmética">Belleza y Cosmética</option>
                <option value="Artesanías y Manualidades">Artesanías y Manualidades</option>
                <option value="Servicios Profesionales">Servicios Profesionales</option>
                <option value="Tecnología y Accesorios">Tecnología y Accesorios</option>
                <option value="Otro Comercio">Otro Comercio</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">Teléfono / WhatsApp:</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-slate-600 dark:text-slate-400 mb-1">Correo Electrónico:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold shadow-sm text-xs"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
              <Building2 className="w-4 h-4 text-purple-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block">Negocio / Sector:</span>
                <span className="font-semibold text-slate-800 dark:text-white">{profile.businessName} ({profile.businessType})</span>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
              <Phone className="w-4 h-4 text-purple-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block">WhatsApp de Contacto:</span>
                <span className="font-semibold text-slate-800 dark:text-white">{profile.phone}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl sm:col-span-2">
              <Mail className="w-4 h-4 text-purple-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block">Correo Electrónico Comercial:</span>
                <span className="font-semibold text-slate-800 dark:text-white">{profile.email}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Badges and Achievements */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Insignias y Reconocimientos
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {profile.unlockedBadges.length} de {BADGES_DATA.length} Desbloqueadas
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {BADGES_DATA.map((badge) => {
            const isUnlocked = profile.unlockedBadges.includes(badge.id) || profile.points >= badge.requiredPoints;

            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-amber-50 to-purple-50 dark:from-slate-800 dark:to-purple-950/20 border-amber-300 dark:border-amber-800'
                    : 'bg-slate-50/50 dark:bg-slate-800/20 border-slate-200 dark:border-slate-800 opacity-50 grayscale'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isUnlocked
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-slate-300 dark:bg-slate-700 text-slate-500'
                  }`}
                >
                  <Award className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {badge.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                    {badge.description}
                  </p>
                  <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 block pt-1">
                    {isUnlocked ? '✓ Obtenida' : `Requiere ${badge.requiredPoints} pts`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certificate Button */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={() => setShowCertificate(!showCertificate)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95"
          >
            <FileCheck className="w-4 h-4" />
            {showCertificate ? 'Ocultar Certificado' : 'Generar Certificado Digital UNAD'}
          </button>
        </div>
      </div>

      {/* Certificate Modal / Card */}
      {showCertificate && (
        <div className="bg-gradient-to-b from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 border-4 border-amber-300 dark:border-amber-700 rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-4">
          <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
            <span>Universidad Nacional Abierta y a Distancia UNAD</span>
            <span>Proyecto de Ingeniería II</span>
          </div>

          <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-amber-500 to-purple-600 text-white rounded-full flex items-center justify-center shadow-md">
            <Award className="w-8 h-8" />
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white">
            CERTIFICADO DE CAPACITACIÓN EN SEGURIDAD DIGITAL
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            Se otorga el presente reconocimiento a:
          </p>

          <h4 className="text-2xl font-extrabold text-purple-700 dark:text-purple-300 underline decoration-purple-300">
            {profile.name}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            Por haber fortalecido sus competencias y buenas prácticas en ciberseguridad, protección de datos personales (Habeas Data) y marketing digital ético para el negocio <strong>"{profile.businessName}"</strong> a través de la solución tecnológica <strong>Mujeres Conectadas, Seguras</strong>.
          </p>

          <div className="pt-4 border-t border-amber-200 dark:border-slate-700 grid grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-400">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Juan José Victoria Escarria</p>
              <p className="text-[10px]">Docente - Proyecto de Ingeniería II</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Grupo 202337121_212</p>
              <p className="text-[10px]">Bogotá D.C. • Octubre de 2026</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
