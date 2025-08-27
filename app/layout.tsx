import './globals.css'
import { ReactNode } from 'react'
import { NavBar } from '@/components/navbar'

export const metadata = {
  title: 'GramPilot — Instagram Automation',
  description: 'Bouw DM-flows, labels en broadcasts sneller dan ManyChat (simulator mode).',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <NavBar />
        <main className="container mt-6">{children}</main>
        <footer className="container py-10 text-sm text-neutral-500">
          GramPilot v0.3 — Branding • Simulator modus (zonder Meta API)
        </footer>
      </body>
    </html>
  )
}
