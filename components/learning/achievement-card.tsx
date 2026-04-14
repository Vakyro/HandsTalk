"use client"

import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Flame, 
  GraduationCap, 
  Target, 
  Calendar, 
  BookOpen,
  Languages,
  Sun,
  Lock
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Achievement } from '@/lib/data/learning'

const iconMap: Record<string, React.ElementType> = {
  'sparkles': Sparkles,
  'flame': Flame,
  'graduation-cap': GraduationCap,
  'target': Target,
  'calendar': Calendar,
  'book-open': BookOpen,
  'languages': Languages,
  'sunrise': Sun,
}

interface AchievementCardProps {
  achievement: Achievement
  index?: number
}

export function AchievementCard({ achievement, index = 0 }: AchievementCardProps) {
  const Icon = iconMap[achievement.icon] || Sparkles
  const progress = (achievement.progress / achievement.maxProgress) * 100

  const categoryColors = {
    streak: 'from-accent/20 to-accent/5 border-accent/30',
    learning: 'from-primary/20 to-primary/5 border-primary/30',
    practice: 'from-secondary to-secondary/30 border-secondary',
    social: 'from-green-100 to-green-50 border-green-200',
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "relative rounded-2xl border p-5 transition-shadow hover:shadow-lg",
        achievement.unlocked 
          ? `bg-gradient-to-br ${categoryColors[achievement.category]}` 
          : "bg-muted/30 border-border/50"
      )}
    >
      {/* Lock overlay for locked achievements */}
      {!achievement.unlocked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-background/50 backdrop-blur-[1px]">
          <Lock className="h-8 w-8 text-muted-foreground/50" />
        </div>
      )}

      <div className={cn(!achievement.unlocked && "opacity-40")}>
        {/* Icon */}
        <div className={cn(
          "inline-flex rounded-xl p-3 mb-3",
          achievement.unlocked ? "bg-background shadow-sm" : "bg-muted"
        )}>
          <Icon className={cn(
            "h-6 w-6",
            achievement.unlocked ? "text-primary" : "text-muted-foreground"
          )} />
        </div>

        {/* Content */}
        <h3 className="font-semibold text-foreground">{achievement.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{achievement.description}</p>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">
              {achievement.progress} / {achievement.maxProgress}
            </span>
            <span className="font-medium text-foreground">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className={cn(
                "h-full rounded-full",
                achievement.unlocked ? "bg-primary" : "bg-muted-foreground/30"
              )}
            />
          </div>
        </div>

        {/* Unlocked date */}
        {achievement.unlocked && achievement.unlockedAt && (
          <p className="mt-3 text-xs text-muted-foreground">
            Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </motion.div>
  )
}
