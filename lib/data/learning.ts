// Mock data for learning section

export interface Course {
  id: string
  title: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  lessonCount: number
  completedLessons: number
  imageUrl: string
  duration: string
  enrolled: boolean
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: string
  progress: number
  maxProgress: number
  category: 'streak' | 'learning' | 'practice' | 'social'
}

export interface Game {
  id: string
  title: string
  description: string
  icon: string
  skillsTrained: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  playCount: number
  bestScore?: number
}

export interface Exercise {
  id: string
  type: 'multiple_choice' | 'type_answer' | 'watch_and_interpret' | 'record_yourself'
  question: string
  videoUrl?: string
  imageUrl?: string
  options?: string[]
  correctAnswer: string
  hint?: string
}

export const courses: Course[] = [
  {
    id: 'basics-101',
    title: 'LSM para Principiantes',
    description: 'Aprende los fundamentos de la Lengua de Señas Mexicana, incluyendo el alfabeto dactilológico, números y saludos básicos.',
    level: 'beginner',
    lessonCount: 12,
    completedLessons: 5,
    imageUrl: '/courses/basics.jpg',
    duration: '2 horas',
    enrolled: true,
  },
  {
    id: 'everyday-phrases',
    title: 'Frases Cotidianas',
    description: 'Domina frases comunes para conversaciones diarias, desde pedir direcciones hasta ordenar comida.',
    level: 'beginner',
    lessonCount: 15,
    completedLessons: 0,
    imageUrl: '/courses/phrases.jpg',
    duration: '3 horas',
    enrolled: false,
  },
  {
    id: 'grammar-structure',
    title: 'Gramática y Sintaxis de LSM',
    description: 'Comprende la estructura gramatical única de la LSM, incluyendo la construcción tema-comentario e indicadores de tiempo.',
    level: 'intermediate',
    lessonCount: 10,
    completedLessons: 3,
    imageUrl: '/courses/grammar.jpg',
    duration: '2.5 horas',
    enrolled: true,
  },
  {
    id: 'storytelling',
    title: 'Narrativa en LSM',
    description: 'Aprende técnicas narrativas, cambio de roles y elementos expresivos para contar historias de forma atractiva en lengua de señas.',
    level: 'intermediate',
    lessonCount: 8,
    completedLessons: 0,
    imageUrl: '/courses/storytelling.jpg',
    duration: '2 horas',
    enrolled: false,
  },
  {
    id: 'deaf-culture',
    title: 'Cultura e Historia Sorda',
    description: 'Explora la rica historia y la vibrante cultura de la comunidad Sorda en México y el mundo.',
    level: 'beginner',
    lessonCount: 6,
    completedLessons: 6,
    imageUrl: '/courses/culture.jpg',
    duration: '1.5 horas',
    enrolled: true,
  },
  {
    id: 'advanced-vocabulary',
    title: 'Vocabulario Avanzado',
    description: 'Amplía tu vocabulario de señas con conceptos complejos, modismos y términos especializados en LSM.',
    level: 'advanced',
    lessonCount: 20,
    completedLessons: 0,
    imageUrl: '/courses/advanced.jpg',
    duration: '5 horas',
    enrolled: false,
  },
]

