'use client'
import { useEffect, useState } from 'react'
import { getSupabase } from '@/lib/supabase'
import { useAuth } from '@/components/useAuth'
import FlowEditor from '@/components/FlowEditor'
import { FlowDef } from '@/components/flowTypes'

type FlowRow = { id:string; name:string; definition:any }

export default function FlowsPage() {
  const { user, ready } = useAuth()
  const [channelId, setChannelId] = useState<string>('')
  const [flows, setFlows] = useState<FlowRow[]>([])
  const [active, setActive] = useState<FlowRow | null>(null)
  const [draft, setDraft] = useState<FlowDef>({ nodes: [], startId: null })
  const [name, setName] = useState('Nieuwe flow')
  const sb = getSupabase()

  useEffect(() => {
    ;(async () => {
      if (!ready || !user?.email || !sb) return
      const { data: u } = await sb.from('users').select('id').eq('email', user.email).maybeSingle()
      if (!u) return
      const { data: ch } = await sb.from('channels').select('id').eq('user_id', u.id).limit(1)
      const cid = ch?.[0]?.id as string | undefined
      if (!cid) return
      setChannelId(cid)
      const { data: fs } = await sb.from('flows').select('id,name,definition').eq('channel_id', cid).order('created_at')
      const list = (fs || []) as FlowRow[]
      setFlows(list)
      if (list[0]) {
        setActive(list[0])
        setDraft(list[0].definition as FlowDef)
        setName(list[0].name)
      }
    })()
  }, [ready, user?.email, sb])

  async function createFlow() {
    if (!sb || !channelId) return
    const base: FlowDef = { nodes: [], startId: null }
    const { data } = await sb.from('flows').insert({ channel_id: channelId, name: 'Nieuwe flow', definition: base }).select('id,name,definition').single()
    const row = data as FlowRow
    setFlows(prev => [...prev, row])
    setActive(row)
    setDraft(row.definition as FlowDef)
    setName(row.name)
  }

  async function saveFlow() {
    if (!sb || !active) return
    await sb.from('flows').update({ name, definition: draft }).eq('id', active.id)
    setFlows(prev => prev.map(f => f.id===active.id ? { ...f, name, definition: draft } : f))
  }

  async function removeFlow(id:string) {
    if (!sb) return
    await sb.from('flows').delete().eq('id', id)
    const list = flows.filter(f => f.id!==id)
    setFlows(list)
    if (active?.id === id) {
      const next = list[0] || null
      setActive(next)
      setDraft(next?.definition || { nodes: [], startId: null })
      setName(next?.name || 'Nieuwe flow')
    }
  }

  function selectFlow(f: FlowRow) {
    setActive(f)
    setDraft((f.definition || { nodes: [], startId: null }) as FlowDef)
    setName(f.name)
  }

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <aside className="card p-4">
        <div className="font-semibold mb-2">Flows</div>
        <button className="btn btn-brand mb-3" onClick={createFlow}>+ Nieuwe flow</button>
        <div className="space-y-2">
          {flows.map(f=>(
            <div key={f.id} className={"p-3 rounded-xl border flex items-center justify-between " + (active?.id===f.id ? "border-black" : "hover:bg-neutral-50")}>
              <button onClick={()=>selectFlow(f)} className="text-left">{f.name}</button>
              <button className="btn" onClick={()=>removeFlow(f.id)}>Verwijder</button>
            </div>
          ))}
          {flows.length===0 && <div className="text-neutral-500 text-sm">Nog geen flows.</div>}
        </div>
      </aside>

      <section className="md:col-span-2 card p-4 space-y-3">
        <div className="font-semibold">Editor</div>
        <input className="border rounded-xl px-3 py-2 w-full" value={name} onChange={e=>setName(e.target.value)} placeholder="Flownaam"/>
        <FlowEditor initial={draft} onChange={setDraft}/>
        <div className="flex gap-2">
          <button className="btn btn-primary" onClick={saveFlow} disabled={!active}>Opslaan</button>
        </div>
      </section>
    </div>
  )
}
