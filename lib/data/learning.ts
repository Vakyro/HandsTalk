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
    title: 'ASL Basics',
    description: 'Learn the fundamentals of American Sign Language including the alphabet, numbers, and basic greetings.',
    level: 'beginner',
    lessonCount: 12,
    completedLessons: 5,
    imageUrl: '/courses/basics.jpg',
    duration: '2 hours',
    enrolled: true,
  },
  {
    id: 'everyday-phrases',
    title: 'Everyday Phrases',
    description: 'Master common phrases for daily conversations, from asking directions to ordering food.',
    level: 'beginner',
    lessonCount: 15,
    completedLessons: 0,
    imageUrl: '/courses/phrases.jpg',
    duration: '3 hours',
    enrolled: false,
  },
  {
    id: 'grammar-structure',
    title: 'ASL Grammar & Syntax',
    description: 'Understand the unique grammar structure of ASL including topic-comment and time indicators.',
    level: 'intermediate',
    lessonCount: 10,
    completedLessons: 3,
    imageUrl: '/courses/grammar.jpg',
    duration: '2.5 hours',
    enrolled: true,
  },
  {
    id: 'storytelling',
    title: 'Storytelling in ASL',
    description: 'Learn narrative techniques, role shifting, and expressive elements for engaging storytelling.',
    level: 'intermediate',
    lessonCount: 8,
    completedLessons: 0,
    imageUrl: '/courses/storytelling.jpg',
    duration: '2 hours',
    enrolled: false,
  },
  {
    id: 'deaf-culture',
    title: 'Deaf Culture & History',
    description: 'Explore the rich history and vibrant culture of the Deaf community worldwide.',
    level: 'beginner',
    lessonCount: 6,
    completedLessons: 6,
    imageUrl: '/courses/culture.jpg',
    duration: '1.5 hours',
    enrolled: true,
  },
  {
    id: 'advanced-vocabulary',
    title: 'Advanced Vocabulary',
    description: 'Expand your signing vocabulary with complex concepts, idioms, and specialized terms.',
    level: 'advanced',
    lessonCount: 20,
    completedLessons: 0,
    imageUrl: '/courses/advanced.jpg',
    duration: '5 hours',
    enrolled: false,
  },
]

export const achievements: Achievement[] = [
  {
    id: 'first-sign',
    title: 'First Sign',
    description: 'Complete your first lesson',
    icon: 'sparkles',
    unlocked: true,
    unlockedAt: '2024-01-15',
    progress: 1,
    maxProgress: 1,
    category: 'learning',
  },
  {
    id: 'week-streak',
    title: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: 'flame',
    unlocked: true,
    unlockedAt: '2024-01-20',
    progress: 7,
    maxProgress: 7,
    category: 'streak',
  },
  {
    id: 'course-complete',
    title: 'Course Graduate',
    description: 'Complete any full course',
    icon: 'graduation-cap',
    unlocked: true,
    unlockedAt: '2024-02-01',
    progress: 1,
    maxProgress: 1,
    category: 'learning',
  },
  {
    id: 'perfect-practice',
    title: 'Perfect Practice',
    description: 'Get 100% on 10 practice sessions',
    icon: 'target',
    unlocked: false,
    progress: 6,
    maxProgress: 10,
    category: 'practice',
  },
  {
    id: 'month-streak',
    title: 'Monthly Master',
    description: 'Maintain a 30-day learning streak',
    icon: 'calendar',
    unlocked: false,
    progress: 12,
    maxProgress: 30,
    category: 'streak',
  },
  {
    id: 'vocabulary-500',
    title: 'Word Collector',
    description: 'Learn 500 signs',
    icon: 'book-open',
    unlocked: false,
    progress: 127,
    maxProgress: 500,
    category: 'learning',
  },
  {
    id: 'translator-pro',
    title: 'Translation Pro',
    description: 'Use the translator 50 times',
    icon: 'languages',
    unlocked: false,
    progress: 23,
    maxProgress: 50,
    category: 'practice',
  },
  {
    id: 'early-bird',
    title: 'Early Bird',
    description: 'Practice before 7 AM for 5 days',
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
    title: 'Sign Match',
    description: 'Match signs to their meanings in a memory game format',
    icon: 'grid-3x3',
    skillsTrained: ['Recognition', 'Memory'],
    difficulty: 'easy',
    playCount: 15,
    bestScore: 850,
  },
  {
    id: 'speed-sign',
    title: 'Speed Sign',
    description: 'Identify as many signs as possible before time runs out',
    icon: 'timer',
    skillsTrained: ['Quick Recognition', 'Vocabulary'],
    difficulty: 'medium',
    playCount: 8,
    bestScore: 1200,
  },
  {
    id: 'phrase-builder',
    title: 'Phrase Builder',
    description: 'Arrange signs in the correct order to form phrases',
    icon: 'blocks',
    skillsTrained: ['Grammar', 'Sentence Structure'],
    difficulty: 'medium',
    playCount: 12,
  },
  {
    id: 'story-mode',
    title: 'Story Mode',
    description: 'Watch signed stories and answer comprehension questions',
    icon: 'book',
    skillsTrained: ['Comprehension', 'Context'],
    difficulty: 'hard',
    playCount: 3,
  },
]

export const sampleExercises: Exercise[] = [
  {
    id: 'ex-1',
    type: 'multiple_choice',
    question: 'What does this sign mean?',
    imageUrl: '/signs/hello.jpg',
    options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
    correctAnswer: 'Hello',
    hint: 'This is a common greeting sign',
  },
  {
    id: 'ex-2',
    type: 'type_answer',
    question: 'Type the meaning of this sign',
    imageUrl: '/signs/thank-you.jpg',
    correctAnswer: 'Thank you',
    hint: 'This sign starts from the chin',
  },
  {
    id: 'ex-3',
    type: 'watch_and_interpret',
    question: 'Watch the video and type what is being signed',
    videoUrl: '/videos/nice-to-meet-you.mp4',
    correctAnswer: 'Nice to meet you',
    hint: 'A common phrase used when meeting someone new',
  },
  {
    id: 'ex-4',
    type: 'record_yourself',
    question: 'Record yourself signing "Good morning"',
    correctAnswer: 'Good morning',
    hint: 'Combine the signs for "good" and "morning"',
  },
  {
    id: 'ex-5',
    type: 'multiple_choice',
    question: 'Which sign represents "family"?',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: 'Option B',
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
