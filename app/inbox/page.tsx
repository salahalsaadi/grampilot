'use client'
import { useLocalJson } from '@/components/useLocalJson'
import { demoThreads, demoMessages } from '@/components/demoData'
import { useState } from 'react'

export default function Inbox() {
  const [threads, setThreads] = useLocalJson('threads', demoThreads)
  const [messages, setMessages] = useLocalJson('messages', demoMessages)
  const [activeId, setActive] = useState(threads[0]?.id || '')
  const [input, setInput] = useState('')

  const activeMsgs = messages[activeId] || []

  function send() {
    if (!input.trim()) return
    const newMsg = { id: 'm'+Date.now(), from: 'jij', text: input, ts: Date.now() }
    setMessages({ ...messages, [activeId]: [...activeMsgs, newMsg] })
    setInput('')
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <aside className="col-span-4 card p-3 space-y-1">
        {threads.map(t => (
          <div key={t.id} onClick={() => setActive(t.id)} className={"p-3 rounded-xl cursor-pointer " + (activeId===t.id ? 'bg-neutral-100' : 'hover:bg-neutral-50')}>
            <div className="font-medium">{t.contact}</div>
            <div className="text-sm text-neutral-500 truncate">{t.last}</div>
          </div>
        ))}
      </aside>
      <section className="col-span-8 card p-4 flex flex-col">
        <div className="flex-1 space-y-3 overflow-auto">
          {activeMsgs.map(m => (
            <div key={m.id} className={"max-w-[70%] p-3 rounded-2xl " + (m.from==='jij' ? 'ml-auto bg-black text-white' : 'bg-neutral-100')}>
              <div className="text-xs opacity-70">{m.from}</div>
              <div>{m.text}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Typ een bericht..." className="flex-1 border rounded-xl px-3 py-2"/>
          <button onClick={send} className="btn btn-primary">Verstuur</button>
        </div>
      </section>
    </div>
  )
}
