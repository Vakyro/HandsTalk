"use client"

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Square, RotateCcw, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VideoRecorderProps {
  onRecordingComplete: (blob: Blob) => void
  maxDuration?: number
}

export function VideoRecorder({ onRecordingComplete, maxDuration = 30 }: VideoRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null)
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null)
  const [duration, setDuration] = useState(0)
  const [cameraReady, setCameraReady] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
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
    startCamera()
    return () => {
      stopCamera()
      if (recordedUrl) URL.revokeObjectURL(recordedUrl)
    }
  }, [startCamera, stopCamera, recordedUrl])

  const startRecording = () => {
    if (!streamRef.current) return

    chunksRef.current = []
    const mediaRecorder = new MediaRecorder(streamRef.current)
    mediaRecorderRef.current = mediaRecorder

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data)
      }
    }

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' })
      setRecordedBlob(blob)
      const url = URL.createObjectURL(blob)
      setRecordedUrl(url)
    }

    mediaRecorder.start()
    setIsRecording(true)
    setDuration(0)

    timerRef.current = setInterval(() => {
      setDuration(d => {
        if (d >= maxDuration - 1) {
          stopRecording()
          return maxDuration
        }
        return d + 1
      })
    }, 1000)
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }

  const resetRecording = () => {
    if (recordedUrl) URL.revokeObjectURL(recordedUrl)
    setRecordedBlob(null)
    setRecordedUrl(null)
    setDuration(0)
    startCamera()
  }

  const confirmRecording = () => {
    if (recordedBlob) {
      onRecordingComplete(recordedBlob)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
        {recordedUrl ? (
          <video 
            src={recordedUrl} 
            className="h-full w-full object-cover" 
            controls
          />
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            muted 
            playsInline
            className="h-full w-full object-cover mirror"
            style={{ transform: 'scaleX(-1)' }}
          />
        )}
        
        {/* Recording indicator */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-accent px-3 py-1.5"
            >
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
              </span>
              <span className="text-sm font-medium text-accent-foreground">Recording</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timer */}
        {(isRecording || duration > 0) && (
          <div className="absolute right-4 top-4 rounded-full bg-foreground/80 px-3 py-1.5 text-sm font-medium text-background">
            {formatTime(duration)} / {formatTime(maxDuration)}
          </div>
        )}

        {/* Camera not ready overlay */}
        {!cameraReady && !recordedUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="text-center">
              <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">Starting camera...</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        {recordedUrl ? (
          <>
            <Button
              variant="outline"
              onClick={resetRecording}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Record Again
            </Button>
            <Button
              onClick={confirmRecording}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              <Check className="h-4 w-4" />
              Use This Video
            </Button>
          </>
        ) : (
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={!cameraReady}
            className={`gap-2 ${isRecording ? 'bg-accent hover:bg-accent/90' : 'bg-primary hover:bg-primary/90'}`}
            size="lg"
          >
            {isRecording ? (
              <>
                <Square className="h-4 w-4" />
                Stop Recording
              </>
            ) : (
              <>
                <Camera className="h-4 w-4" />
                Start Recording
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
