"use client"

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX,
  Maximize,
  Settings,
  Subtitles,
  Gauge
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface GeneratedSignVideoPlayerProps {
  videoUrl: string
  originalText: string
  duration: number
  playbackSpeed?: number
  onSpeedChange?: (speed: number) => void
  showSubtitles?: boolean
  onToggleSubtitles?: () => void
}

const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2]

export function GeneratedSignVideoPlayer({
  videoUrl,
  originalText,
  duration,
  playbackSpeed = 1,
  onSpeedChange,
  showSubtitles = true,
  onToggleSubtitles,
}: GeneratedSignVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed
    }
  }, [playbackSpeed])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      setCurrentTime(0)
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleVideoEnd = () => {
    setIsPlaying(false)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative overflow-hidden rounded-xl bg-foreground/5"
    >
      {/* Video */}
      <div className="relative aspect-video bg-black">
        <video
          ref={videoRef}
          src={videoUrl}
          className="h-full w-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnd}
          muted={isMuted}
          playsInline
        />

        {/* Subtitles overlay */}
        {showSubtitles && (
          <div className="absolute bottom-16 left-0 right-0 text-center px-4">
            <span className="inline-block rounded bg-black/80 px-4 py-2 text-white text-lg">
              {originalText}
            </span>
          </div>
        )}

        {/* Play button overlay */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
          >
            <div className="rounded-full bg-primary p-4 shadow-lg">
              <Play className="h-8 w-8 text-primary-foreground" fill="currentColor" />
            </div>
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="bg-foreground/5 p-4">
        {/* Progress bar */}
        <div className="mb-3">
          <Slider
            value={[currentTime]}
            max={duration}
            step={0.1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="h-10 w-10"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRestart}
              className="h-10 w-10"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className="h-10 w-10"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {/* Speed selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Gauge className="h-4 w-4" />
                  {playbackSpeed}x
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Velocidad de Reproducción</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {playbackSpeeds.map((speed) => (
                  <DropdownMenuItem
                    key={speed}
                    onClick={() => onSpeedChange?.(speed)}
                    className={playbackSpeed === speed ? 'bg-muted' : ''}
                  >
                    {speed}x
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Subtitles toggle */}
            <Button
              variant={showSubtitles ? "secondary" : "ghost"}
              size="icon"
              onClick={onToggleSubtitles}
              className="h-10 w-10"
            >
              <Subtitles className="h-5 w-5" />
            </Button>

            {/* Fullscreen */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="h-10 w-10"
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
