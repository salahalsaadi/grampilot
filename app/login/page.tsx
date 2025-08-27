'use client'
import { useAuth } from '@/components/useAuth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { user, login, ready } = useAuth()
  const [email, setEmail] = useState('demo@grampilot.app')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (ready && user) router.replace('/')
  }, [ready, user, router])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) { setErr('Vul e-mail en wachtwoord in.'); return }
    login(email, password)
    router.replace('/')
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="card p-6 w-full max-w-md">
        <div className="text-xl font-semibold mb-1">Inloggen</div>
        <div className="text-sm text-neutral-600 mb-4">Demo login (mock) — elk wachtwoord werkt.</div>
        {err && <div className="mb-3 text-sm text-red-600">{err}</div>}
        <div className="space-y-3">
          <div>
            <label className="text-sm block mb-1">E-mail</label>
            <input className="w-full border rounded-xl px-3 py-2" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div>
            <label className="text-sm block mb-1">Wachtwoord</label>
            <input type="password" className="w-full border rounded-xl px-3 py-2" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          <button className="btn btn-brand w-full" type="submit">Inloggen</button>
        </div>
      </form>
    </div>
  )
}
