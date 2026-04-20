"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { BookOpen, CheckCircle, Sparkles } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { CourseCard } from '@/components/learning/course-card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/lib/context/auth-context'
import { courses } from '@/lib/data/learning'

type Level = 'all' | 'beginner' | 'intermediate' | 'advanced'

const levelLabel: Record<Level, string> = {
  all: 'Todos los Niveles',
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
}

export default function CoursesPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [level, setLevel] = useState<Level>('all')

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) return null

  const filteredCourses = level === 'all' ? courses : courses.filter(c => c.level === level)
  const enrolledCount = courses.filter(c => c.enrolled).length
  const completedCount = courses.filter(c => c.completedLessons === c.lessonCount && c.enrolled).length
  const inProgressCourses = filteredCourses.filter(c => c.enrolled && c.completedLessons < c.lessonCount)
  const completedCourses = filteredCourses.filter(c => c.enrolled && c.completedLessons === c.lessonCount)
  const availableCourses = filteredCourses.filter(c => !c.enrolled)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-xl bg-primary/10 p-2">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Cursos</h1>
          </div>
          <p className="text-muted-foreground">
            Rutas de aprendizaje estructuradas desde lo básico hasta lengua de señas avanzada
          </p>
        </motion.div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-3 gap-4 sm:w-fit sm:flex sm:flex-wrap">
          {[
            { value: courses.length, label: 'Total de Cursos', color: 'text-foreground' },
            { value: enrolledCount, label: 'Inscrito', color: 'text-primary' },
            { value: completedCount, label: 'Completados', color: 'text-primary' },
          ].map(({ value, label, color }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="rounded-xl border border-border/50 bg-card px-4 py-3"
            >
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="mb-8">
          <Tabs value={level} onValueChange={(v) => setLevel(v as Level)}>
            <TabsList>
              {(['all', 'beginner', 'intermediate', 'advanced'] as Level[]).map(l => (
                <TabsTrigger key={l} value={l}>{levelLabel[l]}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <motion.div key={level} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
          {/* In progress */}
          {inProgressCourses.length > 0 && (
            <section>
              <h2 className="flex items-center gap-2 text-base font-bold text-foreground mb-4">
                <Sparkles className="h-4 w-4 text-primary" />
                En Progreso
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {inProgressCourses.map((course, i) => (
                  <CourseCard key={course.id} course={course} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* Completed */}
          {completedCourses.length > 0 && (
            <section>
              <h2 className="flex items-center gap-2 text-base font-bold text-foreground mb-4">
                <CheckCircle className="h-4 w-4 text-primary" />
                Completados
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {completedCourses.map((course, i) => (
                  <CourseCard key={course.id} course={course} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* Available */}
          {availableCourses.length > 0 && (
            <section>
              <h2 className="flex items-center gap-2 text-base font-bold text-foreground mb-4">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                Disponibles
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {availableCourses.map((course, i) => (
                  <CourseCard key={course.id} course={course} index={i} />
                ))}
              </div>
            </section>
          )}

          {filteredCourses.length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">No se encontraron cursos para este nivel</p>
            </div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
