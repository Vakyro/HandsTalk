# HANDSTALK v2.0 - RESUMEN EJECUTIVO

## 🎯 Visión General

HandsTalk es una plataforma web para traducción de lenguaje de señas que rompe las barreras de comunicación entre personas sordas/hipoacúsicas y oyentes, además de facilitar el aprendizaje estructurado de lenguas de señas (LSM, ASL, BSL, etc.).

**Dos pilares fundamentales:**
1. **Traducción**: Sign-to-Text (grabación + procesamiento) y Text-to-Sign (generación de video)
2. **Aprendizaje**: Gamificación tipo Duolingo con cursos, ejercicios y badges

---

## ❌ Problemas de v1.0 a Resolver

| Problema | Impacto | Solución v2.0 |
|----------|---------|---------------|
| Traducción letra-por-letra | No es lenguaje de señas real | Frases completas con contexto |
| Tiempo real insostenible | Pierde coarticulación y gramática | Grabar primero, procesar después |
| Sin multimodalidad | Falta información crítica (cara, cuerpo) | Fusión Transformer: manos + cuerpo + cara |
| Learning genérico | Poco atractivo, sin progresión | Cursos, badges, streaks, niveles |
| Deletetreo visual | No educa sobre lengua de señas real | Videos de frases completas |

---

## ✅ Cambios Conceptuales Clave en v2.0

### 1. De Tiempo Real a Grabación + Procesamiento

```
v1.0 (Incorrecto):
  Webcam continua → frame-by-frame → deletreo en vivo

v2.0 (Correcto):
  Grabar video → Procesar con contexto completo → Traducir frase entera
```

**Razón:** Los traductores reales (Google Translate, DeepL) NO traducen "en vivo". Esperan a tener contexto completo. El lenguaje de señas es temporal y tiene coarticulación.

### 2. De Letra-por-Letra a Video Generado

```
v1.0: Texto → [A→imagen, B→imagen, C→imagen]
v2.0: Texto → Modelo IA → Video persona/avatar firmando
```

### 3. Arquitectura Multimodal (NO 3 modelos + LLM)

**Incorrecto:**
- 3 modelos independientes (manos, cuerpo, emociones)
- LLM arbitrando outputs textuales
- Alucinaciones y falta de control

**Correcto:**
- Extracción de landmarks: manos (MediaPipe Hands) + cuerpo (Pose) + cara (Face Detection)
- Fusión temprana/intermedia: Transformer Encoder que aprende la combinación
- Decodificación end-to-end: Gloss detection → Traducción (CTC + NMT/LLM)
- Nota: **Expresiones faciales = GRAMÁTICA, no solo emoción**

---

## 📦 Stack Tecnológico Propuesto

### Frontend
- **Next.js 15** + **React 19** + **TypeScript**
- **Tailwind CSS** + **Framer Motion** (animaciones)
- **Radix UI** (componentes accesibles)
- **TanStack Query** (caching), **React Hook Form** + **Zod** (forms)

### Backend
- **Next.js API Routes** (RESTful)
- **NextAuth.js v5** (OAuth2 + JWT)
- **Neon PostgreSQL** (serverless)
- **Supabase Storage / AWS S3** (videos)
- **Bull + Redis** (job queue para procesamiento async)

### Machine Learning
- **MediaPipe Pose, Hands, Face** (extracción de landmarks)
- **Transformer Encoder** (temporal sequence modeling)
- **CTC Loss** (segmentación y gloss detection)
- **HuggingFace Transformers** (NLP, traducción)
- **LLM (Claude API)** (opcional: mejorar gloss→texto)
- **PyTorch / TensorFlow** (entrenamiento)
- **FFmpeg** (generación de video)

### DevOps
- **Vercel** (hosting frontend)
- **GitHub Actions** (CI/CD)
- **Sentry** (error tracking)
- **DataDog / New Relic** (monitoring)

---

