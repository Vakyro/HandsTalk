"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Trophy, Flame, BookOpen, Target, Users } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { AchievementCard } from '@/components/learning/achievement-card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/lib/context/auth-context'
import { achievements } from '@/lib/data/learning'
import { cn } from '@/lib/utils'

type Filter = 'all' | 'unlocked' | 'locked'

const categories = [
  { id: 'streak', label: 'Racha', icon: Flame, color: 'text-accent', bg: 'bg-accent/10' },
  { id: 'learning', label: 'Aprendizaje', icon: BookOpen, color: 'text-primary', bg: 'bg-primary/10' },
  { id: 'practice', label: 'Práctica', icon: Target, color: 'text-secondary-foreground', bg: 'bg-secondary' },
  { id: 'social', label: 'Social', icon: Users, color: 'text-foreground', bg: 'bg-primary/20' },
] as const

export default function AchievementsPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) return null

  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalCount = achievements.length

  const filteredAchievements = filter === 'all'
    ? achievements
    : achievements.filter(a => filter === 'unlocked' ? a.unlocked : !a.unlocked)

  const byCategory = categories.map(cat => ({
    ...cat,
    items: filteredAchievements.filter(a => a.category === cat.id),
    unlocked: achievements.filter(a => a.category === cat.id && a.unlocked).length,
    total: achievements.filter(a => a.category === cat.id).length,
  })).filter(cat => cat.items.length > 0)

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
            <div className="rounded-xl bg-accent/10 p-2">
              <Trophy className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Logros</h1>
          </div>
          <p className="text-muted-foreground">
            Sigue tus hitos y celebra tu progreso en lengua de señas
          </p>
        </motion.div>

        {/* Progress overview */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8 rounded-2xl border border-border/50 bg-card p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <p className="text-sm text-muted-foreground">Logros Desbloqueados</p>
              <p className="text-3xl font-bold text-foreground">
                {unlockedCount} <span className="text-muted-foreground font-normal text-xl">/ {totalCount}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-primary">
                {Math.round((unlockedCount / totalCount) * 100)}%
              </p>
              <p className="text-sm text-muted-foreground">Completado</p>
            </div>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(unlockedCount / totalCount) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            />
          </div>

          {/* Category breakdown */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {categories.map(cat => {
              const catAchievements = achievements.filter(a => a.category === cat.id)
              const catUnlocked = catAchievements.filter(a => a.unlocked).length
              const Icon = cat.icon
              return (
                <div key={cat.id} className="flex items-center gap-2.5 rounded-xl bg-muted/30 p-3">
                  <div className={cn('rounded-lg p-1.5 shrink-0', cat.bg)}>
                    <Icon className={cn('h-4 w-4', cat.color)} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{cat.label}</p>
                    <p className="text-sm font-bold text-foreground">{catUnlocked}/{catAchievements.length}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Filter tabs */}
        <div className="mb-8">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
            <TabsList>
              <TabsTrigger value="all">Todos ({totalCount})</TabsTrigger>
              <TabsTrigger value="unlocked">Desbloqueados ({unlockedCount})</TabsTrigger>
              <TabsTrigger value="locked">Bloqueados ({totalCount - unlockedCount})</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Achievements by category */}
        <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
          {byCategory.length === 0 ? (
            <div className="text-center py-8">
              <Trophy className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">No se encontraron logros</p>
            </div>
          ) : (
            byCategory.map(cat => {
              const Icon = cat.icon
              return (
                <section key={cat.id}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={cn('rounded-lg p-1.5', cat.bg)}>
                      <Icon className={cn('h-4 w-4', cat.color)} />
                    </div>
                    <h2 className="text-base font-bold text-foreground">{cat.label}</h2>
                    <span className="text-sm text-muted-foreground ml-1">
                      {cat.unlocked}/{cat.total} desbloqueados
                    </span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {cat.items.map((achievement, i) => (
                      <AchievementCard key={achievement.id} achievement={achievement} index={i} />
                    ))}
                  </div>
                </section>
              )
            })
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
