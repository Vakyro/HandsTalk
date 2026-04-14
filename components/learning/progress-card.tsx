"use client"

import { motion } from 'framer-motion'
import { Flame, Zap, BookOpen, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProgressCardProps {
  streak: number
  xp: number
  level: number
  xpToNextLevel: number
  lessonsCompleted: number
  totalLessons: number
  practiceMinutes: number
  signsLearned: number
}

export function ProgressCard({
  streak,
  xp,
  level,
  xpToNextLevel,
  lessonsCompleted,
  totalLessons,
  practiceMinutes,
  signsLearned,
}: ProgressCardProps) {
  const xpProgress = (xp % 500) / 500 * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/50 bg-card p-6"
    >
      {/* Level and XP */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Your Progress</p>
          <p className="text-2xl font-bold text-foreground">Level {level}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
          <Zap className="h-5 w-5 text-primary" />
          <span className="font-bold text-primary">{xp} XP</span>
        </div>
      </div>

      {/* XP Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Progress to Level {level + 1}</span>
          <span>{xpToNextLevel} XP needed</span>
        </div>
        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${xpProgress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary/80"
          />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatItem
          icon={Flame}
          value={streak}
          label="Day Streak"
          color="accent"
        />
        <StatItem
          icon={BookOpen}
          value={`${lessonsCompleted}/${totalLessons}`}
          label="Lessons"
          color="primary"
        />
        <StatItem
          icon={Clock}
          value={`${Math.floor(practiceMinutes / 60)}h`}
          label="Practice Time"
          color="secondary"
        />
        <StatItem
          icon={Zap}
          value={signsLearned}
          label="Signs Learned"
          color="primary"
        />
      </div>
    </motion.div>
  )
}

function StatItem({ 
  icon: Icon, 
  value, 
  label, 
  color 
}: { 
  icon: React.ElementType
  value: string | number
  label: string
  color: 'primary' | 'secondary' | 'accent'
}) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent/10 text-accent',
  }

  return (
    <div className="flex flex-col items-center p-3 rounded-xl bg-muted/30">
      <div className={cn("rounded-lg p-2 mb-2", colorClasses[color])}>
        <Icon className="h-4 w-4" />
      </div>
      <span className="text-lg font-bold text-foreground">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
