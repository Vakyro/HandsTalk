"use client"

import { cn } from '@/lib/utils'

interface ConfidenceBadgeProps {
  confidence: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export function ConfidenceBadge({ 
  confidence, 
  size = 'md',
  showLabel = true 
}: ConfidenceBadgeProps) {
  const percentage = Math.round(confidence * 100)
  
  const getColor = () => {
    if (percentage >= 85) return 'bg-secondary/50 text-secondary-foreground border-secondary/50'
    if (percentage >= 70) return 'bg-primary/10 text-primary border-primary/20'
    if (percentage >= 50) return 'bg-secondary text-secondary-foreground border-secondary'
    return 'bg-accent/10 text-accent border-accent/20'
  }

  const getLabel = () => {
    if (percentage >= 85) return 'High'
    if (percentage >= 70) return 'Good'
    if (percentage >= 50) return 'Moderate'
    return 'Low'
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  }

  return (
    <span 
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        getColor(),
        sizeClasses[size]
      )}
    >
      <span className="font-semibold">{percentage}%</span>
      {showLabel && <span className="opacity-80">{getLabel()}</span>}
    </span>
  )
}
