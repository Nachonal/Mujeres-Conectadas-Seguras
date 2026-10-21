import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini Client if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Error initializing GoogleGenAI:', err);
  }
}

// Fallback smart responses for cyber protection offline or when API key is not configured
const getCuratedAnswer = (query: string): string => {
  const q = query.toLowerCase();

  if (q.includes('whatsapp') || q.includes('clon') || q.includes('codigo') || q.includes('seis dígitos')) {
    return '🚨 **Atención con WhatsApp:** Nunca compartas el código de 6 dígitos que te llega por SMS. Si sospechas que intentan clonar tu cuenta:\n\n1. Ve a **Ajustes > Cuenta > Verificación en dos pasos** y activa un PIN secreto con correo de recuperación.\n2. Si ya perdiste acceso, descarga e inicia sesión de nuevo solicitando el código por SMS; esto cerrará la sesión del atacante.\n3. Avisa de inmediato a tus familiares y clientas por llamada directa para que no transfieran dinero a tu nombre.';
  }

  if (q.includes('nequi') || q.includes('daviplata') || q.includes('comprobante') || q.includes('pago falso') || q.includes('transferencia')) {
    return '💳 **Prevención de pagos falsos en Nequi/Daviplata:**\n\n1. **Nunca entregues un producto solo con un screenshot o comprobante digital**; los comprobantes falsos son muy fáciles de editar.\n2. Abre directamente tu aplicación oficial de Nequi o Daviplata y verifica que el saldo esté reflejado en tus movimientos.\n3. Desconfía de capturas con la hora desfasada o fuentes de texto extrañas.\n4. Si tienes ventas constantes, habilita códigos QR oficiales con notificación sonora.';
  }

  if (q.includes('contraseña') || q.includes('clave') || q.includes('password')) {
    return '🔐 **Consejos para contraseñas seguras en tu negocio:**\n\n- Utiliza frases largas fáciles de recordar para ti pero difíciles de adivinar (ej: `MiCafeteria#Segura2026!`).\n- Mínimo 12 caracteres mezclando mayúsculas, minúsculas, números y símbolos.\n- **Regla de oro:** No uses la misma contraseña de tus redes sociales para tu correo principal o cuentas bancarias.\n- Puedes usar la herramienta interactiva de contraseñas de esta app para comprobar qué tan fuerte es tu clave actual.';
  }

  if (q.includes('phishing') || q.includes('enlace') || q.includes('link') || q.includes('correo sospechoso') || q.includes('sms')) {
    return '🎣 **Cómo detectar Phishing o enlaces engañosos:**\n\n- Revisa minuciosamente el remitente y la URL: los estafadores usan dominios similares (como `bancocolombia-seguridad.xyz` en lugar del oficial).\n- Desconfía de mensajes con urgencia extrema ("Tu cuenta será bloqueada en 1 hora").\n- Los bancos y plataformas serias **jamás** te pedirán tu contraseña, clave dinámica o datos de tarjeta a través de un link.\n- Si dudaste, comunícate directamente con la entidad por los canales oficiales.';
  }

  if (q.includes('marketing') || q.includes('datos') || q.includes('habeas data') || q.includes('spam') || q.includes('clientes')) {
    return '📈 **Marketing digital responsable y protección de datos (Ley 1581):**\n\n- Pide siempre autorización previa antes de añadir a una clienta a un grupo o lista de difusión.\n- No satures con mensajes masivos; ofrece siempre la opción de "Si no deseas recibir más ofertas, responde este mensaje".\n- Guarda la lista de tus clientas en un entorno seguro y con copia de seguridad (Google Drive con verificación en dos pasos o almacenamiento cifrado).\n- No compartas bases de datos de clientas con terceros ni compres bases de datos no autorizadas.';
  }

  if (q.includes('sos') || q.includes('denuncia') || q.includes('policia') || q.includes('fiscalia')) {
    return '🆘 **Rutas de atención inmediata en Colombia:**\n\n- **CAI Virtual de la Policía Nacional:** caivirtual.policia.gov.co o marcando al 123.\n- **Fiscalía General de la Nación:** Línea nacional 122 o plataforma ADenunciar.\n- **Línea 155 (Orientación para Mujeres):** Gratuita las 24 horas para orientación frente a violencia o acoso.\n- **SIC (Superintendencia de Industria y Comercio):** Denuncias sobre violación de datos personales y comercio electrónico.';
  }

  return 'Hola emprendedora. Estoy aquí para acompañarte y proteger tu negocio. Puedes consultarme sobre cómo proteger tu WhatsApp, reconocer comprobantes falsos de Nequi/Daviplata, crear contraseñas blindadas, cumplir la ley de protección de datos con tus clientas o qué hacer si sufres un ciberataque. ¿En qué te puedo orientar hoy?';
};

// API Endpoint for the AI Cyber Assistant
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Mensaje requerido' });
    }

    if (aiClient) {
      try {
        const systemInstruction = `Eres 'ConectaSegura', la asistente virtual y mentora experta en ciberseguridad, protección de datos personales (marco legal colombiano como la Ley 1581 de 2012) y marketing digital ético y responsable.
Tu objetivo es proteger, educar y empoderar a mujeres emprendedoras y usuarias de teléfonos móviles en Colombia y Latinoamérica.
Tus respuestas deben ser:
1. Cálidas, claras, comprensibles y sin tecnicismos innecesarios.
2. Prácticas, con pasos de acción directos (1, 2, 3) y ejemplos reales cotidianos (WhatsApp Business, Nequi, Daviplata, Instagram, Facebook, catálogos, transferencias).
3. Si la usuaria reporta una estafa o incidente activo, prioriza siempre la contención inmediata (tranquilizarla, pasos para detener la pérdida) y proporciona las rutas oficiales de denuncia (CAI Virtual 123, Fiscalía 122, Línea 155).
4. Mantén tus respuestas concisas y bien formateadas con viñetas legibles.`;

        const contents = [];
        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            if (item.role === 'user' || item.role === 'model') {
              contents.push({
                role: item.role,
                parts: [{ text: String(item.text) }],
              });
            }
          }
        }
        contents.push({
          role: 'user',
          parts: [{ text: message }],
        });

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        const reply = response.text || getCuratedAnswer(message);
        return res.json({ reply });
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, using expert fallback:', geminiError?.message || geminiError);
        const reply = getCuratedAnswer(message);
        return res.json({ reply });
      }
    } else {
      const reply = getCuratedAnswer(message);
      return res.json({ reply });
    }
  } catch (error: any) {
    console.error('Server error in /api/gemini/chat:', error);
    res.status(500).json({ error: 'Error procesando la consulta' });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
