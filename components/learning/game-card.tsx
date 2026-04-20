"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Grid3X3, 
  Timer, 
  Blocks, 
  Book,
  Play,
  Trophy
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Game } from '@/lib/data/learning'

const iconMap: Record<string, React.ElementType> = {
  'grid-3x3': Grid3X3,
  'timer': Timer,
  'blocks': Blocks,
  'book': Book,
}

interface GameCardProps {
  game: Game
  index?: number
}

export function GameCard({ game, index = 0 }: GameCardProps) {
  const Icon = iconMap[game.icon] || Grid3X3

  const difficultyColors = {
    easy: 'bg-secondary/50 text-secondary-foreground',
    medium: 'bg-primary/10 text-primary',
    hard: 'bg-accent/10 text-accent',
  }

  const difficultyLabels: Record<string, string> = {
    easy: 'Fácil',
    medium: 'Medio',
    hard: 'Difícil',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group rounded-2xl border border-border/50 bg-card p-6 transition-shadow hover:shadow-lg hover:border-primary/20"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 p-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <span className={cn(
          "rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
          difficultyColors[game.difficulty]
        )}>
          {difficultyLabels[game.difficulty] || game.difficulty}
        </span>
      </div>

      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
        {game.title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {game.description}
      </p>

      {/* Skills trained */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {game.skillsTrained.map((skill) => (
          <span 
            key={skill}
            className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Play className="h-3.5 w-3.5" />
          {game.playCount} partidas
        </span>
        {game.bestScore && (
          <span className="flex items-center gap-1 text-primary">
            <Trophy className="h-3.5 w-3.5" />
            Mejor: {game.bestScore}
          </span>
        )}
      </div>

      {/* Play button */}
      <Link href={`/learn/practice/${game.id}`} className="block mt-4">
        <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
          <Play className="h-4 w-4" />
          Jugar Ahora
        </Button>
      </Link>
    </motion.div>
  )
}