export const achievements: Achievement[] = [
  {
    id: 'first-sign',
    title: 'Primera Seña',
    description: 'Completa tu primera lección',
    icon: 'sparkles',
    unlocked: true,
    unlockedAt: '2024-01-15',
    progress: 1,
    maxProgress: 1,
    category: 'learning',
  },
  {
    id: 'week-streak',
    title: 'Guerrero Semanal',
    description: 'Mantén una racha de aprendizaje de 7 días',
    icon: 'flame',
    unlocked: true,
    unlockedAt: '2024-01-20',
    progress: 7,
    maxProgress: 7,
    category: 'streak',
  },
  {
    id: 'course-complete',
    title: 'Graduado del Curso',
    description: 'Completa cualquier curso completo',
    icon: 'graduation-cap',
    unlocked: true,
    unlockedAt: '2024-02-01',
    progress: 1,
    maxProgress: 1,
    category: 'learning',
  },
  {
    id: 'perfect-practice',
    title: 'Práctica Perfecta',
    description: 'Obtén 100% en 10 sesiones de práctica',
    icon: 'target',
    unlocked: false,
    progress: 6,
    maxProgress: 10,
    category: 'practice',
  },
  {
    id: 'month-streak',
    title: 'Maestro Mensual',
    description: 'Mantén una racha de aprendizaje de 30 días',
    icon: 'calendar',
    unlocked: false,
    progress: 12,
    maxProgress: 30,
    category: 'streak',
  },
  {
    id: 'vocabulary-500',
    title: 'Coleccionista de Señas',
    description: 'Aprende 500 señas',
    icon: 'book-open',
    unlocked: false,
    progress: 127,
    maxProgress: 500,
    category: 'learning',
  },
  {
    id: 'translator-pro',
    title: 'Pro de la Traducción',
    description: 'Usa el traductor 50 veces',
    icon: 'languages',
    unlocked: false,
    progress: 23,
    maxProgress: 50,
    category: 'practice',
  },
  {
    id: 'early-bird',
    title: 'Madrugador',
    description: 'Practica antes de las 7 AM durante 5 días',
    icon: 'sunrise',
    unlocked: false,
    progress: 2,
    maxProgress: 5,
    category: 'streak',
  },
]

export const games: Game[] = [
  {
    id: 'sign-match',
    title: 'Combina Señas',
    description: 'Combina señas con sus significados en un formato de juego de memoria',
    icon: 'grid-3x3',
    skillsTrained: ['Reconocimiento', 'Memoria'],
    difficulty: 'easy',
    playCount: 15,
    bestScore: 850,
  },
  {
    id: 'speed-sign',
    title: 'Señas Rápidas',
    description: 'Identifica la mayor cantidad de señas posible antes de que se acabe el tiempo',
    icon: 'timer',
    skillsTrained: ['Reconocimiento Rápido', 'Vocabulario'],
    difficulty: 'medium',
    playCount: 8,
    bestScore: 1200,
  },
  {
    id: 'phrase-builder',
    title: 'Constructor de Frases',
    description: 'Ordena las señas correctamente para formar frases completas',
    icon: 'blocks',
    skillsTrained: ['Gramática', 'Estructura de Oraciones'],
    difficulty: 'medium',
    playCount: 12,
  },
  {
    id: 'story-mode',
    title: 'Modo Historia',
    description: 'Ve historias en lengua de señas y responde preguntas de comprensión',
    icon: 'book',
    skillsTrained: ['Comprensión', 'Contexto'],
    difficulty: 'hard',
    playCount: 3,
  },
]

export interface CourseLesson {
  id: string
  number: number
  title: string
  description: string
  duration: string
  type: 'video' | 'practice' | 'quiz' | 'review'
  completed: boolean
  locked: boolean
  xpReward: number
}

export interface CourseWithLessons extends Course {
  whatYouLearn: string[]
  prerequisites?: string
  lessons: CourseLesson[]
}

