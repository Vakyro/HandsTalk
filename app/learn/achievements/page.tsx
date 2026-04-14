"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { AchievementCard } from '@/components/learning/achievement-card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/lib/context/auth-context'
import { achievements } from '@/lib/data/learning'

type Filter = 'all' | 'unlocked' | 'locked'

export default function AchievementsPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return null
  }

  const filteredAchievements = filter === 'all' 
    ? achievements 
    : achievements.filter(a => filter === 'unlocked' ? a.unlocked : !a.unlocked)

  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalCount = achievements.length

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-xl bg-accent/10 p-2">
              <Trophy className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Achievements</h1>
          </div>
          <p className="text-muted-foreground">
            Track your milestones and celebrate your progress
          </p>
        </div>

        {/* Progress overview */}
        <div className="mb-8 rounded-2xl border border-border/50 bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Achievements Unlocked</p>
              <p className="text-3xl font-bold text-foreground">{unlockedCount} / {totalCount}</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-primary">
                {Math.round((unlockedCount / totalCount) * 100)}%
              </p>
              <p className="text-sm text-muted-foreground">Complete</p>
            </div>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(unlockedCount / totalCount) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="mb-8">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
            <TabsList>
              <TabsTrigger value="all">All ({totalCount})</TabsTrigger>
              <TabsTrigger value="unlocked">Unlocked ({unlockedCount})</TabsTrigger>
              <TabsTrigger value="locked">Locked ({totalCount - unlockedCount})</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Achievements grid */}
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filteredAchievements.map((achievement, i) => (
            <AchievementCard key={achievement.id} achievement={achievement} index={i} />
          ))}
        </motion.div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">No achievements found</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
