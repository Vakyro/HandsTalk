"use client"

import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingStateProps {
  message?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function LoadingState({ 
  message = 'Loading...', 
  className,
  size = 'md' 
}: LoadingStateProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-12",
        className
      )}
    >
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      <p className="text-sm text-muted-foreground">{message}</p>
    </motion.div>
  )
}

interface ProcessingStateProps {
  progress: number
  message?: string
  stages?: string[]
}

export function ProcessingState({ 
  progress, 
  message = 'Processing...',
  stages 
}: ProcessingStateProps) {
  const currentStageIndex = stages 
    ? Math.min(Math.floor((progress / 100) * stages.length), stages.length - 1)
    : 0

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="relative h-20 w-20">
        <svg className="h-20 w-20 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className="text-primary"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress / 100 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              strokeDasharray: "283",
              strokeDashoffset: "0",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-foreground">{Math.round(progress)}%</span>
        </div>
      </div>
      
      <div className="text-center">
        <p className="font-medium text-foreground">{message}</p>
        {stages && (
          <p className="mt-1 text-sm text-muted-foreground">
            {stages[currentStageIndex]}
          </p>
        )}
      </div>
    </div>
  )
}
