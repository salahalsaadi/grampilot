import './globals.css'
import Link from 'next/link'
import { Inbox, Workflow, Radio, Settings, Gauge } from 'lucide-react'
import { ReactNode } from 'react'
import clsx from 'clsx'
import { NavBar } from '@/components/navbar'

export const metadata = {
  title: 'GramPilot (Prototype)',
  description: 'Instagram automation dashboard prototype',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <NavBar />
        <main className="container mt-6">{children}</main>
        <footer className="container py-10 text-sm text-neutral-500">
          GramPilot v0.1 — Prototype (client-side) • Geen echte Instagram-koppeling — simulator mode
        </footer>
      </body>
    </html>
  )
}
