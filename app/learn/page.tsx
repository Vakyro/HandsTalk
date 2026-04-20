"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  BookOpen, 
  Gamepad2, 
  Trophy, 
  ArrowRight,
  Flame,
  Sparkles
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ProgressCard } from '@/components/learning/progress-card'
import { CourseCard } from '@/components/learning/course-card'
import { GameCard } from '@/components/learning/game-card'
import { AchievementCard } from '@/components/learning/achievement-card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/context/auth-context'
import { courses, games, achievements, getUserProgress } from '@/lib/data/learning'

export default function LearnPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const progress = getUserProgress()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return null
  }

  const enrolledCourses = courses.filter(c => c.enrolled)
  const featuredGames = games.slice(0, 2)
  const recentAchievements = achievements.filter(a => a.unlocked).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Aprender</h1>
            <p className="mt-1 text-muted-foreground">
              Tu viaje personalizado de aprendizaje de lengua de señas
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-accent/10 px-4 py-2">
            <Flame className="h-6 w-6 text-accent" />
            <div>
              <p className="text-2xl font-bold text-accent">{progress.streak}</p>
              <p className="text-xs text-muted-foreground">Días Consecutivos</p>
            </div>
          </div>
        </div>

        {/* Progress overview */}
        <ProgressCard {...progress} />

        {/* Quick actions */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <QuickActionCard
            href="/learn/courses"
            icon={BookOpen}
            title="Cursos"
            description="Lecciones estructuradas por nivel de habilidad"
            color="primary"
          />
          <QuickActionCard
            href="/learn/games"
            icon={Gamepad2}
            title="Juegos de Práctica"
            description="Ejercicios divertidos para poner a prueba tus habilidades"
            color="secondary"
          />
          <QuickActionCard
            href="/learn/achievements"
            icon={Trophy}
            title="Logros"
            description="Sigue tus hitos"
            color="accent"
          />
        </div>

        {/* Continue learning */}
        {enrolledCourses.length > 0 && (
          <section className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Continuar Aprendiendo</h2>
              <Link href="/learn/courses">
                <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-primary">
                  Ver Todo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.slice(0, 3).map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* Practice Games */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Práctica Rápida</h2>
            <Link href="/learn/games">
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-primary">
                Todos los Juegos
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {featuredGames.map((game, i) => (
              <GameCard key={game.id} game={game} index={i} />
            ))}
          </div>
        </section>

        {/* Recent Achievements */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Logros Recientes</h2>
            <Link href="/learn/achievements">
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-primary">
                Ver Todo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentAchievements.map((achievement, i) => (
              <AchievementCard key={achievement.id} achievement={achievement} index={i} />
            ))}
          </div>
        </section>

        {/* Daily tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-5"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-primary/20 p-3">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Consejo del Día</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Las expresiones faciales son una parte fundamental de la gramática de la lengua de señas. Pueden cambiar
                el significado de una seña de declaración a pregunta, o indicar intensidad. ¡Practica frente a un espejo para mejorar!
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}

function QuickActionCard({ 
  href, 
  icon: Icon, 
  title, 
  description, 
  color 
}: { 
  href: string
  icon: React.ElementType
  title: string
  description: string
  color: 'primary' | 'secondary' | 'accent'
}) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground',
  }

  return (
    <Link href={href} className="group">
      <motion.div
        whileHover={{ y: -4 }}
        className="flex items-center gap-4 rounded-xl border border-border/50 bg-card p-4 transition-shadow hover:shadow-lg hover:border-primary/20"
      >
        <div className={`rounded-xl p-3 transition-colors ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </motion.div>
    </Link>
  )
}
