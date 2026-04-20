"use client"

import Link from 'next/link'
import { Hand, Github, Twitter, Linkedin } from 'lucide-react'

const footerLinks = {
  product: [
    { label: 'Seña a Texto', href: '/sign-to-text' },
    { label: 'Texto a Seña', href: '/text-to-sign' },
    { label: 'Aprender', href: '/learn' },
    { label: 'Guardados', href: '/saved' },
  ],
  resources: [
    { label: 'Documentación', href: '#' },
    { label: 'Referencia de API', href: '#' },
    { label: 'Comunidad', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  company: [
    { label: 'Acerca de', href: '#' },
    { label: 'Empleos', href: '#' },
    { label: 'Contacto', href: '#' },
    { label: 'Prensa', href: '#' },
  ],
  legal: [
    { label: 'Privacidad', href: '#' },
    { label: 'Términos', href: '#' },
    { label: 'Accesibilidad', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                <Hand className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">HandsTalk</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground leading-relaxed">
              Rompiendo barreras de comunicación con traducción de lengua de señas impulsada por IA y aprendizaje interactivo.
            </p>
            <div className="mt-6 flex gap-4">
              <SocialLink href="#" icon={Twitter} label="Twitter" />
              <SocialLink href="#" icon={Github} label="GitHub" />
              <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Producto</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Recursos</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Compañía</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>

            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border/50 pt-6">
          <p className="text-center text-sm text-muted-foreground">
            {new Date().getFullYear()} HandsTalk. Todos los derechos reservados. Haciendo la comunicación accesible para todos.
          </p>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ 
  href, 
  icon: Icon, 
  label 
}: { 
  href: string
  icon: React.ElementType
  label: string 
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
    >
      <Icon className="h-5 w-5" />
    </a>
  )
}
