"use client"

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Video, X, FileVideo } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VideoUploaderProps {
  onVideoSelect: (blob: Blob) => void
}

export function VideoUploader({ onVideoSelect }: VideoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('video/')) {
      handleFileSelect(file)
    }
  }

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const clearSelection = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setSelectedFile(null)
    setPreviewUrl(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const confirmSelection = () => {
    if (selectedFile) {
      onVideoSelect(selectedFile)
    }
  }

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        onChange={handleInputChange}
        className="hidden"
      />

      <AnimatePresence mode="wait">
        {previewUrl ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
              <video 
                src={previewUrl} 
                className="h-full w-full object-cover" 
                controls
              />
              <button
                onClick={clearSelection}
                className="absolute right-2 top-2 cursor-pointer rounded-full bg-foreground/80 p-1.5 text-background transition-colors hover:bg-foreground"
                aria-label="Remove video"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
              <div className="flex items-center gap-3">
                <FileVideo className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium text-foreground text-sm">{selectedFile?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {((selectedFile?.size || 0) / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" onClick={clearSelection}>
                Elegir Otro Video
              </Button>
              <Button onClick={confirmSelection} className="bg-primary hover:bg-primary/90">
                Procesar Este Video
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`flex aspect-video cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors ${
              isDragging 
                ? 'border-primary bg-primary/5' 
                : 'border-border/50 bg-muted/30 hover:border-primary/50 hover:bg-muted/50'
            }`}
          >
            <div className="flex flex-col items-center gap-3 p-6 text-center">
              <div className={`rounded-full p-3 transition-colors ${isDragging ? 'bg-primary/10' : 'bg-muted'}`}>
                {isDragging ? (
                  <Video className="h-8 w-8 text-primary" />
                ) : (
                  <Upload className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {isDragging ? 'Suelta tu video aquí' : 'Subir un video'}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Arrastra y suelta o haz clic para buscar
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  MP4, WebM, MOV hasta 100MB
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
