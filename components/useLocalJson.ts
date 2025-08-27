'use client'
import { useEffect, useState } from 'react'

export function useLocalJson<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(initial)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw) setState(JSON.parse(raw))
    } catch {}
  }, [key])
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(state)) } catch {}
  }, [key, state])
  return [state, setState] as const
}
