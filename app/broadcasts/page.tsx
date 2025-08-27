'use client'
import { useLocalJson } from '@/components/useLocalJson'
import { useState } from 'react'

type Contact = { id: string, username: string, lastInteractionAt: number }

export default function Broadcasts() {
  const [contacts] = useLocalJson<Contact[]>('contacts', [
    { id: 'u1', username: 'lisa.van.dijk', lastInteractionAt: Date.now() - 1000*60*60 }, // binnen 24u
    { id: 'u2', username: 'old.user', lastInteractionAt: Date.now() - 1000*60*60*26 }, // >24u
  ])
  const [text, setText] = useState('🔥 Nieuwe actie!')
  const eligible = contacts.filter(c => Date.now()-c.lastInteractionAt < 1000*60*60*24)
  const [sent, setSent] = useState<string[]>([])

  function send() {
    setSent(eligible.map(c=>c.username))
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card p-4">
        <div className="font-semibold mb-2">Nieuwe broadcast</div>
        <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full border rounded-xl px-3 py-2 h-28"/>
        <div className="text-sm text-neutral-600 mt-2">Toegestaan naar contacten met laatste interactie ≤ 24u. (Compliance gate)</div>
        <button onClick={send} className="btn btn-primary mt-3">Versturen (simulatie)</button>
      </div>
      <div className="card p-4">
        <div className="font-semibold mb-2">Segment (≤24u)</div>
        <ul className="space-y-2">
          {eligible.map(c => <li key={c.id} className="p-2 rounded-xl border flex justify-between"><span>@{c.username}</span><span className="badge">OK</span></li>)}
        </ul>
        {sent.length>0 && <div className="mt-4 text-sm">Verzonden naar: {sent.join(', ')}</div>}
      </div>
    </div>
  )
}
