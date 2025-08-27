'use client'
import { useEffect, useState } from 'react'

type User = { email: string }
const KEY = 'gp_auth_user'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {}
    setReady(true)
  }, [])

  function login(email: string, _password: string) {
    const u = { email }
    try { localStorage.setItem(KEY, JSON.stringify(u)) } catch {}
    setUser(u)
  }

  function logout() {
    try { localStorage.removeItem(KEY) } catch {}
    setUser(null)
  }

  return { user, ready, login, logout }
}
