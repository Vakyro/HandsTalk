"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hand, Mail, Lock, User, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/context/auth-context'
import { toast } from 'sonner'

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const { login, signup } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let success = false
      
      if (mode === 'login') {
        success = await login(email, password)
        if (success) {
          toast.success('¡Bienvenido de vuelta!')
        } else {
          toast.error('Credenciales incorrectas. Por favor intenta de nuevo.')
        }
      } else {
        success = await signup(email, password, name)
        if (success) {
          toast.success('¡Cuenta creada exitosamente!')
        } else {
          toast.error('No se pudo crear la cuenta. Por favor intenta de nuevo.')
        }
      }

      if (success) {
        onOpenChange(false)
        setEmail('')
        setPassword('')
        setName('')
      }
    } catch {
      toast.error('Algo salió mal. Por favor intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-border/50 p-0 overflow-hidden">
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 px-6 py-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <Hand className="h-7 w-7 text-primary-foreground" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">
              {mode === 'login' ? 'Bienvenido de Vuelta' : 'Únete a HandsTalk'}
            </DialogTitle>
          </DialogHeader>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === 'login'
              ? 'Inicia sesión para continuar tu viaje de aprendizaje'
              : 'Comienza tu aventura de aprendizaje de lengua de señas'}
          </p>
        </div>

        <div className="px-6 pb-6 pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative mb-4">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 h-12 border-border/50 bg-muted/30 focus:border-primary"
                      required={mode === 'signup'}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 border-border/50 bg-muted/30 focus:border-primary"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-12 border-border/50 bg-muted/30 focus:border-primary"
                required
                minLength={6}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-primary hover:bg-primary/90 text-base font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="cursor-pointer text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {mode === 'login'
                ? '¿No tienes cuenta? Regístrate'
                : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
