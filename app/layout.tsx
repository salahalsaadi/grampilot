'use client'
import './globals.css'
import { ReactNode, useEffect } from 'react'
import { NavBar } from '@/components/navbar'
import { useAuth } from '@/components/useAuth'
import { usePathname, useRouter } from 'next/navigation'

export default function RootLayout({ children }: { children: ReactNode }) {
  const { user, ready } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const isLogin = pathname === '/login' || pathname === '/register'

  useEffect(() => {
    if (ready && !user && !isLogin) router.replace('/login')
    if (ready && user && isLogin) router.replace('/')
  }, [ready, user, isLogin, router])

  return (
    <html lang="nl">
      <body>
        {!isLogin && <NavBar />}
        <main className="container mt-6">{children}</main>
        {!isLogin && (
          <footer className="container py-10 text-sm text-neutral-500">
            GramPilot v0.3 — Branding • Simulator modus (mock auth)
          </footer>
        )}
      </body>
    </html>
  )
}
