'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessagesSquare, Workflow, Radio, Users, Megaphone, LayoutDashboard, LogOut } from 'lucide-react'
import clsx from 'clsx'
import { Logo } from '@/components/Logo'
import { useAuth } from '@/components/useAuth'

export function NavBar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const links = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/inbox', label: 'Inbox', icon: MessagesSquare },
    { href: '/flows', label: 'Flows', icon: Workflow },
    { href: '/broadcasts', label: 'Broadcasts', icon: Megaphone },
    { href: '/channels', label: 'Channels', icon: Radio },
    { href: '/audience', label: 'Audience', icon: Users },
  ]
  return (
    <div className="bg-white border-b">
      <div className="container flex items-center gap-4 py-3">
        <Link href="/" className="text-[var(--brand)]">
          <Logo />
        </Link>
        <nav className="flex gap-1 ml-auto">
          {links.map((l) => {
            const Icon = l.icon
            const active = pathname === l.href
            return (
              <Link key={l.href} href={l.href} className={clsx('navlink flex items-center gap-2', active && 'active')}>
                <Icon size={18} /> {l.label}
              </Link>
            )
          })}
        </nav>
        <Link href="/channels" className="btn btn-primary">Connect Instagram</Link>
        {user && (
          <div className="ml-2 flex items-center gap-2 text-sm">
            <span className="badge">{user.email}</span>
            <button className="btn" onClick={logout}><LogOut size={16}/> Uitloggen</button>
          </div>
        )}
      </div>
    </div>
  )
}
