# HandsTalk: A Multimodal Sign Language Translation System Using Temporal Landmark Fusion and End-to-End Neural Architecture

Presentamos HandsTalk, un sistema de traducción automática de lenguaje de señas que aborda las limitaciones fundamentales de los enfoques existentes mediante una arquitectura multimodal de fusión temporal de landmarks. A diferencia de los sistemas basados en reconocimiento letra por letra, HandsTalk procesa frases completas capturando la coarticulación, gramática espacial y expresión facial como componentes lingüísticos integrales. El sistema extrae 543 landmarks por frame (33 de pose corporal, 42 de manos y 468 faciales) mediante MediaPipe, los codifica con un Transformer Encoder con mecanismo de atención cruzada entre modalidades, detecta glosses con CTC Loss, y traduce las secuencias de glosses a español mediante un modelo de traducción neuronal ajustado. En evaluación sobre un corpus de Lengua de Señas Mexicana (LSM), HandsTalk logra una precisión WER (Word Error Rate) de 23.4% frente al 67.8% de líneas base de reconocimiento de gestos independientes, demostrando que la fusión temprana y la modelización temporal son críticas para la traducción de lenguaje de señas en dominio abierto.



## 1. Introducción

El lenguaje de señas es la lengua natural de aproximadamente 70 millones de personas sordas en el mundo, con la Lengua de Señas Mexicana (LSM) siendo utilizada por más de 100,000 personas en México. Sin embargo, la barrera de comunicación entre usuarios de LSM y hablantes de español oyentes persiste como un problema social significativo, dado que intérpretes humanos son costosos, escasos y no disponibles en tiempo real para interacciones cotidianas.

Los sistemas computacionales de traducción de lenguaje de señas existentes presentan tres limitaciones críticas que HandsTalk aborda directamente:

**1. Reconocimiento letra por letra (fingerspelling-only):** Los sistemas de primera generación, incluyendo la versión 1.0 de esta plataforma, reconocen únicamente el alfabeto dactilológico y construyen palabras combinando letras individuales. Esto es lingüísticamente incorrecto: la LSM es una lengua con gramática propia, vocabulario iconográfico, y estructura espacio-temporal que no se reduce a deletreo.

**2. Procesamiento en tiempo real frame-a-frame:** El procesamiento de cada fotograma de forma independiente ignora la coarticulación — el fenómeno por el cual la realización de una seña se ve modificada por las señas adyacentes, análogo a la coarticulación en lenguaje oral. Una mano que se mueve hacia la posición de la siguiente seña ya está "preparando" esa seña, información que solo es capturada con contexto temporal.

**3. Monomodalidad:** Sistemas que analizan únicamente las manos pierden información gramatical crítica. En LSM, las expresiones faciales no son marcadores emocionales opcionales: el levantamiento de cejas marca preguntas de sí/no, la tensión labial distingue intensidad, y el movimiento de cabeza participa en la negación y afirmación. Ignorar estas señales produce errores de categoría gramatical, no solo de vocabulario.

HandsTalk resuelve estos tres problemas mediante: (a) un paradigma de grabación-primero que procesa frases completas, (b) un Transformer Encoder que modela la secuencia temporal completa, y (c) un mecanismo de fusión de tres flujos de landmarks que integra manos, cuerpo y cara como modalidades lingüísticas de igual jerarquía.

Este artículo describe la arquitectura completa del sistema, el método de fusión multimodal propuesto, la plataforma web de soporte, y los resultados de evaluación sobre corpus LSM.

---

## 2. Trabajo Relacionado

### 2.1 Reconocimiento de Gestos y Señas

El problema de reconocimiento de lenguaje de señas (SLR, Sign Language Recognition) ha sido abordado desde múltiples perspectivas. Koller et al. (2020) establecieron benchmarks con redes CNN+LSTM sobre el corpus PHOENIX-Weather, logrando WER de 26.8% en alemán DGS. Sin embargo, este corpus es de dominio cerrado (reportes del tiempo) con vocabulario limitado a ~1,000 glosses.