export const courseDetails: Record<string, CourseWithLessons> = {
  'basics-101': {
    id: 'basics-101',
    title: 'LSM para Principiantes',
    description: 'Aprende los fundamentos de la Lengua de Señas Mexicana, incluyendo el alfabeto dactilológico, números y saludos básicos.',
    level: 'beginner',
    lessonCount: 12,
    completedLessons: 5,
    imageUrl: '/courses/basics.jpg',
    duration: '2 horas',
    enrolled: true,
    whatYouLearn: [
      'El alfabeto dactilológico completo',
      'Números del 1 al 100',
      'Saludos y despedidas cotidianas',
      'Expresiones de cortesía esenciales',
      'Vocabulario del entorno inmediato',
    ],
    prerequisites: undefined,
    lessons: [
      { id: 'b1', number: 1, title: 'El Alfabeto Dactilológico', description: 'Aprende a deletrear con las manos usando el sistema manual de la LSM.', duration: '10 min', type: 'video', completed: true, locked: false, xpReward: 20 },
      { id: 'b2', number: 2, title: 'Números del 1 al 10', description: 'Las señas básicas para los primeros diez números.', duration: '8 min', type: 'video', completed: true, locked: false, xpReward: 20 },
      { id: 'b3', number: 3, title: 'Saludos Básicos', description: 'Hola, adiós, buenos días, buenas tardes y buenas noches.', duration: '10 min', type: 'video', completed: true, locked: false, xpReward: 20 },
      { id: 'b4', number: 4, title: 'Expresiones de Cortesía', description: 'Por favor, gracias, de nada, perdón y disculpa.', duration: '8 min', type: 'video', completed: true, locked: false, xpReward: 20 },
      { id: 'b5', number: 5, title: 'Colores y Formas', description: 'Los colores principales y las formas geométricas básicas.', duration: '10 min', type: 'practice', completed: true, locked: false, xpReward: 25 },
      { id: 'b6', number: 6, title: 'Partes del Cuerpo', description: 'Aprende a señar las partes del cuerpo humano.', duration: '12 min', type: 'video', completed: false, locked: false, xpReward: 20 },
      { id: 'b7', number: 7, title: 'Familia y Relaciones', description: 'Mamá, papá, hermano, hermana, abuelos y más.', duration: '10 min', type: 'video', completed: false, locked: true, xpReward: 20 },
      { id: 'b8', number: 8, title: 'Animales Comunes', description: 'Los animales más comunes del hogar y la naturaleza.', duration: '10 min', type: 'video', completed: false, locked: true, xpReward: 20 },
      { id: 'b9', number: 9, title: 'Comida y Bebidas', description: 'Vocabulario esencial para pedir comida y hablar de alimentos.', duration: '12 min', type: 'practice', completed: false, locked: true, xpReward: 25 },
      { id: 'b10', number: 10, title: 'Lugares y Direcciones', description: 'Cómo indicar lugares y dar direcciones sencillas.', duration: '14 min', type: 'video', completed: false, locked: true, xpReward: 20 },
      { id: 'b11', number: 11, title: 'El Tiempo y las Estaciones', description: 'Habla del clima, las estaciones y los días de la semana.', duration: '10 min', type: 'video', completed: false, locked: true, xpReward: 20 },
      { id: 'b12', number: 12, title: 'Repaso y Práctica Final', description: 'Consolida todo lo aprendido con ejercicios de repaso.', duration: '20 min', type: 'quiz', completed: false, locked: true, xpReward: 50 },
    ],
  },
  'everyday-phrases': {
    id: 'everyday-phrases',
    title: 'Frases Cotidianas',
    description: 'Domina frases comunes para conversaciones diarias, desde pedir direcciones hasta ordenar comida.',
    level: 'beginner',
    lessonCount: 15,
    completedLessons: 0,
    imageUrl: '/courses/phrases.jpg',
    duration: '3 horas',
    enrolled: false,
    whatYouLearn: [
      'Frases para conversaciones del día a día',
      'Cómo pedir direcciones y ubicarte',
      'Vocabulario para restaurantes y tiendas',
      'Expresiones de emergencia',
      'Conversaciones básicas completas',
    ],
    lessons: Array.from({ length: 15 }, (_, i) => ({
      id: `ep${i + 1}`,
      number: i + 1,
      title: `Lección ${i + 1}`,
      description: 'Contenido disponible al inscribirte.',
      duration: '10 min',
      type: 'video' as const,
      completed: false,
      locked: true,
      xpReward: 20,
    })),
  },
  'grammar-structure': {
    id: 'grammar-structure',
    title: 'Gramática y Sintaxis de LSM',
    description: 'Comprende la estructura gramatical única de la LSM, incluyendo la construcción tema-comentario e indicadores de tiempo.',
    level: 'intermediate',
    lessonCount: 10,
    completedLessons: 3,
    imageUrl: '/courses/grammar.jpg',
    duration: '2.5 horas',
    enrolled: true,
    whatYouLearn: [
      'Estructura de oraciones en LSM (Sujeto-Objeto-Verbo)',
      'El espacio señado como herramienta gramatical',
      'Indicadores de tiempo pasado, presente y futuro',
      'Construcción tema-comentario',
      'Verbos de concordancia y clasificadores',
    ],
    prerequisites: 'LSM para Principiantes o conocimiento básico de LSM',
    lessons: [
      { id: 'g1', number: 1, title: 'Estructura Básica de Oraciones', description: 'El orden SOV (Sujeto-Objeto-Verbo) y cómo difiere del español.', duration: '14 min', type: 'video', completed: true, locked: false, xpReward: 25 },
      { id: 'g2', number: 2, title: 'El Sistema de Espacio Señado', description: 'Usa el espacio frente a ti como herramienta gramatical para ubicar personas y objetos.', duration: '16 min', type: 'video', completed: true, locked: false, xpReward: 25 },
      { id: 'g3', number: 3, title: 'Indicadores de Tiempo', description: 'Cómo expresar el pasado, presente y futuro sin conjugar verbos.', duration: '14 min', type: 'practice', completed: true, locked: false, xpReward: 30 },
      { id: 'g4', number: 4, title: 'Construcción Tema-Comentario', description: 'La estructura más común en LSM para enunciar y comentar sobre un tema.', duration: '16 min', type: 'video', completed: false, locked: false, xpReward: 25 },
      { id: 'g5', number: 5, title: 'Modificadores y Adjetivos', description: 'La posición de los adjetivos y cómo modifican al sustantivo en LSM.', duration: '12 min', type: 'video', completed: false, locked: true, xpReward: 25 },
      { id: 'g6', number: 6, title: 'Preguntas y Negaciones', description: 'Forma preguntas de sí/no y preguntas abiertas, y niega oraciones correctamente.', duration: '16 min', type: 'practice', completed: false, locked: true, xpReward: 30 },
      { id: 'g7', number: 7, title: 'Verbos de Concordancia', description: 'Verbos que se mueven en el espacio para indicar sujeto y objeto simultáneamente.', duration: '18 min', type: 'video', completed: false, locked: true, xpReward: 25 },
      { id: 'g8', number: 8, title: 'Clasificadores en LSM', description: 'Handshapes que representan categorías de objetos y personas en movimiento.', duration: '20 min', type: 'video', completed: false, locked: true, xpReward: 30 },
      { id: 'g9', number: 9, title: 'Expresiones Faciales Gramaticales', description: 'Cómo las expresiones faciales cambian el significado gramatical de una seña.', duration: '14 min', type: 'practice', completed: false, locked: true, xpReward: 30 },
      { id: 'g10', number: 10, title: 'Repaso Integral', description: 'Examen final que integra todos los conceptos gramaticales del curso.', duration: '25 min', type: 'quiz', completed: false, locked: true, xpReward: 60 },
    ],
  },
  'storytelling': {
    id: 'storytelling',
    title: 'Narrativa en LSM',
    description: 'Aprende técnicas narrativas, cambio de roles y elementos expresivos para contar historias de forma atractiva en lengua de señas.',
    level: 'intermediate',
    lessonCount: 8,
    completedLessons: 0,
    imageUrl: '/courses/storytelling.jpg',
    duration: '2 horas',
    enrolled: false,
    whatYouLearn: [
      'Técnicas narrativas en lengua de señas',
      'Cambio de roles para representar personajes',
      'Uso del espacio para construir escenas',
      'Elementos dramáticos y expresivos',
      'Narración de historias completas',
    ],
    prerequisites: 'Gramática y Sintaxis de LSM',
    lessons: Array.from({ length: 8 }, (_, i) => ({
      id: `st${i + 1}`,
      number: i + 1,
      title: `Lección ${i + 1}`,
      description: 'Contenido disponible al inscribirte.',
      duration: '15 min',
      type: 'video' as const,
      completed: false,
      locked: true,
      xpReward: 30,
    })),
  },
  'deaf-culture': {
    id: 'deaf-culture',
    title: 'Cultura e Historia Sorda',
    description: 'Explora la rica historia y la vibrante cultura de la comunidad Sorda en México y el mundo.',
    level: 'beginner',
    lessonCount: 6,
    completedLessons: 6,
    imageUrl: '/courses/culture.jpg',
    duration: '1.5 horas',
    enrolled: true,
    whatYouLearn: [
      'Historia de la educación sorda en México',
      'Identidad y cultura de la comunidad Sorda',
      'La LSM a través del tiempo',
      'Artistas, líderes e intelectuales sordos',
      'Movimiento por los derechos de las personas sordas',
    ],
    lessons: [
      { id: 'dc1', number: 1, title: 'Historia de la Comunidad Sorda en México', description: 'Desde la fundación de la primera escuela para sordos hasta la actualidad.', duration: '15 min', type: 'video', completed: true, locked: false, xpReward: 25 },
      { id: 'dc2', number: 2, title: 'Identidad y Cultura Sorda', description: 'Qué significa ser Sordo con "S" mayúscula y los valores de la comunidad.', duration: '14 min', type: 'video', completed: true, locked: false, xpReward: 25 },
      { id: 'dc3', number: 3, title: 'La LSM a través de la Historia', description: 'Evolución y estandarización de la Lengua de Señas Mexicana.', duration: '12 min', type: 'video', completed: true, locked: false, xpReward: 25 },
      { id: 'dc4', number: 4, title: 'Artistas y Líderes Sordos', description: 'Personalidades sordas que han dejado huella en México y el mundo.', duration: '14 min', type: 'video', completed: true, locked: false, xpReward: 25 },
      { id: 'dc5', number: 5, title: 'Educación Bilingüe Bicultural', description: 'El modelo EBB y su impacto en la comunidad sorda mexicana.', duration: '12 min', type: 'practice', completed: true, locked: false, xpReward: 30 },
      { id: 'dc6', number: 6, title: 'La Comunidad Sorda Hoy', description: 'Tecnología, accesibilidad y el futuro de la comunidad Sorda en México.', duration: '16 min', type: 'quiz', completed: true, locked: false, xpReward: 50 },
    ],
  },
  'advanced-vocabulary': {
    id: 'advanced-vocabulary',
    title: 'Vocabulario Avanzado',
    description: 'Amplía tu vocabulario de señas con conceptos complejos, modismos y términos especializados en LSM.',
    level: 'advanced',
    lessonCount: 20,
    completedLessons: 0,
    imageUrl: '/courses/advanced.jpg',
    duration: '5 horas',
    enrolled: false,
    whatYouLearn: [
      'Vocabulario técnico y profesional en LSM',
      'Modismos y expresiones idiomáticas',
      'Términos de áreas especializadas (medicina, derecho, etc.)',
      'Neologismos y préstamos léxicos',
      'Registro formal e informal en LSM',
    ],
    prerequisites: 'Gramática y Sintaxis de LSM y al menos un curso intermedio',
    lessons: Array.from({ length: 20 }, (_, i) => ({
      id: `av${i + 1}`,
      number: i + 1,
      title: `Lección ${i + 1}`,
      description: 'Contenido disponible al inscribirte.',
      duration: '15 min',
      type: 'video' as const,
      completed: false,
      locked: true,
      xpReward: 40,
    })),
  },
}

