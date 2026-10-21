import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, RefreshCw, AlertCircle, ShieldCheck } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  time: string;
}

interface Props {
  userName?: string;
  onEarnPoints?: (points: number) => void;
}

const PRESET_QUESTIONS = [
  '¿Cómo activo la verificación en 2 pasos en WhatsApp?',
  '¿Cómo sé si un comprobante de Nequi o Daviplata es falso?',
  '¿Qué hago si me amenazan o intentan extorsionar?',
  '¿Cómo cumplo la Ley de Habeas Data con mis clientas?',
  '¿Qué contraseñas son seguras para mi negocio?',
];

export const ChatbotConectaSegura: React.FC<Props> = ({ userName = 'Emprendedora', onEarnPoints }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `¡Hola ${userName}! Soy **ConectaSegura**, tu mentora y orientadora en ciberseguridad, protección de datos personales y ventas digitales seguras.\n\nPuedes preguntarme sobre cómo blindar tu WhatsApp, verificar transferencias bancarias, responder a clientes dudosos o qué hacer ante cualquier sospecha de fraude. ¿En qué te puedo asesorar hoy?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    if (onEarnPoints) {
      onEarnPoints(10);
    }

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: data.reply || 'He recibido tu mensaje. Recuerda siempre desconfiar de códigos SMS solicitados por terceros y verificar saldos en tus apps bancarias oficiales.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.warn('Chat request failed, providing local assistance:', err);
      // Fallback local expert response
      let fallbackText = 'Entiendo tu consulta. Recuerda que ante cualquier sospecha de fraude: 1. No dictes códigos de 6 dígitos que lleguen a tu teléfono. 2. Verifica los saldos en vivo dentro de tu app bancaria oficial. 3. Si tienes una emergencia inmediata, consulta las líneas oficiales en el Botón SOS.';
      if (text.toLowerCase().includes('whatsapp')) {
        fallbackText = 'Para proteger tu WhatsApp: entra a Ajustes > Cuenta > Verificación en dos pasos y activa un PIN de 6 dígitos con correo de seguridad. Nunca entregues códigos de verificación que te lleguen por SMS.';
      } else if (text.toLowerCase().includes('nequi') || text.toLowerCase().includes('comprobante')) {
        fallbackText = 'Nunca entregues mercancía únicamente con la captura de pantalla de un comprobante. Entra a tu app de Nequi o Daviplata y confirma que el saldo real disponible aumentó en tus movimientos.';
      }

      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: fallbackText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessageText = (raw: string) => {
    // Basic formatting for bold and lists
    const lines = raw.split('\n');
    return (
      <div className="space-y-1.5">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1" />;

          // Process bold tags
          const parts = line.split(/(\*\*.*?\*\*)/g);
          const renderedLine = parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="font-semibold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
            }
            return part;
          });

          return (
            <p key={idx} className="text-xs sm:text-sm leading-relaxed">
              {renderedLine}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[560px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
      {/* Chat header */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white p-3.5 sm:p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-inner">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-purple-800" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm text-white">ConectaSegura AI</h3>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-500/40 font-medium">
                Orientación Activa
              </span>
            </div>
            <p className="text-[11px] text-purple-200">
              Asistente en Ciberseguridad & Marketing Ético UNAD
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-purple-200">
          <ShieldCheck className="w-4 h-4 text-emerald-300" />
          <span className="hidden sm:inline">Protección 24/7</span>
        </div>
      </div>

      {/* Preset Questions Chips */}
      <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 border-b border-slate-200 dark:border-slate-800 overflow-x-auto flex gap-1.5 scrollbar-none shrink-0">
        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 self-center whitespace-nowrap pl-1">
          Preguntas Rápidas:
        </span>
        {PRESET_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            disabled={isLoading}
            className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-200 whitespace-nowrap hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors shadow-2xs shrink-0 disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 dark:bg-slate-950/40">
        {messages.map((m) => {
          const isUser = m.role === 'user';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-purple-600 text-white'
                    : 'bg-gradient-to-tr from-purple-700 to-indigo-600 text-white shadow-xs'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[82%] sm:max-w-[75%] rounded-2xl p-3 sm:p-3.5 shadow-2xs ${
                  isUser
                    ? 'bg-purple-600 text-white rounded-tr-none'
                    : 'bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                }`}
              >
                {formatMessageText(m.text)}
                <div
                  className={`text-[10px] mt-1 text-right ${
                    isUser ? 'text-purple-200' : 'text-slate-400'
                  }`}
                >
                  {m.time}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-700 to-indigo-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl rounded-tl-none p-3 shadow-2xs text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span>ConectaSegura está analizando tu consulta...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat input form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe tu duda sobre ciberseguridad o ventas..."
          className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="p-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white rounded-xl transition-all shadow-sm active:scale-95 shrink-0"
          title="Enviar mensaje"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