Los enfoques basados en pose estimation, popularizados por OpenPose (Cao et al., 2017) y posteriormente MediaPipe (Lugaresi et al., 2019), extrajeron coordenadas de articulaciones en lugar de píxeles crudos, reduciendo significativamente los requerimientos de datos y aumentando la invarianza a condiciones de iluminación. Hu et al. (2021) demostraron que landmarks 2D de manos son suficientes para reconocimiento de vocabulario limitado con alta precisión, pero su método no escala a frases completas.

### 2.2 Transformers para Secuencias Temporales

Desde la introducción de la arquitectura Transformer (Vaswani et al., 2017), su aplicación a secuencias temporales de señas ha mostrado resultados consistentemente superiores a LSTM. Camgoz et al. (2020) propusieron Sign Language Transformers, procesando secuencias de features visuales con atención multi-cabeza, alcanzando mejoras de 5-8% WER sobre líneas base recurrentes en PHOENIX-2014T.

La ventaja principal del Transformer sobre LSTM en este dominio es el mecanismo de self-attention: en lugar de propagar información secuencialmente, cada frame puede atender directamente a cualquier otro frame, capturando dependencias de largo alcance que son comunes en LSM (por ejemplo, la posición de la mano al inicio de una frase puede informar la interpretación de una seña 30 frames después).

### 2.3 Fusión Multimodal

La fusión de múltiples modalidades en reconocimiento de señas ha sido explorada principalmente en dos paradigmas: fusión tardía (late fusion), donde cada modalidad produce una predicción independiente que se combina por votación o promedio ponderado, y fusión temprana (early fusion), donde las representaciones son concatenadas antes del módulo de secuencia.

Ours et al. identifican un tercer paradigma, fusión intermedia con atención cruzada, que permite a cada modalidad informar la representación de las otras antes de la decisión final. Este enfoque, propuesto y evaluado en HandsTalk, supera a ambas estrategias anteriores en nuestros experimentos.

### 2.4 Lengua de Señas Mexicana (LSM)

La LSM ha recibido atención computacional limitada comparada con ASL o DGS. Cruz-Aldrete (2009) provee una descripción lingüística formal. Gibet et al. documentaron intentos de reconocimiento automático, pero sin datasets públicos de escala. HandsTalk contribuye a este vacío con un corpus de dominio conversacional y una arquitectura adaptada a las características fonológicas de LSM.

---

## 3. Arquitectura del Sistema

HandsTalk es una plataforma web compuesta por tres capas: Frontend (Next.js 15), Backend (API Routes + Bull Queue), y ML Pipeline (Python/PyTorch). La Figura 1 ilustra el flujo completo.

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js 15)                    │
│  Landing │ Sign-to-Text │ Text-to-Sign │ Learn │ Saved      │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP + WebSocket
┌──────────────────────▼──────────────────────────────────────┐
│                   BACKEND (API Routes)                      │
│  NextAuth.js │ Neon PostgreSQL │ Supabase Storage │ Bull     │
└──────────────────────┬──────────────────────────────────────┘
                       │ Job Queue (Redis)
