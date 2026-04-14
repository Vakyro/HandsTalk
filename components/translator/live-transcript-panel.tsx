"use client"

import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Copy, Download, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ConfidenceBadge } from '@/components/ui/confidence-badge'
import { toast } from 'sonner'
import type { LiveTranscriptChunk } from '@/lib/services/sign-to-text'

interface LiveTranscriptPanelProps {
  chunks: LiveTranscriptChunk[]
  currentPhrase: string
  currentConfidence: number
  onClear: () => void
  onSave: () => void
}

export function LiveTranscriptPanel({
  chunks,
  currentPhrase,
  currentConfidence,
  onClear,
  onSave,
}: LiveTranscriptPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chunks, currentPhrase])

  const fullTranscript = chunks
    .filter(c => c.isFinal)
    .map(c => c.text)
    .join(' ')

  const copyTranscript = () => {
    navigator.clipboard.writeText(fullTranscript)
    toast.success('Transcript copied to clipboard')
  }

  return (
    <div className="flex flex-col h-full rounded-2xl border border-border/50 bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 p-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Live Transcript</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={copyTranscript}
            disabled={!fullTranscript}
            className="h-8 w-8"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClear}
            disabled={chunks.length === 0}
            className="h-8 w-8"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Current phrase indicator */}
      <AnimatePresence>
        {currentPhrase && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-b border-border/50 bg-primary/5 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Currently detecting:</p>
                <p className="text-lg font-medium text-primary">{currentPhrase}</p>
              </div>
              <ConfidenceBadge confidence={currentConfidence} size="sm" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transcript scroll area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 min-h-[200px] max-h-[400px]"
      >
        {chunks.length === 0 && !currentPhrase ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground/30" />
            <p className="mt-4 text-muted-foreground">
              Start signing to see the transcript here
            </p>
            <p className="mt-1 text-sm text-muted-foreground/70">
              Words will appear as they are recognized
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {chunks.map((chunk, index) => (
              <motion.div
                key={chunk.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`inline-block mr-1 ${
                  chunk.isFinal 
                    ? 'text-foreground' 
                    : 'text-muted-foreground italic'
                }`}
              >
                {chunk.text}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border/50 p-4">
        <Button
          onClick={onSave}
          disabled={chunks.length === 0}
          className="w-full gap-2 bg-primary hover:bg-primary/90"
        >
          <Download className="h-4 w-4" />
          Save Transcript
        </Button>
      </div>
    </div>
  )
}
