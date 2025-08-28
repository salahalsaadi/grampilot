'use client'
import { useAuth } from '@/components/useAuth'
import { useEffect, useMemo, useState } from 'react'
import {
  ensureUser,
  ensureDefaultChannel,
  listContacts,
  createContact,
  lastMessageFor,
  listMessages,
  sendMessage,
} from '@/components/dbInbox'

type Contact = { id: string; username: string }

export default function Inbox() {
  const { user, ready } = useAuth()
  const [channelId, setChannelId] = useState<string>('')
  const [contacts, setContacts] = useState<Contact[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [msgs, setMsgs] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [newUsername, setNewUsername] = useState('new_lead')

  useEffect(() => {
    (async () => {
      if (!ready || !user?.email) return
      const u = await ensureUser(user.email)
      const ch = await ensureDefaultChannel(u.id)
      setChannelId(ch.id)
      const cs = await listContacts(ch.id)
      setContacts(cs as any)
      if (cs.length > 0) {
        setActiveId(cs[0].id)
      }
    })()
  }, [ready, user?.email])

  useEffect(() => {
    (async () => {
      if (!activeId) return
      const m = await listMessages(activeId)
      setMsgs(m)
    })()
  }, [activeId])

  async function handleSend() {
    const text = input.trim()
    if (!text || !activeId) return
    await sendMessage(activeId, 'user', text)
    setInput('')
    const m = await listMessages(activeId)
    setMsgs(m)
  }

  async function handleAddContact() {
    if (!newUsername.trim() || !channelId) return
    const c = await createContact(channelId, newUsername.trim())
    const cs = await listContacts(channelId)
    setContacts(cs as any)
    setActiveId(c.id)
    setNewUsername('new_lead')
  }

  const threads = useMemo(() => {
    return Promise.all(
      contacts.map(async (c) => {
        const lm = await lastMessageFor(c.id)
        return { id: c.id, contact: c.username, last: lm?.content || '' }
      })
    )
  }, [contacts])

  const [threadItems, setThreadItems] = useState<{ id: string; contact: string; last: string }[]>([])
  useEffect(() => {
    let alive = true
    threads.then((t) => alive && setThreadItems(t))
    return () => { alive = false }
  }, [threads])

  return (
    <div className="grid grid-cols-12 gap-4">
      <aside className="col-span-4 card p-3 space-y-2">
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded-xl px-3 py-2"
            placeholder="nieuwe contactnaam"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <button className="btn btn-brand" onClick={handleAddContact}>Toevoegen</button>
        </div>
        {threadItems.map((t) => (
          <div
            key={t.id}
            onClick={() => setActiveId(t.id)}
            className={'p-3 rounded-xl cursor-pointer ' + (activeId === t.id ? 'bg-neutral-100' : 'hover:bg-neutral-50')}
          >
            <div className="font-medium">{t.contact}</div>
            <div className="text-sm text-neutral-500 truncate">{t.last}</div>
          </div>
        ))}
        {threadItems.length === 0 && <div className="text-neutral-500 text-sm">Nog geen contacten.</div>}
      </aside>

      <section className="col-span-8 card p-4 flex flex-col">
        <div className="flex-1 space-y-3 overflow-auto">
          {msgs.map((m) => (
            <div
              key={m.id}
              className={
                'max-w-[70%] p-3 rounded-2xl ' + (m.sender === 'user' ? 'ml-auto bg-black text-white' : 'bg-neutral-100')
              }
            >
              <div className="text-xs opacity-70">{m.sender}</div>
              <div>{m.content}</div>
            </div>
          ))}
          {activeId && msgs.length === 0 && (
            <div className="text-neutral-500 text-sm">Nog geen berichten. Stuur de eerste!</div>
          )}
        </div>
        <div className="mt-4 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Typ een bericht..."
            className="flex-1 border rounded-xl px-3 py-2"
          />
          <button onClick={handleSend} className="btn btn-primary" disabled={!activeId}>
            Verstuur
          </button>
        </div>
      </section>
    </div>
  )
}