export const sampleExercises: Exercise[] = [
  {
    id: 'ex-1',
    type: 'multiple_choice',
    question: '¿Qué significa esta seña?',
    imageUrl: '/signs/hello.jpg',
    options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
    correctAnswer: 'Hola',
    hint: 'Esta es una seña de saludo común',
  },
  {
    id: 'ex-2',
    type: 'type_answer',
    question: 'Escribe el significado de esta seña',
    imageUrl: '/signs/thank-you.jpg',
    correctAnswer: 'Gracias',
    hint: 'Esta seña comienza desde el mentón',
  },
  {
    id: 'ex-3',
    type: 'watch_and_interpret',
    question: 'Observa el video y escribe lo que se está señando',
    videoUrl: '/videos/nice-to-meet-you.mp4',
    correctAnswer: 'Mucho gusto',
    hint: 'Es una frase común al conocer a alguien nuevo',
  },
  {
    id: 'ex-4',
    type: 'record_yourself',
    question: 'Grábate señando "Buenos días"',
    correctAnswer: 'Buenos días',
    hint: 'Combina las señas de "bueno" y "mañana"',
  },
  {
    id: 'ex-5',
    type: 'multiple_choice',
    question: '¿Cuál seña representa "familia"?',
    options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
    correctAnswer: 'Opción B',
  },
]

export function getUserProgress() {
  return {
    streak: 5,
    xp: 1250,
    level: 4,
    xpToNextLevel: 500,
    lessonsCompleted: 14,
    totalLessons: 71,
    practiceMinutes: 340,
    signsLearned: 127,
  }
}
