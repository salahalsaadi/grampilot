'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessagesSquare, Workflow, Radio, Users, Megaphone, LayoutDashboard } from 'lucide-react'
import clsx from 'clsx'

export function NavBar() {
  const pathname = usePathname()
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
      <div className="container flex items-center gap-2 py-3">
        <div className="font-semibold text-lg">GramPilot</div>
        <nav className="flex gap-1 ml-6">
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
      </div>
    </div>
  )
}
