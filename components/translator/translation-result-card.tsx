"use client"

import { motion } from 'framer-motion'
import { Copy, Bookmark, RotateCcw, Sparkles, Activity, SmilePlus, Captions } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ConfidenceBadge } from '@/components/ui/confidence-badge'
import { toast } from 'sonner'
import type { TranslationResult } from '@/lib/services/sign-to-text'

interface TranslationResultCardProps {
  result: TranslationResult
  onSave: () => void
  onRetry: () => void
  isSaved?: boolean
}

export function TranslationResultCard({ 
  result, 
  onSave, 
  onRetry,
  isSaved = false 
}: TranslationResultCardProps) {
  const copyText = () => {
    navigator.clipboard.writeText(result.text)
    toast.success('Text copied to clipboard')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/50 bg-card overflow-hidden"
    >
      {/* Main result */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Translation Result
              </span>
              <ConfidenceBadge confidence={result.confidence} size="sm" />
            </div>
            <p className="text-2xl font-semibold text-foreground leading-relaxed">
              {result.text}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={copyText}
              className="h-9 w-9"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant={isSaved ? "secondary" : "outline"}
              size="icon"
              onClick={onSave}
              className="h-9 w-9"
              disabled={isSaved}
            >
              <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* AI Metadata section */}
      <div className="border-t border-border/50 bg-muted/30 p-6">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
          AI Analysis
        </h4>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Glosses */}
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Captions className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Detected Glosses</p>
              <div className="flex flex-wrap gap-1">
                {result.glosses.map((gloss, i) => (
                  <span 
                    key={i}
                    className="inline-block rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                  >
                    {gloss}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Motion cues */}
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-secondary p-2">
              <Activity className="h-4 w-4 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Motion Cues</p>
              <ul className="space-y-0.5">
                {result.motionCues.map((cue, i) => (
                  <li key={i} className="text-xs text-foreground">{cue}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Facial expressions */}
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-accent/10 p-2">
              <SmilePlus className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Facial Expressions</p>
              <ul className="space-y-0.5">
                {result.facialExpressions.map((exp, i) => (
                  <li key={i} className="text-xs text-foreground">{exp}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="border-t border-border/50 p-4 flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={onRetry}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Translate Another
        </Button>
      </div>
    </motion.div>
  )
}
