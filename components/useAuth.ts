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
    localStorage.setItem(KEY, JSON.stringify(u))
    setUser(u)
  }

  function logout() {
    localStorage.removeItem(KEY)
    setUser(null)
  }

  return { user, ready, login, logout }
}
