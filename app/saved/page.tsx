"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bookmark,
  MessageSquareText,
  Video,
  Trash2,
  Copy,
  Play,
  Clock,
  Captions,
  Activity,
  SmilePlus,
  BookmarkX,
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { ConfidenceBadge } from '@/components/ui/confidence-badge'
import { useAuth } from '@/lib/context/auth-context'
import {
  getSavedSignToText,
  getSavedTextToSign,
  removeSignToTextResult,
  removeTextToSignResult,
  type SavedSignToText,
  type SavedTextToSign,
} from '@/lib/services/saved'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

type Tab = 'sign-to-text' | 'text-to-sign'

export default function SavedPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<Tab>('sign-to-text')
  const [signToTextItems, setSignToTextItems] = useState<SavedSignToText[]>([])
  const [textToSignItems, setTextToSignItems] = useState<SavedTextToSign[]>([])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (isAuthenticated) {
      setSignToTextItems(getSavedSignToText())
      setTextToSignItems(getSavedTextToSign())
    }
  }, [isAuthenticated])

  if (isLoading || !isAuthenticated) {
    return null
  }

  const handleRemoveSignToText = (id: string) => {
    removeSignToTextResult(id)
    setSignToTextItems(getSavedSignToText())
    toast.success('Eliminado de guardados')
  }

  const handleRemoveTextToSign = (id: string) => {
    removeTextToSignResult(id)
    setTextToSignItems(getSavedTextToSign())
    toast.success('Eliminado de guardados')
  }

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Texto copiado al portapapeles')
  }

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${Math.round(seconds)}s`
    return `${Math.floor(seconds / 60)}m ${Math.round(seconds % 60)}s`
  }

  const tabs: { id: Tab; label: string; icon: React.ElementType; count: number }[] = [
    { id: 'sign-to-text', label: 'Seña a Texto', icon: MessageSquareText, count: signToTextItems.length },
    { id: 'text-to-sign', label: 'Texto a Seña', icon: Video, count: textToSignItems.length },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="rounded-xl bg-primary/10 p-2">
              <Bookmark className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Guardados</h1>
          </div>
          <p className="text-muted-foreground ml-[52px]">
            Tus traducciones y videos guardados
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 rounded-xl border border-border/50 bg-muted/30 p-1 w-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-card text-primary shadow-sm border border-border/50'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
                {tab.count > 0 && (
                  <span
                    className={cn(
                      'ml-1 rounded-full px-2 py-0.5 text-xs font-semibold',
                      isActive ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'sign-to-text' && (
            <motion.div
              key="sign-to-text"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              {signToTextItems.length === 0 ? (
                <EmptyState
                  icon={MessageSquareText}
                  title="Sin traducciones guardadas"
                  description="Guarda traducciones desde la página Seña a Texto para verlas aquí."
                  action={{ label: 'Ir a Seña a Texto', href: '/sign-to-text' }}
                />
              ) : (
                <div className="space-y-4">
                  {signToTextItems.map((item, i) => (
                    <SignToTextCard
                      key={item.id}
                      item={item}
                      index={i}
                      onRemove={() => handleRemoveSignToText(item.id)}
                      onCopy={() => copyText(item.text)}
                      formatDate={formatDate}
                      formatDuration={formatDuration}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'text-to-sign' && (
            <motion.div
              key="text-to-sign"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              {textToSignItems.length === 0 ? (
                <EmptyState
                  icon={Video}
                  title="Sin videos guardados"
                  description="Genera videos de lengua de señas desde la página Texto a Seña y guárdalos aquí."
                  action={{ label: 'Ir a Texto a Seña', href: '/text-to-sign' }}
                />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {textToSignItems.map((item, i) => (
                    <TextToSignCard
                      key={item.id}
                      item={item}
                      index={i}
                      onRemove={() => handleRemoveTextToSign(item.id)}
                      formatDate={formatDate}
                      formatDuration={formatDuration}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ElementType
  title: string
  description: string
  action: { label: string; href: string }
}) {
  const router = useRouter()
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 py-12 px-6 text-center"
    >
      <div className="mb-4 rounded-full bg-muted p-4">
        <BookmarkX className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-xs mb-6">{description}</p>
      <Button
        onClick={() => router.push(action.href)}
        className="bg-primary hover:bg-primary/90"
      >
        <Icon className="mr-2 h-4 w-4" />
        {action.label}
      </Button>
    </motion.div>
  )
}

function SignToTextCard({
  item,
  index,
  onRemove,
  onCopy,
  formatDate,
  formatDuration,
}: {
  item: SavedSignToText
  index: number
  onRemove: () => void
  onCopy: () => void
  formatDate: (iso: string) => string
  formatDuration: (s: number) => string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-2xl border border-border/50 bg-card overflow-hidden"
    >
      {/* Main result */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <ConfidenceBadge confidence={item.confidence} size="sm" />
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {formatDate(item.timestamp)}
              </span>
              {item.duration != null && (
                <span className="text-xs text-muted-foreground">
                  · {formatDuration(item.duration)}
                </span>
              )}
            </div>
            <p className="text-xl font-semibold text-foreground leading-snug">
              {item.text}
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={onCopy}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 text-accent hover:text-accent hover:border-accent/50"
              onClick={onRemove}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* AI Metadata */}
      <div className="border-t border-border/50 bg-muted/30 px-5 py-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-start gap-2">
            <div className="rounded-lg bg-primary/10 p-1.5 shrink-0">
              <Captions className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground mb-1">Glosses</p>
              <div className="flex flex-wrap gap-1">
                {item.glosses.map((g, i) => (
                  <span
                    key={i}
                    className="inline-block rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="rounded-lg bg-secondary p-1.5 shrink-0">
              <Activity className="h-3.5 w-3.5 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Movimiento</p>
              <ul className="space-y-0.5">
                {item.motionCues.map((c, i) => (
                  <li key={i} className="text-xs text-foreground">{c}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="rounded-lg bg-accent/10 p-1.5 shrink-0">
              <SmilePlus className="h-3.5 w-3.5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Expresiones</p>
              <ul className="space-y-0.5">
                {item.facialExpressions.map((e, i) => (
                  <li key={i} className="text-xs text-foreground">{e}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function TextToSignCard({
  item,
  index,
  onRemove,
  formatDate,
  formatDuration,
}: {
  item: SavedTextToSign
  index: number
  onRemove: () => void
  formatDate: (iso: string) => string
  formatDuration: (s: number) => string
}) {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-2xl border border-border/50 bg-card overflow-hidden flex flex-col"
    >
      {/* Thumbnail / video preview */}
      <div className="relative aspect-video bg-muted flex items-center justify-center group">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-primary/20 p-4">
            <Play className="h-8 w-8 text-primary" fill="currentColor" />
          </div>
        </div>
        <button
          onClick={() => router.push('/text-to-sign')}
          className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/0 transition-colors hover:bg-black/10"
          aria-label="Reproducir video"
        />
        {/* badges */}
        <div className="absolute bottom-2 left-2 flex gap-1.5">
          <span className="rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
            {item.language}
          </span>
          <span className="rounded-full bg-black/60 px-2 py-0.5 text-xs text-white capitalize">
            {item.avatarStyle}
          </span>
        </div>
        <div className="absolute bottom-2 right-2">
          <span className="rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
            {formatDuration(item.duration)}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-sm font-semibold text-foreground line-clamp-2 mb-1">
          {item.originalText}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatDate(item.createdAt)}
        </p>

        <div className="mt-auto pt-4 flex justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 text-accent hover:text-accent hover:border-accent/50"
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 gap-1.5"
            onClick={() => router.push('/text-to-sign')}
          >
            <Play className="h-3.5 w-3.5" />
            Reproducir
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
