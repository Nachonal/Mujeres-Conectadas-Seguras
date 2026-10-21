import React, { useState } from 'react';
import {
  PROJECT_METADATA,
  STAKEHOLDERS_DATA,
  BACKLOG_ITEMS,
  BURNDOWN_CHART_DATA,
  IMPEDIMENTS_DATA,
  RELEASE_PLAN_DATA,
} from '../../data/projectData';
import { BacklogItem } from '../../types';
import {
  FileText,
  Users,
  CheckSquare,
  TrendingDown,
  Calendar,
  AlertCircle,
  Award,
  Layers,
  Search,
  ExternalLink,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Filter,
} from 'lucide-react';

export const ScrumDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'vision' | 'stakeholders' | 'backlog' | 'board' | 'burndown' | 'release' | 'impediments' | 'prototype'
  >('vision');

  const [backlogFilter, setBacklogFilter] = useState('');
  const [selectedSprint, setSelectedSprint] = useState<number | 'all'>('all');
  const [backlogState, setBacklogState] = useState<BacklogItem[]>(BACKLOG_ITEMS);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const moveTask = (itemId: string, newStatus: BacklogItem['status']) => {
    setBacklogState((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, status: newStatus } : item))
    );
  };

  const filteredBacklog = backlogState.filter((item) => {
    const matchesSearch =
      item.code.toLowerCase().includes(backlogFilter.toLowerCase()) ||
      item.title.toLowerCase().includes(backlogFilter.toLowerCase()) ||
      item.requirement.toLowerCase().includes(backlogFilter.toLowerCase()) ||
      item.assignee.toLowerCase().includes(backlogFilter.toLowerCase());

    const matchesSprint = selectedSprint === 'all' || item.sprint === selectedSprint;
    return matchesSearch && matchesSprint;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-2 sm:px-4">
      {/* Academic Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white rounded-2xl p-5 sm:p-7 shadow-lg border border-blue-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-blue-950 text-[11px] font-extrabold uppercase tracking-wider">
                UNAD • ECBTI
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[11px] font-medium">
                {PROJECT_METADATA.course}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/30 text-purple-200 text-[11px] font-medium">
                Grupo: {PROJECT_METADATA.group}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              Anexo 3: Gestión del Proyecto Ágil Scrum
            </h1>
            <p className="text-xs sm:text-sm text-blue-200 max-w-3xl">
              Proyecto Tecnológico: <strong>"{PROJECT_METADATA.title}"</strong> — Fase 3: Gestión del Proyecto. Planificación, ejecución y seguimiento de incrementos funcionales.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 text-xs space-y-1 shrink-0 w-full md:w-auto">
            <div className="text-blue-200">
              Docente Director: <strong className="text-white block sm:inline">{PROJECT_METADATA.tutor}</strong>
            </div>
            <div className="text-blue-200">
              Fecha: <span className="text-white">{PROJECT_METADATA.date}</span>
            </div>
            <div className="text-[11px] text-amber-300 font-semibold pt-1">
              ✓ 5 Autores • 12 Historias de Usuario • 63 Story Points
            </div>
          </div>
        </div>

        {/* Authors Badges */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2 text-xs text-blue-100">
          <span className="font-semibold text-amber-300">Equipo de Desarrollo:</span>
          {PROJECT_METADATA.authors.map((author, aIdx) => (
            <span key={aIdx} className="bg-white/10 px-2 py-0.5 rounded text-[11px]">
              {author}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex gap-1 overflow-x-auto scrollbar-none">
        {[
          { id: 'vision', label: '1. Caso de Negocio & Visión', icon: FileText },
          { id: 'stakeholders', label: '2. Involucrados (Roles)', icon: Users },
          { id: 'backlog', label: '3. Product Backlog & UAT', icon: Layers },
          { id: 'board', label: '4. Tablero Scrum', icon: CheckSquare },
          { id: 'burndown', label: '5. Burndown Chart', icon: TrendingDown },
          { id: 'release', label: '6. Release Plan & Sprints', icon: Calendar },
          { id: 'impediments', label: '7. Gestión de Impedimentos', icon: AlertCircle },
          { id: 'prototype', label: '8. Ficha Prototipo & Cierre', icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: VISION & CASO DE NEGOCIO */}
      {activeTab === 'vision' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Problema Identificado
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {PROJECT_METADATA.problemIdentified}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Objetivo General
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {PROJECT_METADATA.generalObjective}
              </p>
            </div>
          </div>

          {/* Figura 1: Matriz Caso del Negocio y Visión */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Figura 1: Matriz Caso del Negocio y Visión (Anexo 3 Oficial)
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-medium">
                Project Vision
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
                    <th className="p-3 font-bold w-1/4">Elemento de Visión</th>
                    <th className="p-3 font-bold">Definición del Proyecto en Anexo 3</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-purple-700 dark:text-purple-300">OPORTUNIDAD O NECESIDAD</td>
                    <td className="p-3">
                      Necesidad de fortalecer la seguridad digital, la protección de datos personales y el uso responsable de herramientas digitales y de marketing.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-purple-700 dark:text-purple-300">EL PRODUCTO</td>
                    <td className="p-3">
                      <strong>Mujeres Conectadas, Seguras:</strong> aplicación móvil educativa y de orientación en seguridad digital.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-purple-700 dark:text-purple-300">BENEFICIOS</td>
                    <td className="p-3">
                      Aprendizaje práctico, prevención de riesgos, consulta rápida, cuestionarios de autoevaluación y orientación mediante Botón SOS y chatbot.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-purple-700 dark:text-purple-300">A DIFERENCIA</td>
                    <td className="p-3">
                      Información dispersa y poco adaptada al contexto de las usuarias, sin una experiencia integrada de aprendizaje y orientación.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-purple-700 dark:text-purple-300">NUESTRO PRODUCTO</td>
                    <td className="p-3">
                      Una aplicación móvil sencilla, accesible y centrada en las necesidades de las usuarias, con contenidos organizados, interacción y orientación ante situaciones de riesgo.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-xl">
                <strong className="block text-purple-900 dark:text-purple-200 mb-1">Alcance Definido:</strong>
                <p className="text-slate-600 dark:text-slate-400">{PROJECT_METADATA.scope}</p>
              </div>
              <div className="p-3 bg-slate-100 dark:bg-slate-800/50 rounded-xl">
                <strong className="block text-slate-900 dark:text-white mb-1">Limitaciones Reconocidas:</strong>
                <p className="text-slate-600 dark:text-slate-400">{PROJECT_METADATA.limitations}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INVOLUCRADOS (ROLES) */}
      {activeTab === 'stakeholders' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Figura 2: Matriz de Involucrados del Proyecto (Anexo 3)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Identificación temprana de involucrados CORE (Equipo Scrum) y NO CORE (Clientes y Stakeholders).
                </p>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold">
                9 Involucrados
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
                    <th className="p-3 font-bold">Involucrado</th>
                    <th className="p-3 font-bold">Rol</th>
                    <th className="p-3 font-bold">Tipo</th>
                    <th className="p-3 font-bold">Descripción del Rol</th>
                    <th className="p-3 font-bold">Contacto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {STAKEHOLDERS_DATA.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-semibold text-slate-900 dark:text-white">
                        {st.name}
                        <span className="block text-[10px] text-slate-400 font-normal">{st.personDescription}</span>
                      </td>
                      <td className="p-3 font-medium text-purple-600 dark:text-purple-400">{st.role}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            st.type === 'CORE'
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                              : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {st.type}
                        </span>
                      </td>
                      <td className="p-3 max-w-xs">{st.roleDescription}</td>
                      <td className="p-3 font-mono text-[11px] text-slate-500">
                        <div>{st.email}</div>
                        {st.phone && <div className="text-slate-400">Tel: {st.phone}</div>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRODUCT BACKLOG & UAT */}
      {activeTab === 'backlog' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-purple-600" />
                  Product Backlog Oficial (HU01 - HU12) con Criterios UAT
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total de 12 Historias de Usuario con estimación en Story Points y criterios de aceptación.
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={backlogFilter}
                    onChange={(e) => setBacklogFilter(e.target.value)}
                    placeholder="Buscar historia..."
                    className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <select
                  value={selectedSprint}
                  onChange={(e) => setSelectedSprint(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="all">Todos los Sprints</option>
                  <option value="1">Sprint 1</option>
                  <option value="2">Sprint 2</option>
                  <option value="3">Sprint 3</option>
                  <option value="4">Sprint 4</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
                    <th className="p-2.5 font-bold">Código</th>
                    <th className="p-2.5 font-bold">Título & Requerimiento</th>
                    <th className="p-2.5 font-bold">Criterio UAT (Aceptación)</th>
                    <th className="p-2.5 font-bold text-center">Puntos</th>
                    <th className="p-2.5 font-bold text-center">Sprint</th>
                    <th className="p-2.5 font-bold">Responsable</th>
                    <th className="p-2.5 font-bold">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {filteredBacklog.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-2.5 font-mono font-bold text-purple-600 dark:text-purple-400 whitespace-nowrap">
                        {item.code}
                      </td>
                      <td className="p-2.5 max-w-xs">
                        <div className="font-semibold text-slate-900 dark:text-white">{item.title}</div>
                        <div className="text-slate-500 text-[11px] mt-0.5 leading-snug">{item.requirement}</div>
                      </td>
                      <td className="p-2.5 max-w-sm text-slate-600 dark:text-slate-300 text-[11px] leading-snug bg-slate-50/50 dark:bg-slate-800/30 rounded">
                        {item.uatCriteria}
                      </td>
                      <td className="p-2.5 text-center font-bold font-mono">
                        <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                          {item.storyPoints} SP
                        </span>
                      </td>
                      <td className="p-2.5 text-center font-semibold text-slate-600 dark:text-slate-400">
                        SP {item.sprint}
                      </td>
                      <td className="p-2.5 text-[11px] whitespace-nowrap font-medium text-slate-800 dark:text-slate-200">
                        {item.assignee}
                      </td>
                      <td className="p-2.5 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SCRUM BOARD (KANBAN) */}
      {activeTab === 'board' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-purple-600" />
              Tablero Scrum Interactivo (Sprint Board)
            </h3>
            <span className="text-xs text-slate-500">
              Usa los botones para mover historias entre columnas y visualizar el flujo de trabajo.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(['Pendiente', 'En Progreso', 'En Revisión', 'Terminado'] as const).map((column) => {
              const columnItems = backlogState.filter((i) => i.status === column);
              const totalPoints = columnItems.reduce((acc, curr) => acc + curr.storyPoints, 0);

              let headerBg = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
              if (column === 'En Progreso') headerBg = 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300';
              if (column === 'En Revisión') headerBg = 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300';
              if (column === 'Terminado') headerBg = 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300';

              return (
                <div
                  key={column}
                  className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 flex flex-col space-y-3 min-h-[480px]"
                >
                  <div className={`p-2.5 rounded-xl font-bold text-xs flex justify-between items-center ${headerBg}`}>
                    <span>{column}</span>
                    <span className="font-mono text-[11px]">{columnItems.length} ({totalPoints} SP)</span>
                  </div>

                  <div className="flex-1 space-y-2.5 overflow-y-auto">
                    {columnItems.length === 0 ? (
                      <div className="text-center py-8 text-xs text-slate-400 italic">
                        No hay tareas en esta columna
                      </div>
                    ) : (
                      columnItems.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-2xs space-y-2 hover:shadow-sm transition-all"
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                              {item.code}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[10px] font-bold">
                              {item.storyPoints} SP
                            </span>
                          </div>

                          <h5 className="font-semibold text-xs text-slate-800 dark:text-white leading-snug">
                            {item.title}
                          </h5>

                          <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">
                            {item.requirement}
                          </p>

                          <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400">
                            <span className="truncate max-w-[120px]">{item.assignee}</span>
                            <span className="font-medium text-slate-500">SP {item.sprint}</span>
                          </div>

                          {/* Quick move controls */}
                          <div className="flex gap-1 pt-1 justify-end">
                            {column !== 'Pendiente' && (
                              <button
                                onClick={() => moveTask(item.id, 'Pendiente')}
                                className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-300"
                              >
                                ← Pend.
                              </button>
                            )}
                            {column !== 'En Progreso' && (
                              <button
                                onClick={() => moveTask(item.id, 'En Progreso')}
                                className="text-[9px] px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                              >
                                Prog.
                              </button>
                            )}
                            {column !== 'En Revisión' && (
                              <button
                                onClick={() => moveTask(item.id, 'En Revisión')}
                                className="text-[9px] px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
                              >
                                Rev.
                              </button>
                            )}
                            {column !== 'Terminado' && (
                              <button
                                onClick={() => moveTask(item.id, 'Terminado')}
                                className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                              >
                                Term. →
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: BURNDOWN CHART INTERACTIVO */}
      {activeTab === 'burndown' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-purple-600" />
                  Figura 5: Burndown Chart Oficial (Anexo 3 - 30 Días / 63 Story Points)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Visualización de la reducción del trabajo pendiente durante el Sprint de 3 semanas extendido.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-blue-600">
                  <span className="w-3 h-0.5 bg-blue-500 inline-block" /> Línea Ideal (Planeada)
                </span>
                <span className="flex items-center gap-1.5 text-rose-600">
                  <span className="w-3 h-0.5 bg-rose-500 inline-block" /> Trabajo Real (Actual)
                </span>
              </div>
            </div>

            {/* High-Precision Interactive SVG Burndown Chart */}
            <div className="relative w-full aspect-[2/1] sm:aspect-[2.5/1] bg-slate-950 rounded-xl p-4 sm:p-6 overflow-hidden">
              <svg viewBox="0 0 1000 450" className="w-full h-full">
                {/* Grid Lines */}
                {[0, 10, 20, 30, 40, 50, 60, 63].map((val) => {
                  const y = 400 - (val / 65) * 360;
                  return (
                    <g key={val}>
                      <line x1="50" y1={y} x2="950" y2={y} stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
                      <text x="35" y={y + 4} fill="#94a3b8" fontSize="12" textAnchor="end" fontFamily="monospace">
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* Vertical Day Lines */}
                {[0, 5, 10, 15, 20, 25, 30].map((d) => {
                  const x = 50 + (d / 30) * 900;
                  return (
                    <g key={d}>
                      <line x1={x} y1="40" x2={x} y2="400" stroke="#1e293b" strokeWidth="1" />
                      <text x={x} y="425" fill="#94a3b8" fontSize="12" textAnchor="middle" fontFamily="monospace">
                        Día {d}
                      </text>
                    </g>
                  );
                })}

                {/* Ideal Line (Blue) */}
                <line
                  x1="50"
                  y1={400 - (63 / 65) * 360}
                  x2="950"
                  y2="400"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                />

                {/* Real Actual Line (Rose / Red) */}
                <path
                  d={BURNDOWN_CHART_DATA.map((pt, i) => {
                    const x = 50 + (pt.day / 30) * 900;
                    const y = 400 - (pt.actual / 65) * 360;
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="3.5"
                />

                {/* Data Points on Real Line */}
                {BURNDOWN_CHART_DATA.map((pt) => {
                  const x = 50 + (pt.day / 30) * 900;
                  const y = 400 - (pt.actual / 65) * 360;
                  const isHovered = hoveredDay === pt.day;

                  return (
                    <g
                      key={pt.day}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredDay(pt.day)}
                      onMouseLeave={() => setHoveredDay(null)}
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? 7 : 4}
                        fill={isHovered ? '#ffffff' : '#f43f5e'}
                        stroke="#f43f5e"
                        strokeWidth="2"
                        className="transition-all"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Day inspection popup */}
              {hoveredDay !== null && (
                <div className="absolute top-4 right-4 bg-slate-900/95 border border-purple-500/50 rounded-xl p-3 text-xs text-white shadow-xl max-w-xs backdrop-blur-md">
                  <div className="font-bold text-amber-300">
                    Día {hoveredDay} de 30
                  </div>
                  <div className="text-slate-300 mt-1">
                    Puntos Reales: <strong>{BURNDOWN_CHART_DATA[hoveredDay]?.actual} SP</strong>
                  </div>
                  <div className="text-slate-400">
                    Puntos Planeados: {BURNDOWN_CHART_DATA[hoveredDay]?.planned.toFixed(1)} SP
                  </div>
                  <p className="text-[11px] text-purple-200 mt-1 italic border-t border-slate-700 pt-1">
                    {BURNDOWN_CHART_DATA[hoveredDay]?.notes}
                  </p>
                </div>
              )}
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900">
                <span className="text-[10px] text-blue-700 dark:text-blue-300 uppercase font-bold block">Puntos Totales</span>
                <span className="text-lg font-extrabold text-blue-900 dark:text-white">63 SP</span>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-900">
                <span className="text-[10px] text-purple-700 dark:text-purple-300 uppercase font-bold block">Duración Sprint</span>
                <span className="text-lg font-extrabold text-purple-900 dark:text-white">30 Días</span>
              </div>
              <div className="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900">
                <span className="text-[10px] text-rose-700 dark:text-rose-300 uppercase font-bold block">Puntos Quemados</span>
                <span className="text-lg font-extrabold text-rose-900 dark:text-white">63 / 63 (100%)</span>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900">
                <span className="text-[10px] text-emerald-700 dark:text-emerald-300 uppercase font-bold block">Puntos Restantes</span>
                <span className="text-lg font-extrabold text-emerald-900 dark:text-white">0 SP (Listo)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: RELEASE PLAN & SPRINTS */}
      {activeTab === 'release' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                Figura 3: Release Plan de 4 Sprints (Anexo 3)
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-semibold">
                Sprints de 3 semanas
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RELEASE_PLAN_DATA.map((sp, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-2 hover:border-purple-300 dark:hover:border-purple-600 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                      {sp.sprint}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold font-mono">
                      {sp.storyPoints} Story Points
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{sp.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    <strong>Enfoque:</strong> {sp.focus}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                    <strong>Incremento entregable:</strong> {sp.deliverable}
                  </p>
                </div>
              ))}
            </div>

            {/* Planning Poker Scale Table */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2">
              <h4 className="font-semibold text-xs text-slate-800 dark:text-white uppercase tracking-wider">
                Escala de Estimación de Sprints (Planning Poker Oficial):
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 text-center text-xs">
                {[
                  { pts: 1, eq: '1 día' },
                  { pts: 2, eq: '2 días' },
                  { pts: 3, eq: '4 días' },
                  { pts: 5, eq: '1 semana' },
                  { pts: 8, eq: '1.5 semanas' },
                  { pts: 13, eq: '2 semanas' },
                  { pts: 21, eq: '3 semanas' },
                  { pts: 34, eq: '5 semanas' },
                ].map((scale, sIdx) => (
                  <div key={sIdx} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="block font-bold text-purple-600 dark:text-purple-400 font-mono text-sm">{scale.pts}</span>
                    <span className="text-[10px] text-slate-500">{scale.eq}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: IMPEDIMENTOS */}
      {activeTab === 'impediments' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-purple-600" />
                  Matriz de Gestión de Impedimentos & Riesgos (Anexo 3)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Situaciones identificadas que afectaron el avance y acciones preventivas/correctivas adoptadas.
                </p>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold">
                100% Atendidos
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
                    <th className="p-3 font-bold">ID / Sprint</th>
                    <th className="p-3 font-bold">Fecha</th>
                    <th className="p-3 font-bold">Descripción del Impedimento</th>
                    <th className="p-3 font-bold">Acciones Preventivas o Correctivas</th>
                    <th className="p-3 font-bold">Responsable</th>
                    <th className="p-3 font-bold">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {IMPEDIMENTS_DATA.map((imp) => (
                    <tr key={imp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-mono font-bold text-purple-600 dark:text-purple-400 whitespace-nowrap">
                        #{imp.id} • SP {imp.sprint}
                      </td>
                      <td className="p-3 whitespace-nowrap text-slate-500">{imp.reportDate}</td>
                      <td className="p-3 max-w-xs font-medium text-slate-800 dark:text-slate-200">
                        {imp.description}
                      </td>
                      <td className="p-3 max-w-sm text-slate-600 dark:text-slate-300 text-[11px] bg-slate-50/50 dark:bg-slate-800/30 rounded">
                        {imp.correctiveActions}
                      </td>
                      <td className="p-3 font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                        {imp.responsible}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          {imp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: FICHA PROTOTIPO & CONCLUSIONES */}
      {activeTab === 'prototype' && (
        <div className="space-y-6">
          {/* Tabla 1: Ficha técnica prototipado */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Award className="w-5 h-5 text-purple-600" />
              Tabla 1: Ficha Técnica de Prototipado (Informe Fase 3)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
                <span className="font-bold text-purple-700 dark:text-purple-300 uppercase block">Título de la Solución:</span>
                <p className="text-slate-900 dark:text-white font-semibold">Mujeres Conectadas, Seguras</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
                <span className="font-bold text-purple-700 dark:text-purple-300 uppercase block">Software Utilizado:</span>
                <p className="text-slate-700 dark:text-slate-300">Vite React + TypeScript + Tailwind CSS + Gemini AI</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1 md:col-span-2">
                <span className="font-bold text-purple-700 dark:text-purple-300 uppercase block">Diseño del Prototipo:</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Facilitar el acceso a información práctica y comprensible para reconocer riesgos digitales y adoptar medidas preventivas. Navegación por módulos, contenidos educativos, cuestionarios interactivos, Botón SOS persistente y chatbot de orientación. Interfaz móvil sencilla, con navegación clara y acceso visible a los recursos principales.
                </p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1 md:col-span-2">
                <span className="font-bold text-purple-700 dark:text-purple-300 uppercase block">Realimentación y Validación:</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Recopilación de observaciones sobre comprensión de conceptos (Habeas Data, 2FA, Phishing), facilidad de navegación táctil, utilidad de las herramientas de emergencia (Botón SOS y minutas de reporte) y accesibilidad para emprendedoras.
                </p>
              </div>
            </div>
          </div>

          {/* Conclusiones Oficiales del Informe */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <GraduationCap className="w-5 h-5 text-purple-600" />
              Conclusiones del Proyecto (Fase 3: Gestión del Proyecto UNAD)
            </h3>

            <ol className="list-decimal list-inside space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <li className="pl-1">
                El desarrollo de la Fase 3 fortaleció la planificación y organización del proyecto <strong>Mujeres Conectadas, Seguras</strong>, mediante la aplicación de metodologías ágiles (Scrum) para estructurar una aplicación orientada a promover la seguridad digital y la protección de datos personales.
              </li>
              <li className="pl-1">
                La elaboración de la matriz de gestión de proyectos ágiles definió roles y responsabilidades del equipo, organizó el Product Backlog (HU01-HU12) y priorizó las funcionalidades del Producto Mínimo Viable (MVP).
              </li>
              <li className="pl-1">
                La definición de funcionalidades como el <strong>Botón SOS</strong>, los <strong>módulos de aprendizaje</strong> y el <strong>chatbot de orientación</strong> permitió atender las necesidades reales de prevención de riesgos y contraseñas seguras de las usuarias.
              </li>
              <li className="pl-1">
                El trabajo colaborativo mediante estimaciones de esfuerzo (Story Points) y seguimiento continuo en el Burndown Chart garantizó la coordinación del equipo y la resolución oportuna de impedimentos.
              </li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};
