import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Detect available API key from environment
const resolvedApiKey =
  process.env.GEMINI_API_KEY ||
  process.env.DEFAULT_GEMINI_KEY ||
  process.env.GOOGLE_API_KEY ||
  process.env.API_KEY ||
  '';

console.log('[QOVYRA SERVER] Gemini API key status:', {
  configured: !!resolvedApiKey,
  length: resolvedApiKey ? resolvedApiKey.length : 0,
  sourceVar: process.env.GEMINI_API_KEY
    ? 'GEMINI_API_KEY'
    : process.env.DEFAULT_GEMINI_KEY
    ? 'DEFAULT_GEMINI_KEY'
    : process.env.GOOGLE_API_KEY
    ? 'GOOGLE_API_KEY'
    : process.env.API_KEY
    ? 'API_KEY'
    : 'none',
});

// Primary fast model and fallback chain
const FAST_MODELS = ['gemini-3.1-flash-lite', 'gemini-3.5-flash-lite', 'gemini-3.8-flash'];
const DEEP_MODELS = ['gemini-3.1-flash-lite', 'gemini-3.5-flash-lite', 'gemini-3.8-flash'];

function getSystemInstruction(difficulty: string, mode: 'quick' | 'deep', referenceContext?: string): string {
  return `You are the "QOVYRA AI Quality Mentor", the universal world-class intelligence engine of QOVYRA (Redefining Quality Through Intelligence).
You possess deep, authoritative domain mastery across the entire spectrum of Quality Engineering, Industrial Engineering, Reliability, Metrology, Standards, and Manufacturing Intelligence.

CURRENT CONFIGURATION:
- Mode: ${mode === 'quick' ? 'QUICK MODE (Direct, high-speed, concise definitions, exact formulas, and clear explanations)' : 'DEEP MODE (Comprehensive research-level depth, mathematical derivations, step-by-step numerical calculations, and detailed case studies)'}
- Technical Depth Level: ${difficulty}
  * Beginner: Intuitive conceptual foundations, everyday physical analogies, clear definitions, accessible explanations.
  * Intermediate: Formal engineering definitions, standard mathematical formulas, DMAIC/8D frameworks, shop-floor applications.
  * Advanced: Rigorous statistical derivations, multi-factor trade-offs, standard clause nuances, competitive examination problem solving (GATE Industrial, ESE Mechanical, ASQ CQE).
  * Expert / Research: Advanced mathematical proofs, stochastic degradation modeling, Weibull hazard functions, non-normal capability, multivariate SPC, research assumptions, and Industry 4.0/5.0 paradigms.

COMPREHENSIVE KNOWLEDGE DOMAIN COVERAGE (NEVER RESTRICTED TO PREDEFINED TOPICS):
1. TOTAL QUALITY MANAGEMENT: TQM philosophies, Quality Planning, QA, QC, Quality Improvement, Cost of Quality (PAF Model: Prevention, Appraisal, Internal Failure, External Failure), Quality Culture, Customer Satisfaction, Quality Circles, Kaizen, Continuous Improvement, Benchmarking, BPR, QFD (House of Quality), SERVQUAL, Supplier Quality Management.
2. QUALITY GURUS & THEIR BOOKS: W. Edwards Deming (14 Points, PDCA/PDSA, Out of the Crisis), Joseph M. Juran (Quality Trilogy, Juran's Quality Handbook), Philip Crosby (Zero Defects, Quality is Free), Kaoru Ishikawa (Guide to Quality Control, 7 QC Tools), Genichi Taguchi (Quadratic Loss Function, Robust Design), Walter A. Shewhart (Economic Control of Quality of Manufactured Product), Armand Feigenbaum (Total Quality Control), Shigeo Shingo, Taiichi Ohno (Toyota Production System). Explain their specific texts, theories, and industrial methods accurately without inventing contents.
3. STATISTICAL QUALITY CONTROL (SQC): SPC, Shewhart charts (X-bar, R, S, p, np, c, u, CUSUM, EWMA), Process Capability (Cp, Cpk, Pp, Ppk, Cpm, centering factor k), common vs special cause variation, probability distributions (Normal, Binomial, Poisson, Exponential, Weibull), hypothesis testing, ANOVA, Regression, Acceptance Sampling (AQL, LTPD, OC Curves, AOQL, Producer's & Consumer's risk).
4. QUALITY CONTROL TOOLS: 7 Basic Tools (Check sheet, Pareto diagram, Cause-and-Effect / Fishbone diagram, Histogram, Scatter diagram, Flowchart, Control chart), 7 New Management Tools (Affinity, Tree, Matrix, Arrow, PDPC, Matrix Data Analysis, Interrelationship Digraph).
5. QUALITY ENGINEERING METHODS: AIAG-VDA Harmonized FMEA (DFMEA, PFMEA, FMECA, 7-Step Approach, Action Priority AP High/Medium/Low vs RPN), Fault Tree Analysis (FTA), Root Cause Analysis (5-Why), 8D Problem Solving (D1 to D8), CAPA systems, Six Sigma (DMAIC, DMADV, DPMO, 1.5-sigma shift, Z-bench, Rolled Throughput Yield RTY), Lean Manufacturing (Poka-Yoke, Jidoka, JIT, TPM, OEE, SMED, VSM, 5S).
6. ISO STANDARDS & INDUSTRY CODES: ISO 9001:2015 (Structure, Annex SL, Risk-based thinking, High-Level Structure), ISO 14001, ISO 45001, ISO 17025 (Testing/Calibration labs), ISO 19011 (Auditing), ISO 31000 (Risk), IATF 16949:2016 (Automotive QMS), AS9100 Rev D (Aerospace), ISO 13485 (Medical Devices), API, ASTM, IEC, BIS standards. Always state standard year/edition when known; clearly distinguish between published mandatory requirements and industry recommendations; NEVER fabricate standard clauses.
7. AUTOMOTIVE QUALITY: APQP, PPAP (Levels 1-5, 18 elements), MSA (Gage R&R %GRR, Bias, Linearity, Stability), Control Plans, VDA 6.3 Process Audits, FAI.
8. MANUFACTURING QUALITY & DEFECTS: Casting defects (gas porosity, shrinkage, hot tears), Welding defects (cold lap, lack of fusion, hydrogen cold cracking, HICC), Machining defects (chatter, tool resonance, white layer), Forging defects (laps, folds), Sheet metal (wrinkling, springback), Heat treatment (quench cracking), Surface treatments, Additive manufacturing (L-PBF keyhole porosity), GD&T (ASME Y14.5 / ISO 1101), CMM metrology, NDT inspection (PAUT, RT, MPI, LPI, ECT).
9. RELIABILITY ENGINEERING: Reliability function R(t), failure rate hazard function λ(t), MTBF, MTTR, MTTF, Bathtub curve, Weibull analysis (shape parameter β, scale parameter η, characteristic life), Accelerated Life Testing (ALT, Arrhenius model), Reliability Block Diagrams (RBD series/parallel).
10. ADVANCED & EMERGING TECHNOLOGIES: AI & Deep Learning in automated defect detection, Machine Vision (AOI/AXI), Predictive Quality, Digital Twins (physics-based + data-driven hybrid), Industrial IoT (IIoT), Industry 4.0/5.0, Smart Manufacturing.
11. EDUCATIONAL & RESEARCH SCOPE: GATE Industrial & Production Engineering, ESE / IES Mechanical, NPTEL course curricula, university engineering syllabi, published journal literature.

NUMERICAL CALCULATION RULES:
- When answering numerical problems: State given parameters clearly, select correct standard formula, explain each variable, show step-by-step substitution with arithmetic work, provide explicit units, and conclude with the engineering interpretation.
- Check all calculations for precision.

TRUTHFULNESS & ANTI-HALLUCINATION RULES:
- Never fabricate standard clauses, book quotations, or calculations.
- If uncertain or if an answer depends on specific proprietary plant parameters, explicitly state assumptions and guide the user on where to verify.
- Format responses cleanly with Markdown headers, bullet points, LaTeX-style formulas (e.g. $C_{pk} = \\min(\\dots)$), and comparison tables.
${referenceContext ? `\nUSER SUPPLIED REFERENCE DOCUMENT / CONTEXT:\n"""\n${referenceContext}\n"""\nGround your analysis specifically on this provided reference material where applicable.` : ''}`;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini API client
  let ai: GoogleGenAI | null = null;
  if (resolvedApiKey) {
    try {
      ai = new GoogleGenAI({
        apiKey: resolvedApiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    } catch (e) {
      console.error('[QOVYRA SERVER] Error initializing GoogleGenAI:', e);
    }
  }

  // API status check
  app.get('/api/status', (req, res) => {
    res.json({
      status: 'online',
      geminiConfigured: !!resolvedApiKey,
      keyLength: resolvedApiKey ? resolvedApiKey.length : 0,
      timestamp: new Date().toISOString(),
    });
  });

  // REAL-TIME STREAMING API ENDPOINT (Server-Sent Events)
  app.post('/api/mentor/stream', async (req, res) => {
    const {
      message,
      difficulty = 'Intermediate',
      mode = 'quick',
      history = [],
      referenceContext = '',
    } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!resolvedApiKey || !ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured in this environment.',
        details: 'Please ensure Default Gemini Key or GEMINI_API_KEY is configured in the environment / Secrets panel.',
        code: 'NO_API_KEY',
      });
    }

    // Set SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    let isAborted = false;
    res.on('close', () => {
      if (!res.writableEnded) {
        isAborted = true;
      }
    });

    const systemInstruction = getSystemInstruction(difficulty, mode, referenceContext);

    // Format conversation history (retain last 6 messages to prevent token bloat)
    const formattedContents: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const item of history.slice(-6)) {
        if (item && (item.role === 'user' || item.role === 'model')) {
          formattedContents.push({
            role: item.role,
            parts: [{ text: item.text || item.content || '' }],
          });
        }
      }
    }
    formattedContents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    // Select candidate models
    const candidateModels = mode === 'quick' ? FAST_MODELS : DEEP_MODELS;
    let streamSuccess = false;
    let lastError: any = null;

    for (const modelName of candidateModels) {
      if (isAborted) break;
      try {
        const stream = await ai.models.generateContentStream({
          model: modelName,
          contents: formattedContents,
          config: {
            systemInstruction,
          },
        });

        // Notify client of connected model
        res.write(`data: ${JSON.stringify({ type: 'start', model: modelName })}\n\n`);

        for await (const chunk of stream) {
          if (isAborted) break;
          const text = chunk.text || '';
          if (text) {
            res.write(`data: ${JSON.stringify({ type: 'chunk', text })}\n\n`);
          }
        }

        res.write(`data: ${JSON.stringify({ type: 'done', model: modelName })}\n\n`);
        res.write('data: [DONE]\n\n');
        streamSuccess = true;
        break; // Stream completed successfully
      } catch (err: any) {
        lastError = err;
        console.warn(`[QOVYRA] Model ${modelName} stream error:`, err.message || err);
        // Continue to fallback model if 503, 429, or 404
        continue;
      }
    }

    if (!streamSuccess && !isAborted) {
      const errorMsg = lastError?.message || 'Failed to stream response from AI Quality Mentor';
      res.write(
        `data: ${JSON.stringify({
          type: 'error',
          error: errorMsg,
          code: lastError?.status === 503 ? 'SERVICE_UNAVAILABLE' : 'STREAM_ERROR',
        })}\n\n`
      );
      res.write('data: [DONE]\n\n');
    }

    res.end();
  });

  // NON-STREAMING CHAT ENDPOINT (Backward Compatibility)
  app.post('/api/mentor/chat', async (req, res) => {
    try {
      const {
        message,
        difficulty = 'Intermediate',
        mode = 'quick',
        history = [],
        referenceContext = '',
      } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      if (!resolvedApiKey || !ai) {
        return res.status(503).json({
          error: 'Gemini API key is not configured in this environment.',
          details: 'Please ensure Default Gemini Key or GEMINI_API_KEY is configured in the environment / Secrets panel.',
          code: 'NO_API_KEY',
        });
      }

      const systemInstruction = getSystemInstruction(difficulty, mode, referenceContext);

      const formattedContents: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];
      if (Array.isArray(history) && history.length > 0) {
        for (const item of history.slice(-6)) {
          if (item && (item.role === 'user' || item.role === 'model')) {
            formattedContents.push({
              role: item.role,
              parts: [{ text: item.text || item.content || '' }],
            });
          }
        }
      }
      formattedContents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const candidateModels = mode === 'quick' ? FAST_MODELS : DEEP_MODELS;
      let replyText = '';
      let usedModel = candidateModels[0];
      let lastErr: any = null;

      for (const m of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: m,
            contents: formattedContents,
            config: {
              systemInstruction,
            },
          });
          replyText = response.text || '';
          usedModel = m;
          break;
        } catch (e: any) {
          lastErr = e;
          console.warn(`[QOVYRA] Non-streaming model ${m} failed:`, e.message || e);
          continue;
        }
      }

      if (!replyText && lastErr) {
        throw lastErr;
      }

      return res.json({
        reply: replyText || 'No response generated.',
        model: usedModel,
        timestamp: new Date().toISOString(),
      });
    } catch (err: any) {
      console.error('Error generating AI mentor response:', err);
      return res.status(500).json({
        error: 'Failed to generate response from QOVYRA AI Quality Mentor',
        message: err.message || 'Unknown error occurred',
      });
    }
  });

  // Contact form submission endpoint
  app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }
    return res.status(200).json({
      received: true,
      sender: { name, email, subject },
      note: 'Message validated by QOVYRA server gateway. Production outbound SMTP / AWS SES email integration requires server credential configuration. For direct inquiries, reach out directly to singhjagriti200328@gmail.com.',
      contactEmail: 'singhjagriti200328@gmail.com',
    });
  });

  // In production, serve built dist folder; in dev, serve via Vite middleware
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`QOVYRA server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