## 🧠 Arquitectura ML Pipeline

### Flujo de Sign-to-Text (Normal Mode)

```
Video (.mp4) 
  ↓
[Fase 1] MediaPipe Landmarks Extraction
  → 100-200 dimensiones por frame (pose 33 + hands 42 + face 468)
  ↓
[Fase 2] Temporal Encoding (Transformer)
  → Procesa secuencia temporal, entiende coarticulación
  ↓
[Fase 3] CTC-based Gloss Prediction
  → Detecta dónde empieza/termina cada seña
  → Output: [GLOSS1 0.92, GLOSS2 0.88, ...]
  ↓
[Fase 4] Traducción (Gloss → Español)
  → NMT o LLM + prompt → "Hola, ¿cómo estás?"
  ↓
Resultado Final: Texto + Confianza + Metadata
```

### Datos Críticos: El Cuello de Botella Real

**SIN dataset LSM anotado, el modelo caerá al deletreo.** Necesitas:

- **1,000–5,000 videos LSM** de hablantes nativos
- **Anotaciones:** glosses, transcripción en español, alineación frame-by-frame (caro)
- **Consistencia de dialecto:** LSM ≠ ASL ≠ BSL

**Estrategias si no tienes datos:**

1. **Transfer Learning desde ASL:** Entrenar en ASL (dataset largo: WLASL, ASL-LEX), fine-tune con pocos datos LSM
2. **Crowdsourcing:** Plataforma para usuarios sordos contribuyan videos + traducciones
3. **Data Augmentation:** Rotaciones, luz, ruido en landmarks
4. **Dominio acotado:** Empezar con vocabulario limitado (saludos, preguntas básicas)
5. **Active Learning:** Mostrar ejemplos donde el modelo es inseguro → pedir corrección

---

## 🗄️ Estructura de Base de Datos

### Tablas Principales

**users**
- id, email, name, password_hash, sign_language_type, role, created_at

**sign_to_text_translations**
- id, user_id, video_path, translated_text, glosses (JSON), body_movement_notes (JSON)
- facial_expression_data (JSON), overall_confidence, translation_mode, is_saved, created_at

**text_to_sign_generations**
- id, user_id, input_text, generated_video_path, avatar_style, playback_speed
- sign_language_variant, is_saved, created_at

**courses, user_progress, achievements**
- Estructura estándar para gamificación

---

## 📅 Plan de Implementación (18 Semanas)

| Fase | Semanas | Entregables |
|------|---------|-------------|
| **1. MVP Foundation** | 1-3 | Landing page rediseñada, NextAuth.js, estructura base, Neon + migrations |
| **2. Sign-to-Text Normal** | 4-6 | Upload/record, MediaPipe PoC, mock processing, glosses, confianza |
| **3. Sign-to-Text Live** | 7-8 | Webcam mejorado, transcripción en vivo, pause/resume, guardar sesión |
| **4. Text-to-Sign Video** | 9-11 | Input text, mock video player, opciones (avatar, velocidad, variante), guardar |
| **5. Learning Playground** | 12-16 | Dashboard, cursos (3 niveles), 4 tipos de ejercicios, badges, progreso visual |
| **6. Saved + Polish** | 17-18 | Página /saved con tabs, búsqueda, UI refinement, testing E2E |

---

## 🎮 Casos de Uso Principales

### Caso 1: Usuario Sordo Traduce una Seña
```
1. Entra a /sign-to-text → selecciona modo Normal
2. Graba/sube video de la seña
3. Sistema procesa: landmarks → temporal encoding → gloss detection → traducción
4. Ve: "Probablemente dice: [Texto]. Glosses: [GLOSS1 0.92, GLOSS2 0.88]"
5. Puede: copiar, guardar, ver detalles (body movement, facial cues), reintentar
```

