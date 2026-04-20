"use client"

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, CameraOff, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LiveCameraPanelProps {
  isActive: boolean
  isPaused: boolean
  onStart: () => void
  onStop: () => void
  onPause: () => void
  onResume: () => void
  isMuted: boolean
  onToggleMute: () => void
}

export function LiveCameraPanel({
  isActive,
  isPaused,
  onStart,
  onStop,
  onPause,
  onResume,
  isMuted,
  onToggleMute,
}: LiveCameraPanelProps) {
  const [cameraReady, setCameraReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }, 
        audio: false 
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraReady(true)
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setCameraReady(false)
  }, [])

  useEffect(() => {
    if (isActive) {
      startCamera()
    } else {
      stopCamera()
    }
    return () => stopCamera()
  }, [isActive, startCamera, stopCamera])

  return (
    <div className="space-y-4">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
        {isActive ? (
          <video 
            ref={videoRef} 
            autoPlay 
            muted 
            playsInline
            className="h-full w-full object-cover"
            style={{ transform: 'scaleX(-1)' }}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <Camera className="h-16 w-16 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">Cámara apagada</p>
            <p className="mt-1 text-sm text-muted-foreground/70">Haz clic en Iniciar para comenzar la traducción en vivo</p>
          </div>
        )}

        {/* Status indicators */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-4 top-4 flex items-center gap-2"
            >
              <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 ${isPaused ? 'bg-secondary' : 'bg-primary'}`}>
                <span className="relative flex h-2 w-2">
                  {!isPaused && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  )}
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                <span className={`text-xs font-medium ${isPaused ? 'text-secondary-foreground' : 'text-white'}`}>
                  {isPaused ? 'Pausado' : 'En Vivo'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading overlay */}
        {isActive && !cameraReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
            <div className="text-center">
              <Camera className="mx-auto h-12 w-12 animate-pulse text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">Iniciando cámara...</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        {!isActive ? (
          <Button
            onClick={onStart}
            size="lg"
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            <Camera className="h-5 w-5" />
            Iniciar Traducción en Vivo
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={isPaused ? onResume : onPause}
              className="h-12 w-12"
            >
              {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
            </Button>

            <Button
              onClick={onStop}
              size="lg"
              variant="destructive"
              className="gap-2"
            >
              <CameraOff className="h-5 w-5" />
              Detener
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={onToggleMute}
              className="h-12 w-12"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
