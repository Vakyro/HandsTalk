"use client"

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Zap, Info } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { VideoRecorder } from '@/components/translator/video-recorder'
import { VideoUploader } from '@/components/translator/video-uploader'
import { LiveCameraPanel } from '@/components/translator/live-camera-panel'
import { LiveTranscriptPanel } from '@/components/translator/live-transcript-panel'
import { TranslationResultCard } from '@/components/translator/translation-result-card'
import { ProcessingState } from '@/components/ui/loading-state'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/lib/context/auth-context'
import { processSignVideo, createLiveTranslationStream, type TranslationResult, type LiveTranscriptChunk } from '@/lib/services/sign-to-text'
import { saveSignToTextResult } from '@/lib/services/saved'
import { toast } from 'sonner'

type Mode = 'normal' | 'live'
type InputMethod = 'record' | 'upload'

const processingStages = [
  'Analizando fotogramas del video...',
  'Detectando movimientos de manos...',
  'Reconociendo patrones de señas...',
  'Interpretando estructura de la frase...',
  'Generando traducción...',
]

export default function SignToTextPage() {
  const { isAuthenticated } = useAuth()
  const [mode, setMode] = useState<Mode>('normal')
  const [inputMethod, setInputMethod] = useState<InputMethod>('record')
  
  // Normal mode state
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<TranslationResult | null>(null)
  const [isSaved, setIsSaved] = useState(false)
  
  // Live mode state
  const [isLiveActive, setIsLiveActive] = useState(false)
  const [isLivePaused, setIsLivePaused] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [liveChunks, setLiveChunks] = useState<LiveTranscriptChunk[]>([])
  const [currentPhrase, setCurrentPhrase] = useState('')
  const [currentConfidence, setCurrentConfidence] = useState(0)
  
  const liveStreamRef = useRef<ReturnType<typeof createLiveTranslationStream> | null>(null)

  // Clean up live stream on unmount
  useEffect(() => {
    return () => {
      if (liveStreamRef.current) {
        liveStreamRef.current.stop()
      }
    }
  }, [])

  // Normal mode handlers
  const handleVideoReady = useCallback(async (blob: Blob) => {
    setIsProcessing(true)
    setProgress(0)
    setResult(null)
    setIsSaved(false)

    try {
      const translationResult = await processSignVideo(blob, setProgress)
      setResult(translationResult)
    } catch (error) {
      console.error('Translation error:', error)
      toast.error('Error al procesar el video. Por favor intenta de nuevo.')
    } finally {
      setIsProcessing(false)
    }
  }, [])

  const handleSaveResult = useCallback(() => {
    if (result && isAuthenticated) {
      saveSignToTextResult(result)
      setIsSaved(true)
      toast.success('¡Traducción guardada!')
    } else if (!isAuthenticated) {
      toast.error('Por favor inicia sesión para guardar traducciones')
    }
  }, [result, isAuthenticated])

  const handleRetry = useCallback(() => {
    setResult(null)
    setIsSaved(false)
  }, [])

  // Live mode handlers
  const handleStartLive = useCallback(() => {
    setIsLiveActive(true)
    setIsLivePaused(false)
    setLiveChunks([])
    setCurrentPhrase('')
    
    liveStreamRef.current = createLiveTranslationStream(
      (chunk) => {
        if (chunk.isFinal) {
          setLiveChunks(prev => [...prev, chunk])
          setCurrentPhrase('')
        } else {
          setCurrentPhrase(chunk.text)
          setCurrentConfidence(chunk.confidence)
        }
      },
      (error) => {
        console.error('Live translation error:', error)
        toast.error('Error en traducción en vivo')
      }
    )
    liveStreamRef.current.start()
  }, [])

  const handleStopLive = useCallback(() => {
    if (liveStreamRef.current) {
      liveStreamRef.current.stop()
      liveStreamRef.current = null
    }
    setIsLiveActive(false)
    setIsLivePaused(false)
    setCurrentPhrase('')
  }, [])

  const handlePauseLive = useCallback(() => {
    if (liveStreamRef.current) {
      liveStreamRef.current.pause()
    }
    setIsLivePaused(true)
  }, [])

  const handleResumeLive = useCallback(() => {
    if (liveStreamRef.current) {
      liveStreamRef.current.resume()
    }
    setIsLivePaused(false)
  }, [])

  const handleClearTranscript = useCallback(() => {
    setLiveChunks([])
    setCurrentPhrase('')
  }, [])

  const handleSaveTranscript = useCallback(() => {
    if (!isAuthenticated) {
      toast.error('Por favor inicia sesión para guardar transcripciones')
      return
    }
    
    const fullText = liveChunks.filter(c => c.isFinal).map(c => c.text).join(' ')
    if (fullText) {
      const transcriptResult: TranslationResult = {
        id: 'live_' + Date.now(),
        text: fullText,
        confidence: liveChunks.reduce((acc, c) => acc + c.confidence, 0) / liveChunks.length,
        glosses: [],
        motionCues: ['Live capture'],
        facialExpressions: [],
        timestamp: new Date().toISOString(),
      }
      saveSignToTextResult(transcriptResult)
      toast.success('¡Transcripción guardada!')
    }
  }, [liveChunks, isAuthenticated])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Seña a Texto</h1>
          <p className="mt-2 text-muted-foreground">
            Traduce videos de lengua de señas a texto usando reconocimiento impulsado por IA
          </p>
        </div>

        {/* Mode Selector */}
        <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)} className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="normal" className="gap-2">
              <Upload className="h-4 w-4" />
              Modo Normal
            </TabsTrigger>
            <TabsTrigger value="live" className="gap-2">
              <Zap className="h-4 w-4" />
              Modo En Vivo
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Mode descriptions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 rounded-xl border border-border/50 bg-muted/30 p-4"
        >
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              {mode === 'normal' ? (
                <>
                  <p className="font-medium text-foreground">Modo Normal</p>
                  <p className="text-sm text-muted-foreground">
                    Ideal para interpretación de frases completas. Graba o sube un video, y nuestra IA lo procesará para brindarte una traducción detallada con puntuaciones de confianza y metadatos.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-medium text-foreground">Modo En Vivo</p>
                  <p className="text-sm text-muted-foreground">
                    Ideal para comunicación instantánea. Seña directamente a tu cámara y ve la transcripción en tiempo real. Perfecto para conversaciones y práctica.
                  </p>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {mode === 'normal' ? (
            <motion.div
              key="normal"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {isProcessing ? (
                <div className="rounded-2xl border border-border/50 bg-card p-6">
                  <ProcessingState
                    progress={progress} 
                    message="Procesando tu video..."
                    stages={processingStages}
                  />
                </div>
              ) : result ? (
                <TranslationResultCard
                  result={result}
                  onSave={handleSaveResult}
                  onRetry={handleRetry}
                  isSaved={isSaved}
                />
              ) : (
                <div className="space-y-6">
                  {/* Input method tabs */}
                  <Tabs value={inputMethod} onValueChange={(v) => setInputMethod(v as InputMethod)}>
                    <TabsList>
                      <TabsTrigger value="record">Grabar Video</TabsTrigger>
                      <TabsTrigger value="upload">Subir Video</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="rounded-2xl border border-border/50 bg-card p-6">
                    {inputMethod === 'record' ? (
                      <VideoRecorder onRecordingComplete={handleVideoReady} />
                    ) : (
                      <VideoUploader onVideoSelect={handleVideoReady} />
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="live"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 lg:grid-cols-2"
            >
              {/* Camera panel */}
              <div className="rounded-2xl border border-border/50 bg-card p-6">
                <LiveCameraPanel
                  isActive={isLiveActive}
                  isPaused={isLivePaused}
                  onStart={handleStartLive}
                  onStop={handleStopLive}
                  onPause={handlePauseLive}
                  onResume={handleResumeLive}
                  isMuted={isMuted}
                  onToggleMute={() => setIsMuted(!isMuted)}
                />
              </div>

              {/* Transcript panel */}
              <LiveTranscriptPanel
                chunks={liveChunks}
                currentPhrase={currentPhrase}
                currentConfidence={currentConfidence}
                onClear={handleClearTranscript}
                onSave={handleSaveTranscript}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}
