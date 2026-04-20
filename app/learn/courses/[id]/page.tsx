"use client"

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  BookOpen,
  Clock,
  CheckCircle,
  Lock,
  Play,
  FileQuestion,
  Dumbbell,
  RotateCcw,
  ChevronRight,
  Zap,
  Info,
  Check,
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/context/auth-context'
import { courseDetails, type CourseLesson } from '@/lib/data/learning'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface CoursePageProps {
  params: Promise<{ id: string }>
}

const typeIcon: Record<CourseLesson['type'], React.ElementType> = {
  video: Play,
  practice: Dumbbell,
  quiz: FileQuestion,
  review: RotateCcw,
}

const typeLabel: Record<CourseLesson['type'], string> = {
  video: 'Video',
  practice: 'Práctica',
  quiz: 'Examen',
  review: 'Repaso',
}

const levelLabel: Record<string, string> = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
}

const levelColors: Record<string, string> = {
  beginner: 'bg-secondary/50 text-secondary-foreground border-secondary/50',
  intermediate: 'bg-primary/10 text-primary border-primary/20',
  advanced: 'bg-accent/10 text-accent border-accent/20',
}

export default function CoursePage({ params }: CoursePageProps) {
  const { id } = use(params)
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [enrolled, setEnrolled] = useState(false)
  const [activeLesson, setActiveLesson] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) return null

  const course = courseDetails[id]

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-3xl px-4 py-12 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Curso no encontrado</h1>
          <p className="text-muted-foreground mb-6">Este curso no existe o todavía no está disponible.</p>
          <Button onClick={() => router.push('/learn/courses')} className="bg-primary hover:bg-primary/90">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Ver Todos los Cursos
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  const isEnrolled = course.enrolled || enrolled
  const progress = course.completedLessons / course.lessonCount * 100
  const isCompleted = progress === 100
  const nextLesson = course.lessons.find(l => !l.completed && !l.locked)
  const totalXP = course.lessons.reduce((acc, l) => acc + (l.completed ? l.xpReward : 0), 0)

  const handleStartLesson = (lesson: CourseLesson) => {
    if (lesson.locked) return
    setActiveLesson(activeLesson === lesson.id ? null : lesson.id)
  }

  const handleEnroll = () => {
    setEnrolled(true)
    toast.success(`¡Inscrito en ${course.title}!`)
  }

  const handleContinue = () => {
    if (nextLesson) {
      toast.success(`Iniciando: ${nextLesson.title}`)
    } else {
      router.push(`/learn/practice/${course.id}`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/learn/courses')}
          className="mb-6 gap-1 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Todos los Cursos
        </Button>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border/50 bg-card overflow-hidden mb-6"
        >
          {/* Banner */}
          <div className="relative h-36 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/5 flex items-center px-8">
            <div className="absolute inset-0 flex items-center justify-end pr-8 opacity-10">
              <BookOpen className="h-32 w-32 text-primary" />
            </div>
            <div className="relative">
              <span className={cn('rounded-full border px-3 py-1 text-xs font-medium mb-3 inline-block', levelColors[course.level])}>
                {levelLabel[course.level]}
              </span>
              <h1 className="text-2xl font-bold text-foreground">{course.title}</h1>
            </div>
            {isCompleted && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow">
                <CheckCircle className="h-4 w-4" />
                Completado
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-6">
            <p className="text-muted-foreground">{course.description}</p>

            {course.prerequisites && (
              <div className="mt-4 flex items-start gap-2 rounded-xl bg-muted/50 px-4 py-3">
                <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Prerequisitos:</span> {course.prerequisites}
                </p>
              </div>
            )}

            {/* Stats row */}
            <div className="mt-5 flex flex-wrap gap-6">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                {course.lessonCount} lecciones
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {course.duration}
              </div>
              {isEnrolled && (
                <div className="flex items-center gap-1.5 text-sm text-primary font-medium">
                  <Zap className="h-4 w-4" />
                  {totalXP} XP ganados
                </div>
              )}
            </div>

            {/* Progress bar (enrolled) */}
            {isEnrolled && (
              <div className="mt-5">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">
                    {course.completedLessons} de {course.lessonCount} lecciones completadas
                  </span>
                  <span className="font-medium text-foreground">{Math.round(progress)}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={cn('h-full rounded-full', 'bg-primary')}
                  />
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-6 flex gap-3">
              {isEnrolled ? (
                <>
                  <Button
                    onClick={handleContinue}
                    className="gap-2 bg-primary hover:bg-primary/90"
                    disabled={isCompleted && !nextLesson}
                  >
                    {isCompleted ? (
                      <>
                        <RotateCcw className="h-4 w-4" />
                        Practicar de Nuevo
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        {nextLesson ? `Continuar: ${nextLesson.title}` : 'Practicar'}
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/learn/practice/${course.id}`)}
                  >
                    <Dumbbell className="mr-2 h-4 w-4" />
                    Ejercicios de Práctica
                  </Button>
                </>
              ) : (
                <Button onClick={handleEnroll} className="gap-2 bg-primary hover:bg-primary/90">
                  <BookOpen className="h-4 w-4" />
                  Inscribirse Gratis
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Lessons list */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-lg font-bold text-foreground">Lecciones</h2>
            {course.lessons.map((lesson, i) => (
              <LessonRow
                key={lesson.id}
                lesson={lesson}
                index={i}
                isEnrolled={isEnrolled}
                isActive={activeLesson === lesson.id}
                onClick={() => handleStartLesson(lesson)}
              />
            ))}
          </div>

          {/* What you'll learn */}
          <div>
            <div className="rounded-2xl border border-border/50 bg-card p-5 sticky top-20">
              <h2 className="text-base font-bold text-foreground mb-4">Qué aprenderás</h2>
              <ul className="space-y-3">
                {course.whatYouLearn.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-2.5"
                  >
                    <div className="mt-0.5 rounded-full bg-primary/10 p-0.5 shrink-0">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground leading-snug">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function LessonRow({
  lesson,
  index,
  isEnrolled,
  isActive,
  onClick,
}: {
  lesson: CourseLesson
  index: number
  isEnrolled: boolean
  isActive: boolean
  onClick: () => void
}) {
  const Icon = typeIcon[lesson.type]
  const isLocked = lesson.locked || !isEnrolled

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
    >
      <button
        onClick={onClick}
        disabled={isLocked}
        className={cn(
          'w-full text-left rounded-xl border transition-all cursor-pointer',
          lesson.completed
            ? 'border-primary/30 bg-primary/10'
            : isLocked
            ? 'border-border/30 bg-muted/20 cursor-not-allowed opacity-60'
            : isActive
            ? 'border-primary/30 bg-primary/5 shadow-sm'
            : 'border-border/50 bg-card hover:border-primary/30 hover:bg-muted/30'
        )}
      >
        <div className="flex items-center gap-4 p-4">
          {/* Number / status icon */}
          <div className={cn(
            'rounded-full h-9 w-9 flex items-center justify-center shrink-0 text-sm font-bold',
            lesson.completed
              ? 'bg-primary text-primary-foreground'
              : isLocked
              ? 'bg-muted text-muted-foreground'
              : 'bg-primary/10 text-primary'
          )}>
            {lesson.completed ? (
              <CheckCircle className="h-5 w-5" />
            ) : isLocked ? (
              <Lock className="h-4 w-4" />
            ) : (
              lesson.number
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <span className="font-medium text-foreground text-sm leading-tight">{lesson.title}</span>
              <span className={cn(
                'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs',
                lesson.type === 'quiz' ? 'bg-accent/10 text-accent' :
                lesson.type === 'practice' ? 'bg-secondary text-secondary-foreground' :
                'bg-muted text-muted-foreground'
              )}>
                <Icon className="h-3 w-3" />
                {typeLabel[lesson.type]}
              </span>
            </div>
            <p className="text-xs text-muted-foreground truncate">{lesson.description}</p>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-muted-foreground">{lesson.duration}</p>
              <p className="text-xs font-medium text-primary">+{lesson.xpReward} XP</p>
            </div>
            {!isLocked && (
              <ChevronRight className={cn(
                'h-4 w-4 text-muted-foreground transition-transform',
                isActive && 'rotate-90'
              )} />
            )}
          </div>
        </div>

        {/* Expanded panel */}
        <AnimatePresence>
          {isActive && !isLocked && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-border/50"
            >
              <div className="px-4 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{lesson.description}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{lesson.duration}</span>
                    <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-primary" />+{lesson.xpReward} XP</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 shrink-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    toast.success(`Iniciando: ${lesson.title}`)
                  }}
                >
                  {lesson.completed ? (
                    <><RotateCcw className="mr-1.5 h-3.5 w-3.5" />Repasar</>
                  ) : (
                    <><Play className="mr-1.5 h-3.5 w-3.5" />Iniciar</>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  )
}