### Caso 2: Usuario Oyente Aprende LSM
```
1. Login → /learn (dashboard: progreso, streak, lección recomendada)
2. Selecciona curso: "Beginner"
3. Lección 1: Múltiple choice "¿Cuál es [SEÑA]?" → +10 puntos, streak +1
4. Lección 2: "Graba TÚ firmando" → mock evaluation → feedback
5. Completa curso → badge desbloqueado, progreso visible
```

### Caso 3: Docente Genera Contenido
```
1. /text-to-sign → escribe "Hoy es un día soleado"
2. Selecciona: Avatar=realistic, Velocidad=normal, Variante=LSM_SPAIN
3. Presiona Generar → loading skeleton → video con controles
4. Guarda → aparece en /saved, puede compartir URL
5. Puede regenerar con diferentes opciones
```

---

## ⚠️ Puntos Críticos a Tener en Cuenta

### 1. **El Dataset es el Cuello de Botella**
Sin datos LSM anotados, caerás al deletreo. Prioriza crowdsourcing o transfer learning desde ASL desde el Sprint 1.

### 2. **No Arbitres con LLM Genérico**
Los componentes visuales (manos, cuerpo, cara) deben entrenarse end-to-end con fusión arquitectónica. Un LLM interpretando tres textos independientes alucinará.

### 3. **Expresiones Faciales = Gramática**
Una ceja levantada cambia el significado. No es "emoción extra", es lenguaje. Trátalo como tal en el modelo.

### 4. **Testing con Usuarios Sordos**
Involucra desde Sprint 1, no al final. Son tus expertos.

### 5. **Stack es Sólido**
Next.js + TypeScript + Neon + MediaPipe + PyTorch escala bien.

---

## 🚀 Roadmap a Largo Plazo

### v2.0 (Actual)
- Sign-to-text (normal + live) con mock ML
- Text-to-sign (mock generador)
- Learning gamificado

### v2.5 (Real ML Deployment)
- Entrenar modelos reales con dataset LSM
- Integración de generador de video real (Synthesia, D-ID, o propio)
- Multilingüe (LSM, ASL, BSL)

### v3.0 (Enterprise)
- API pública para terceros
- Interpretación en vivo (eventos, reuniones)
- Dashboards para educadores
- Certificaciones

---

## 📋 Recomendaciones de Acción Inmediata

1. **Fase 1 MVP:** Focus en landing, auth, sign-to-text Normal mode con MediaPipe PoC (3-4 semanas)
2. **Paralelo:** Busca dataset LSM o inicia diálogos con comunidades sordas
3. **Infraestructura:** Configura Neon + S3 + Redis para estar listo para ML real
4. **Testing:** Involucra usuarios sordos desde Sprint 1
5. **Documentación:** Mantén este informe actualizado (es tu north star)

---

## 📊 Matriz de Decisión: Por Qué Esta Arquitectura

| Decisión | Alternativa | Por Qué Se Elige | Trade-off |
|----------|-------------|------------------|-----------|
| Grabación sobre tiempo real | En tiempo real | Contexto completo, menos ruido | Latencia de segundos |
| CTC + Gloss→Texto | Seq2Seq directo | Glosses fáciles de anotar, reutilizar | Requiere buen gloss detector |
| Transformer para temporal | LSTM | Mejor coarticulación, attention visualizable | Más computación inicial |
| NextAuth.js | Auth0 / Cognito | Control total, cost-effective para MVP | Mantenimiento propio |
| Vercel + Neon | Heroku + Firebase | Escalabilidad y serverless nativo | Vendor lock-in menor |

---

## 🎯 Conclusión

Tu idea es **ambiciosa pero viable**. El cambio conceptual (grabación + procesamiento, multimodal, video real) es correcto. El stack es profesional. El riesgo principal es el dataset — abórdalo desde el inicio.

**Esta versión 2.0 será exponencialmente mejor que v1.0. Procede con confianza.**

---

*Documento generado: Abril 2026*
*Versión: 1.0 (MVP Architecture)*
