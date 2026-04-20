"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Gamepad2,
  Trophy,
  Play,
  Star,
  Zap,
  Timer,
  Target,
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { GameCard } from '@/components/learning/game-card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/lib/context/auth-context'
import { games } from '@/lib/data/learning'
import { cn } from '@/lib/utils'

type Difficulty = 'all' | 'easy' | 'medium' | 'hard'

const difficultyLabel: Record<string, string> = {
  all: 'Todos',
  easy: 'Fácil',
  medium: 'Medio',
  hard: 'Difícil',
}

const tips = [
  { icon: Zap, text: 'Juega diariamente para ganar el doble de XP en racha.' },
  { icon: Timer, text: 'En Señas Rápidas, enfócate en las más familiares primero.' },
  { icon: Target, text: 'Completa los juegos en dificultad Difícil para logros especiales.' },
  { icon: Star, text: 'Tu mejor puntaje se guarda automáticamente en cada juego.' },
]

export default function GamesPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [difficulty, setDifficulty] = useState<Difficulty>('all')

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) return null

  const totalPlays = games.reduce((acc, g) => acc + g.playCount, 0)
  const bestScores = games.filter(g => g.bestScore)
  const topScore = bestScores.length > 0 ? Math.max(...bestScores.map(g => g.bestScore!)) : 0

  const filtered = difficulty === 'all' ? games : games.filter(g => g.difficulty === difficulty)
  const featured = games.find(g => g.bestScore) ?? games[0]

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
            <div className="rounded-xl bg-secondary p-2">
              <Gamepad2 className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Juegos de Práctica</h1>
          </div>
          <p className="text-muted-foreground">
            Formas divertidas e interactivas de practicar tus habilidades en lengua de señas
          </p>
        </motion.div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Juegos', value: games.length, sub: 'disponibles', color: 'text-foreground' },
            { label: totalPlays, value: null, sub: 'Partidas Jugadas', color: 'text-primary', raw: totalPlays },
            { label: bestScores.length, value: null, sub: 'Con Puntuación', color: 'text-secondary-foreground', raw: bestScores.length },
            { label: topScore, value: null, sub: 'Mejor Puntaje', color: 'text-accent', raw: topScore },
          ].map(({ label, sub, color, raw }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="rounded-xl border border-border/50 bg-card px-4 py-3"
            >
              <p className={cn('text-2xl font-bold', color)}>{raw ?? label}</p>
              <p className="text-sm text-muted-foreground">{sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Featured game */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/5 p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-4 w-4 text-primary fill-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Destacado</span>
              </div>
              <h2 className="text-xl font-bold text-foreground">{featured.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{featured.description}</p>
              {featured.bestScore && (
                <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-primary">
                  <Trophy className="h-4 w-4" />
                  Tu mejor puntaje: {featured.bestScore}
                </div>
              )}
            </div>
            <button
              onClick={() => router.push(`/learn/practice/${featured.id}`)}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 shrink-0"
            >
              <Play className="h-5 w-5" fill="currentColor" />
              Jugar Ahora
            </button>
          </div>
        </motion.div>

        {/* Tips */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {tips.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="flex items-start gap-2.5 rounded-xl border border-border/50 bg-card p-3"
            >
              <div className="rounded-lg bg-muted p-1.5 shrink-0">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground leading-snug">{text}</p>
            </motion.div>
          ))}
        </div>

        {/* Difficulty filter */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Todos los Juegos</h2>
          <Tabs value={difficulty} onValueChange={(v) => setDifficulty(v as Difficulty)}>
            <TabsList>
              {(['all', 'easy', 'medium', 'hard'] as Difficulty[]).map(d => (
                <TabsTrigger key={d} value={d}>{difficultyLabel[d]}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Games grid */}
        <motion.div
          key={difficulty}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-8">
            <Gamepad2 className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">No hay juegos en esta dificultad todavía</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
