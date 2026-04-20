"use client"

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Video, 
  Sparkles, 
  Bookmark, 
  Copy, 
  RotateCcw,
  Globe,
  User,
  Settings2
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { GeneratedSignVideoPlayer } from '@/components/translator/generated-sign-video-player'
import { ProcessingState } from '@/components/ui/loading-state'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuth } from '@/lib/context/auth-context'
import { 
  generateSignVideo, 
  availableLanguages, 
  availableVariations, 
  avatarStyles,
  type SignVideoResult,
  type GenerationOptions 
} from '@/lib/services/text-to-sign'
import { saveTextToSignResult } from '@/lib/services/saved'
import { toast } from 'sonner'

const generationStages = [
  'Analizando estructura del texto...',
  'Mapeando al vocabulario de señas...',
  'Generando secuencias de movimiento...',
  'Renderizando interpretación de señas...',
  'Finalizando video...',
]

export default function TextToSignPage() {
  const { isAuthenticated } = useAuth()
  const [inputText, setInputText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<SignVideoResult | null>(null)
  const [isSaved, setIsSaved] = useState(false)
  
  // Options state
  const [language, setLanguage] = useState('LSM')
  const [variation, setVariation] = useState('standard')
  const [avatarStyle, setAvatarStyle] = useState('realistic')
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [showSubtitles, setShowSubtitles] = useState(true)
  const [showOptions, setShowOptions] = useState(false)

  const handleGenerate = useCallback(async () => {
    if (!inputText.trim()) {
      toast.error('Por favor ingresa texto para traducir')
      return
    }

    setIsGenerating(true)
    setProgress(0)
    setResult(null)
    setIsSaved(false)

    try {
      const options: GenerationOptions = {
        language,
        variation,
        avatarStyle,
        playbackSpeed,
        includeSubtitles: showSubtitles,
      }
      
      const videoResult = await generateSignVideo(inputText, options, setProgress)
      setResult(videoResult)
    } catch (error) {
      console.error('Generation error:', error)
      toast.error('Error al generar el video. Por favor intenta de nuevo.')
    } finally {
      setIsGenerating(false)
    }
  }, [inputText, language, variation, avatarStyle, playbackSpeed, showSubtitles])

  const handleSaveResult = useCallback(() => {
    if (result && isAuthenticated) {
      saveTextToSignResult(result)
      setIsSaved(true)
      toast.success('¡Video guardado!')
    } else if (!isAuthenticated) {
      toast.error('Por favor inicia sesión para guardar traducciones')
    }
  }, [result, isAuthenticated])

  const handleCopyText = useCallback(() => {
    navigator.clipboard.writeText(inputText)
    toast.success('Texto copiado al portapapeles')
  }, [inputText])

  const handleReset = useCallback(() => {
    setResult(null)
    setIsSaved(false)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Texto a Seña</h1>
          <p className="mt-2 text-muted-foreground">
            Transforma texto escrito en videos de interpretación natural de lengua de señas
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input panel */}
          <div className="space-y-6">
            {/* Text input */}
            <div className="rounded-2xl border border-border/50 bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Ingresa Tu Texto
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowOptions(!showOptions)}
                  className="gap-1"
                >
                  <Settings2 className="h-4 w-4" />
                  Opciones
                </Button>
              </div>

              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe una palabra, frase u oración para traducir a lengua de señas..."
                className="min-h-[150px] resize-none border-border/50 bg-muted/30 focus:border-primary"
              />

              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>{inputText.length} caracteres</span>
                <span>{inputText.split(/\s+/).filter(Boolean).length} palabras</span>
              </div>

              {/* Options panel */}
              <AnimatePresence>
                {showOptions && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 overflow-hidden"
                  >
                    <div className="border-t border-border/50 pt-6">
                      <h3 className="text-sm font-medium text-foreground mb-4">Opciones de Generación</h3>
                      <div className="grid gap-4 sm:grid-cols-3">
                        {/* Language */}
                        <div>
                          <label className="text-xs text-muted-foreground mb-1.5 flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            Lengua de Señas
                          </label>
                          <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger className="border-border/50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {availableLanguages.map((lang) => (
                                <SelectItem key={lang.code} value={lang.code}>
                                  {lang.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Variation */}
                        <div>
                          <label className="text-xs text-muted-foreground mb-1.5 block">
                            Variación de Estilo
                          </label>
                          <Select value={variation} onValueChange={setVariation}>
                            <SelectTrigger className="border-border/50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {availableVariations.map((v) => (
                                <SelectItem key={v.code} value={v.code}>
                                  {v.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Avatar style */}
                        <div>
                          <label className="text-xs text-muted-foreground mb-1.5 flex items-center gap-1">
                            <User className="h-3 w-3" />
                            Estilo de Avatar
                          </label>
                          <Select value={avatarStyle} onValueChange={setAvatarStyle}>
                            <SelectTrigger className="border-border/50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {avatarStyles.map((style) => (
                                <SelectItem key={style.code} value={style.code}>
                                  {style.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Generate button */}
              <Button
                onClick={handleGenerate}
                disabled={!inputText.trim() || isGenerating}
                className="mt-6 w-full gap-2 bg-primary hover:bg-primary/90"
                size="lg"
              >
                <Video className="h-5 w-5" />
                Generar Video de Lengua de Señas
              </Button>
            </div>

            {/* Quick tips */}
            <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
              <h3 className="text-sm font-medium text-foreground mb-2">Consejos para mejores resultados</h3>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li>• Usa oraciones simples y claras para una traducción más precisa</li>
                <li>• Las frases cortas funcionan mejor que los párrafos largos</li>
                <li>• Evita jerga o modismos que pueden no tener equivalentes directos en señas</li>
                <li>• Prueba diferentes variaciones para distintos contextos</li>
              </ul>
            </div>
          </div>

          {/* Output panel */}
          <div>
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-border/50 bg-card p-6"
                >
                  <ProcessingState
                    progress={progress}
                    message="Generando tu video de lengua de señas..."
                    stages={generationStages}
                  />
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {/* Video player */}
                  <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
                    <GeneratedSignVideoPlayer
                      videoUrl={result.videoUrl}
                      originalText={result.originalText}
                      duration={result.duration}
                      playbackSpeed={playbackSpeed}
                      onSpeedChange={setPlaybackSpeed}
                      showSubtitles={showSubtitles}
                      onToggleSubtitles={() => setShowSubtitles(!showSubtitles)}
                    />
                  </div>

                  {/* Result info */}
                  <div className="rounded-xl border border-border/50 bg-card p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Texto Original</p>
                        <p className="text-foreground font-medium">{result.originalText}</p>
                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                          <span className="rounded bg-muted px-2 py-0.5">{result.language}</span>
                          <span className="rounded bg-muted px-2 py-0.5">{result.variation}</span>
                          <span className="rounded bg-muted px-2 py-0.5">{result.duration.toFixed(1)}s</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleCopyText}
                          className="h-9 w-9"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={isSaved ? "secondary" : "outline"}
                          size="icon"
                          onClick={handleSaveResult}
                          disabled={isSaved}
                          className="h-9 w-9"
                        >
                          <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      className="flex-1 gap-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Traducir Otro
                    </Button>
                    <Button
                      onClick={handleGenerate}
                      className="flex-1 gap-2 bg-primary hover:bg-primary/90"
                    >
                      <Sparkles className="h-4 w-4" />
                      Regenerar
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/50 bg-muted/30 p-8 text-center"
                >
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <Video className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Tu video aparecerá aquí
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Ingresa texto a la izquierda y haz clic en Generar para crear una interpretación de lengua de señas
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
