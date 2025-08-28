'use client'
import { useEffect, useState } from 'react'
import { getSupabase } from '@/lib/supabase'
import { useAuth } from '@/components/useAuth'

type Row = { id:string; username:string; label:string|null }

export default function Audience() {
  const { user, ready } = useAuth()
  const [rows, setRows] = useState<Row[]>([])
  const [q, setQ] = useState('')

  useEffect(() => {
    (async () => {
      if (!ready || !user) return
      const supabase = getSupabase()!
      const { data: u } = await supabase.from('users').select('id').eq('email', user.email).maybeSingle()
      if (!u) return
      const { data: ch } = await supabase.from('channels').select('id').eq('user_id', u.id).limit(1)
      const channelId = ch?.[0]?.id
      if (!channelId) return
      const { data } = await supabase.from('contacts').select('id, username, label').eq('channel_id', channelId).order('created_at')
      setRows((data||[]) as any)
    })()
  }, [ready, user])

  async function setLabel(id:string, label:string) {
    const supabase = getSupabase()!
    await supabase.from('contacts').update({ label }).eq('id', id)
    setRows(prev => prev.map(r => r.id===id ? {...r, label} : r))
  }

  async function remove(id:string) {
    const supabase = getSupabase()!
    await supabase.from('contacts').delete().eq('id', id)
    setRows(prev => prev.filter(r => r.id!==id))
  }

  const filtered = rows.filter(r => r.username.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="card p-4">
      <div className="flex flex-wrap gap-2 items-center mb-3">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Zoek username…" className="border rounded-xl px-3 py-2"/>
        <div className="text-sm text-neutral-500">{filtered.length} contacten</div>
      </div>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-neutral-500">
              <th className="py-2">Username</th>
              <th className="py-2">Label</th>
              <th className="py-2">Acties</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r=>(
              <tr key={r.id} className="border-t">
                <td className="py-2">{r.username}</td>
                <td className="py-2">
                  <span className="badge">{r.label || '—'}</span>
                </td>
                <td className="py-2 flex gap-2">
                  <button className="btn" onClick={()=>setLabel(r.id,'nieuw')}>Nieuw</button>
                  <button className="btn" onClick={()=>setLabel(r.id,'warm')}>Warm</button>
                  <button className="btn" onClick={()=>setLabel(r.id,'klant')}>Klant</button>
                  <button className="btn" onClick={()=>setLabel(r.id,'')}>Leeg</button>
                  <button className="btn" onClick={()=>remove(r.id)}>Verwijder</button>
                </td>
              </tr>
            ))}
            {filtered.length===0 && (
              <tr><td className="py-6 text-neutral-500" colSpan={3}>Geen contacten gevonden.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
