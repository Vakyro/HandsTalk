"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Hand, 
  Menu, 
  X, 
  MessageSquareText, 
  Video, 
  GraduationCap, 
  Bookmark,
  LogOut,
  User
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/context/auth-context'
import { AuthDialog } from '@/components/auth/auth-dialog'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Inicio', icon: null },
  { href: '/sign-to-text', label: 'Seña a Texto', icon: MessageSquareText },
  { href: '/text-to-sign', label: 'Texto a Seña', icon: Video },
  { href: '/learn', label: 'Aprender', icon: GraduationCap, requiresAuth: true },
  { href: '/saved', label: 'Guardados', icon: Bookmark, requiresAuth: true },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuth()

  const visibleLinks = navLinks.filter(link => !link.requiresAuth || isAuthenticated)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Hand className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">HandsTalk</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {visibleLinks.map((link) => {
              const isActive = pathname === link.href || 
                (link.href !== '/' && pathname.startsWith(link.href))
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive 
                      ? "text-primary"
                      : "text-muted-foreground hover:bg-muted/50 cursor-pointer hover:text-foreground transition-colors duration-300"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg bg-primary/10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Auth Section */}
          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{user?.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </Button>
              </div>
            ) : (
              <Button onClick={() => setAuthDialogOpen(true)} className="bg-primary hover:bg-primary/90 cursor-pointer transition-colors duration-500">
                Comenzar
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="cursor-pointer rounded-lg p-2 text-foreground hover:bg-muted md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-border/50 bg-background md:hidden"
            >
              <div className="space-y-1 px-4 py-4">
                {visibleLinks.map((link) => {
                  const isActive = pathname === link.href || 
                    (link.href !== '/' && pathname.startsWith(link.href))
                  const Icon = link.icon
                  
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors",
                        isActive 
                          ? "bg-primary/10 text-primary" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                      {link.label}
                    </Link>
                  )
                })}
                
                <div className="border-t border-border/50 pt-4 mt-4">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 px-4">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium text-foreground">{user?.name}</span>
                      </div>
                      <button
                        onClick={() => {
                          logout()
                          setMobileMenuOpen(false)
                        }}
                        className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <LogOut className="h-5 w-5" />
                        Cerrar sesión
                      </button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => {
                        setAuthDialogOpen(true)
                        setMobileMenuOpen(false)
                      }} 
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      Comenzar
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </>
  )
}