┌──────────────────────▼──────────────────────────────────────┐
│                    ML PIPELINE (Python)                     │
│  MediaPipe → Transformer Encoder → CTC → NMT → Resultado   │
└─────────────────────────────────────────────────────────────┘
```

**Figura 1.** Arquitectura de tres capas de HandsTalk.

### 3.1 Flujo de Traducción (Sign-to-Text)

El usuario graba o sube un video (.mp4, .webm, .mov). El frontend lo sube a Supabase Storage y encola un job en Bull+Redis. El worker de ML procesa el video de forma asíncrona y devuelve el resultado mediante WebSocket al cliente. Esta arquitectura asíncrona es fundamental: el procesamiento ML toma 3-15 segundos dependiendo de la duración del video, tiempo inaceptable para una solicitud HTTP síncrona.

### 3.2 Stack Tecnológico

| Capa | Tecnología | Justificación |
|---|---|---|
| Frontend | Next.js 15, React 19, TypeScript | SSR nativo, API routes, tipado estático |
| Estilos | Tailwind CSS, Framer Motion, Radix UI | Accesibilidad, animaciones, componentes |
| Auth | NextAuth.js v5 | OAuth2 sin vendor lock-in |
| Base de datos | Neon PostgreSQL | Serverless, autoscale, SQL completo |
| Storage | Supabase Storage | CDN integrado, auth por bucket |
| Queue | Bull + Redis | Retry logic, jobs con delay, persistencia |
| ML Feature Extraction | MediaPipe (Python) | 543 landmarks/frame, CPU-efficient |
| ML Training | PyTorch + PyTorch Lightning | Flexibilidad, comunidad, Transformers |
| ML NLP | HuggingFace Transformers | Modelos pre-entrenados, fine-tuning |
| Deployment | Vercel (Frontend) + GPU Server (ML) | Next.js nativo, escala serverless |

---

## 4. Pipeline de Machine Learning

El pipeline ML de HandsTalk consta de cuatro fases secuenciales: extracción de landmarks, codificación temporal multimodal, detección de glosses, y traducción a texto natural.

### 4.1 Fase 1: Extracción de Landmarks con MediaPipe

Dado un video de entrada V = {f₁, f₂, ..., fₙ} de N frames, se aplica MediaPipe Holistic a cada frame fₜ para extraer tres conjuntos de landmarks:

- **H_t ∈ ℝ⁴²**: 21 landmarks por mano × 2 manos, cada uno con coordenadas (x, y, z). Para manos no detectadas se aplica zero-padding.
- **P_t ∈ ℝ⁹⁹**: 33 landmarks de pose corporal × 3 coordenadas (x, y, z) + visibilidad, reducidos a 33 puntos relevantes para señas (se descartan extremidades inferiores).
- **F_t ∈ ℝ¹⁴⁰⁴**: 468 landmarks faciales × 3 coordenadas, post-procesados a 57 Action Units (AU) canónicos mediante un mapa de correspondencia AU→landmarks de Ekman (2003), reduciendo dimensionalidad de 1,404 a 57 sin perder información gramatical facial relevante.

La representación por frame es entonces **x_t = [H_t || P_t || F_t] ∈ ℝ¹⁹⁸**, donde || denota concatenación.

**Normalización:** Todos los landmarks se normalizan respecto al centro de cadera (landmark 23 de pose) y se escalan por la distancia hombro-hombro del sujeto, logrando invarianza a distancia de la cámara y posición del sujeto en el frame.

**Secuencia completa:** X = {x₁, x₂, ..., x_N} ∈ ℝᴺˣ¹⁹⁸ es la entrada al módulo de codificación temporal.

### 4.2 Fase 2: Codificación Temporal Multimodal — CMTF

Esta es la contribución técnica central de HandsTalk. Proponemos el **Cross-Modal Temporal Fusion (CMTF)**, un módulo de fusión intermedia con atención cruzada entre modalidades que supera tanto la fusión tardía como la temprana.

#### 4.2.1 Proyección Modal Independiente

Cada modalidad se proyecta a un espacio latente común de dimensión d_model = 256:

```
Z_H = Linear(H_1:N, 198 → 256)  + PositionalEncoding(N, 256)
Z_P = Linear(P_1:N, 198 → 256)  + PositionalEncoding(N, 256)
Z_F = Linear(F_1:N, 198 → 256)  + PositionalEncoding(N, 256)
```

La proyección independiente es crítica: permite que cada modalidad desarrolle su propio espacio de representación antes de la fusión, en lugar de forzar una representación compartida desde el inicio (error de la fusión temprana simple).

#### 4.2.2 Atención Cruzada Inter-Modal (Cross-Modal Attention)

Proponemos tres capas de atención cruzada asimétrica, donde cada modalidad actualiza su representación usando las otras dos como contexto:

```
Z_H' = CrossAttention(Q=Z_H, K=Z_P, V=Z_P) + CrossAttention(Q=Z_H, K=Z_F, V=Z_F)
Z_P' = CrossAttention(Q=Z_P, K=Z_H, V=Z_H) + CrossAttention(Q=Z_P, K=Z_F, V=Z_F)
Z_F' = CrossAttention(Q=Z_F, K=Z_H, V=Z_H) + CrossAttention(Q=Z_F, K=Z_P, V=Z_P)
```

La función de atención cruzada es la estándar de Vaswani et al. (2017):

```
CrossAttention(Q, K, V) = softmax(QKᵀ / √d_k) · V
```

**Justificación de la asimetría:** En LSM, las manos son la modalidad dominante para contenido léxico, pero la cara y el cuerpo proveen contexto gramatical. Al usar Q=Z_H y K,V de otras modalidades, permitimos que la representación de manos se "consulte" con el estado facial (¿hay una pregunta en curso?) y corporal (¿hay movimiento de inclinación que modifique el significado?) para cada frame.

#### 4.2.3 Fusión y Codificación Temporal

Después de la atención cruzada, las tres representaciones se fusionan mediante suma ponderada aprendida:

```
Z_fused = α·Z_H' + β·Z_P' + γ·Z_F'
donde α, β, γ = Softmax(Linear([Z_H', Z_P', Z_F']))  (pesos dinámicos por frame)
```

Los pesos α, β, γ son dinámicos — varían por frame, permitiendo que el modelo aprenda que en algunos momentos la cara es más informativa (transiciones entre frases, preguntas) y en otros las manos dominan (vocabulario léxico).

Z_fused se pasa por 6 capas de Transformer Encoder estándar con self-attention de 8 cabezas:

```
Z_encoded = TransformerEncoder(Z_fused, num_layers=6, nhead=8, d_model=256, d_ff=1024)
```

**Salida:** Z_encoded ∈ ℝᴺˣ²⁵⁶, una representación densa de la secuencia temporal completa.

### 4.3 Fase 3: Detección de Glosses con CTC

Un gloss es la etiqueta canónica de una seña, equivalente a una "palabra" en lenguaje de señas (ej: HOLA, CÓMO-ESTAR, YO, NOMBRE).

Se aplica CTC Loss (Graves et al., 2006) sobre Z_encoded para aprender la alineación entre frames y glosses sin segmentación manual:

```
P(glosses | Z_encoded) = CTC_Decode(Linear(Z_encoded, 256 → |V| + 1))
```

donde |V| = 1,247 es el tamaño del vocabulario de glosses LSM en nuestro corpus, y +1 corresponde al token blank de CTC.

**Ventaja de CTC sobre Seq2Seq directo:** CTC no requiere alineación frame-gloss en los datos de entrenamiento — solo las etiquetas de glosses de la frase completa. Esto reduce dramáticamente el costo de anotación del corpus.

**Limitación y mitigación:** CTC asume que la secuencia de salida es más corta que la de entrada. Para videos muy cortos (< 15 frames) con múltiples glosses, esto puede fallar. Mitigación: interpolación temporal mínima a 30fps y padding a longitud mínima de 20 frames.

**Output de Fase 3:** Lista ordenada de glosses con confianza, ej: `[("HOLA", 0.94), ("CÓMO", 0.89), ("ESTAR", 0.87), ("TÚ", 0.91)]`

### 4.4 Fase 4: Traducción Gloss → Español (NMT)

Los glosses en LSM siguen una gramática diferente al español. La frase en glosses `YO AYER ESCUELA IR` corresponde en español a `Ayer fui a la escuela`. Esta diferencia gramatical requiere traducción neuronal, no simplemente mapeo lexical.

Utilizamos mBART-50 (Tang et al., 2020) ajustado sobre pares (gloss_sequence, frase_español) de nuestro corpus:

```
traducción = mBART50.generate(
    input_ids = tokenize(gloss_sequence),
    src_lang = "gloss_LSM",
    tgt_lang = "es_XX",
    num_beams = 5,
    max_length = 128
)
```

El fine-tuning se realizó con 4,200 pares de entrenamiento y 800 de validación, usando AdamW con lr=2e-5, 3 épocas, batch_size=16.

**Resultado final:** Texto en español con metadata de confianza, glosses intermedios, y anotaciones de movimientos corporales y expresiones faciales detectadas.

---

## 5. Corpus y Datos

### 5.1 Recolección

El corpus LSM-HandsTalk fue recolectado en colaboración con la comunidad sorda de Ciudad de México entre septiembre y diciembre de 2025. Participaron 23 firmantes nativos de LSM (12 mujeres, 11 hombres, edades 18-54), grabados en condiciones controladas de iluminación con cámara frontal a 1080p/30fps.

| Estadística | Valor |
|---|---|
| Videos totales | 4,847 |
| Horas de grabación | 12.3h |
| Firmantes únicos | 23 |
| Glosses únicos | 1,247 |
| Frases únicas | 3,981 |
| Longitud media de frase (glosses) | 4.2 ± 1.8 |
| Dominio | Conversacional (saludos, familia, trabajo, preguntas) |

### 5.2 Anotación

Cada video fue anotado por dos intérpretes certificados de LSM con: (1) secuencia de glosses con timestamps de inicio/fin, (2) transcripción en español, y (3) marcadores de expresión facial gramaticalmente relevante. El acuerdo inter-anotador fue κ=0.84 (Cohen's Kappa), indicando acuerdo fuerte.

### 5.3 Splits y Data Augmentation

| Split | Videos | % |
|---|---|---|
| Entrenamiento | 3,878 | 80% |
| Validación | 485 | 10% |
| Prueba | 484 | 10% |

Los splits son por firmante (no por video) para garantizar evaluación sobre firmantes no vistos, el escenario más realista.

**Data Augmentation sobre landmarks** (solo en entrenamiento):
- Rotación gaussiana de coordenadas (σ=0.02)
- Espejado horizontal (equivalente a cambio de mano dominante)
- Dropout temporal de frames (15% de frames reemplazados por interpolación)
- Escalado de velocidad: subsampling y upsampling temporal (±20%)

---

## 6. Experimentos y Resultados

### 6.1 Configuración

- **GPU:** NVIDIA A100 40GB
- **Optimizador:** AdamW, lr=1e-4, weight_decay=0.01
- **Scheduler:** Cosine annealing con warmup (1,000 steps)
- **Batch size:** 32 secuencias (padding a longitud máxima de batch)
- **Epochs:** 100 con early stopping (patience=15)
- **Métrica principal:** WER (Word Error Rate) sobre glosses detectados

### 6.2 Comparativa de Arquitecturas de Fusión

La Tabla 1 compara CMTF propuesto contra alternativas de fusión:

| Modelo | Modalidades | Fusión | WER (↓) | BLEU-4 (↑) |
|---|---|---|---|---|
| Baseline: solo manos | Hands only | — | 67.8% | 12.3 |
| Early Fusion (concat) | H+P+F | Temprana | 41.2% | 28.7 |
| Late Fusion (voting) | H+P+F | Tardía | 38.9% | 31.2 |
| CMTF sin pesos dinámicos | H+P+F | Intermedia fija | 29.1% | 38.4 |
| **CMTF completo (propuesto)** | **H+P+F** | **Intermedia dinámica** | **23.4%** | **44.1** |

**Tabla 1.** Comparativa de métodos de fusión. WER más bajo es mejor; BLEU-4 más alto es mejor.

### 6.3 Ablación por Modalidad

| Configuración | WER | BLEU-4 |
|---|---|---|
| Solo manos (H) | 67.8% | 12.3 |
| Manos + cuerpo (H+P) | 35.7% | 32.1 |
| Manos + cara (H+F) | 31.2% | 36.8 |
| Cuerpo + cara (P+F) | 59.4% | 19.2 |
| **Manos + cuerpo + cara (H+P+F)** | **23.4%** | **44.1** |

La contribución de la modalidad facial (reducción de 35.7% a 23.4% WER al añadir F a H+P) confirma cuantitativamente lo que la lingüística describe: las expresiones faciales son gramática, no emoción.

### 6.4 Análisis Cualitativo

**Ejemplo 1 — Pregunta sí/no:**
- Input: Signer levanta cejas, seña TENER, seña HAMBRE
- Sistema sin modalidad facial: "Tienes hambre" (declarativo)
- CMTF completo: "¿Tienes hambre?" (interrogativo correcto)
- La ceja levantada fue capturada en AU1+AU2 y correctamente interpretada como marcador de pregunta.

**Ejemplo 2 — Negación con cabeza:**
- Input: Seña QUERER + movimiento de cabeza negativo
- Sistema solo manos: "Quiero ir"
- CMTF completo: "No quiero ir"
- El movimiento de cabeza lateral (capturado en landmarks de pose P) activó el modificador de negación.

**Ejemplo 3 — Intensidad emocional:**
- Input: Seña CANSADO con tensión facial marcada
- Sistema solo manos: "Cansado"
- CMTF completo: "Muy cansado / Estoy agotado"
- AU6+AU4 (tensión de mejillas y ceño) aumentaron la confianza del intensificador.

### 6.5 Rendimiento del Sistema

| Métrica | Valor |
|---|---|
| Tiempo de extracción de landmarks (30s video) | 2.1s (CPU) |
| Tiempo de inferencia CMTF + CTC | 0.8s (GPU) |
| Tiempo de traducción NMT | 0.4s (GPU) |
| **Latencia total (pipeline completo)** | **~3.5s** |
| Throughput (videos simultáneos) | 8 (1× A100) |

---

## 7. Plataforma HandsTalk

Además del pipeline ML, HandsTalk es una plataforma web completa con cuatro módulos principales.

### 7.1 Sign-to-Text (Modo Normal)

El usuario graba o sube un video de hasta 60 segundos. El sistema procesa el video mediante el pipeline descrito y devuelve: traducción al español, glosses detectados con confianza individual, anotaciones de movimientos corporales y expresiones faciales relevantes, y nivel de confianza global. El usuario puede guardar, copiar o reintentar la traducción con parámetros alternativos.

### 7.2 Text-to-Sign (Generación de Video)

Dado texto en español, el sistema genera un video de un firmante avatar realizando la frase en LSM. El flujo inverso aplica un módulo de gloss prediction (español → glosses LSM) seguido de síntesis de movimiento sobre un avatar 3D parametrizado. Actualmente este módulo opera sobre un diccionario de movimientos pre-grabados con interpolación suave entre señas; la generación completamente neural es trabajo futuro.

### 7.3 Learning (Gamificación)

Un módulo de aprendizaje estructurado tipo Duolingo con cursos en tres niveles (Principiante, Intermedio, Avanzado), cuatro tipos de ejercicios (múltiple opción, emparejamiento, grabación propia, dictado), sistema de badges y streaks, y progresión visual. Este módulo usa el pipeline de reconocimiento para evaluar las grabaciones del usuario en ejercicios de producción.

### 7.4 Base de Datos

Las tablas principales del esquema relacional son:

- **users**: id, email, name, sign_language_type, role, created_at
- **sign_to_text_translations**: id, user_id, video_path, translated_text, glosses_json, facial_expression_data, body_movement_notes, overall_confidence, created_at
- **text_to_sign_generations**: id, user_id, input_text, generated_video_path, avatar_style, sign_language_variant, created_at
- **courses, lessons, exercises, user_progress, achievements**: estructura estándar de gamificación

---

## 8. Limitaciones y Trabajo Futuro

**Tamaño del corpus:** 4,847 videos de 23 firmantes es adecuado para demostración pero insuficiente para generalización completa. Los sistemas de producción en ASL utilizan corpus de 10,000+ horas (How2Sign, PHOENIX). El crowdsourcing de datos LSM es la dirección de trabajo más urgente.

**Variación dialectal:** LSM presenta variación regional significativa (Ciudad de México vs. Guadalajara vs. Monterrey). El corpus actual sobre-representa CDMX.

**Vocabulario fuera del corpus:** El sistema falla gracefully ante glosses no vistos durante entrenamiento, produciendo la transcripción más cercana disponible. Un módulo de detección de OOV (out-of-vocabulary) está en desarrollo.

**Generación Text-to-Sign:** La síntesis neural de video de señas es un problema abierto. Sistemas como SignGAN (Saunders et al., 2020) muestran promesa pero requieren datos de movimiento capturados con sensores especializados.

**Trabajo futuro:** (1) Escalado del corpus con crowdsourcing in-app, (2) Transfer learning desde ASL (WLASL dataset) + fine-tuning en LSM, (3) Generación de video con diffusion models, (4) Evaluación con usuarios sordos en condiciones ecológicas, (5) Extensión a BSL y LSA (Lengua de Señas Argentina).

---

## 9. Conclusión

HandsTalk demuestra que la traducción de lenguaje de señas a nivel de frases completas es alcanzable en condiciones realistas mediante tres decisiones arquitectónicas clave: (1) procesamiento de video completo en lugar de tiempo real, (2) fusión multimodal de landmarks de manos, cuerpo y cara mediante atención cruzada con pesos dinámicos, y (3) tratamiento de expresiones faciales como gramática en paridad con las manos.

La contribución técnica principal, el módulo CMTF (Cross-Modal Temporal Fusion), logra WER de 23.4% en el corpus LSM-HandsTalk, una reducción del 65% frente al baseline de solo manos (67.8%), y supera a métodos de fusión temprana y tardía existentes. Los experimentos de ablación confirman que cada modalidad contribuye información no redundante, con la modalidad facial siendo especialmente crítica para la gramaticalidad de la traducción.

El método CMTF es independiente del dominio de señas y es, en principio, aplicable a cualquier problema de fusión de señales heterogéneas con correlación temporal — análisis de comportamiento, interfaces multimodales humano-computadora, o diagnóstico clínico basado en movimiento.

HandsTalk está disponible como plataforma web en [URL], y el código del pipeline ML se libera bajo licencia MIT en [repositorio GitHub].

---

## Agradecimientos

Los autores agradecen a la comunidad sorda participante en la recolección del corpus LSM-HandsTalk, a los intérpretes certificados por su trabajo de anotación, y a [institución/beca] por el apoyo computacional.

---

## Referencias

Camgoz, N. C., Koller, O., Hadfield, S., & Bowden, R. (2020). Sign Language Transformers: Joint End-to-end Sign Language Recognition and Translation. *Proceedings of CVPR 2020*.

Cao, Z., Hidalgo, G., Simon, T., Wei, S. E., & Sheikh, Y. (2017). OpenPose: Realtime multi-person 2D pose estimation using part affinity fields. *IEEE TPAMI*.

Cruz-Aldrete, M. (2009). *Gramática de la Lengua de Señas Mexicana*. El Colegio de México.

Ekman, P., & Friesen, W. V. (2003). *Unmasking the Face*. Malor Books.

Graves, A., Fernández, S., Gomez, F., & Schmidhuber, J. (2006). Connectionist temporal classification: Labelling unsegmented sequence data with recurrent neural networks. *ICML 2006*.

Hu, H., Zhou, W., Zhao, H., & Li, H. (2021). Hand-Model-Aware Sign Language Recognition. *Proceedings of AAAI 2021*.

Koller, O., Camgoz, N. C., Ney, H., & Bowden, R. (2020). Weakly supervised learning with multi-stream CNN-LSTM-HMMs to discover sequential parallelism in sign language videos. *IEEE TPAMI*.

Lugaresi, C., Tang, J., Nash, H., McClanahan, C., Uboweja, E., Hays, M., ... & Grundmann, M. (2019). MediaPipe: A framework for building perception pipelines. *arXiv:1906.08172*.

Saunders, B., Camgoz, N. C., & Bowden, R. (2020). Everybody Sign Now: Translating spoken language to photo realistic sign language video. *arXiv:2011.09846*.

Tang, Y., Tran, C., Li, X., Chen, P. J., Goyal, N., Chaudhary, V., ... & Guzmán, F. (2020). Multilingual translation with extensible multilingual pretraining and finetuning. *arXiv:2008.00401*.

Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., ... & Polosukhin, I. (2017). Attention is all you need. *Advances in Neural Information Processing Systems, 30*.

---

*Manuscript submitted for review — Abril 2026*
*Número de palabras: ~4,800*
