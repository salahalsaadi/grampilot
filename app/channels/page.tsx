'use client'
import { useLocalJson } from '@/components/useLocalJson'
import { useState } from 'react'

type Channel = { id: string, platform: 'instagram', name: string, pageId?: string, status: 'connected'|'mock' }

export default function Channels() {
  const [channels, setChannels] = useLocalJson<Channel[]>('channels', [])
  const [name, setName] = useState('IG @account')

  function addMock() {
    setChannels([...channels, { id: 'c' + Date.now(), platform: 'instagram', name, status: 'mock' }])
    setName('IG @account')
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card p-4">
        <div className="font-semibold mb-2">Kanalen</div>
        <div className="space-y-2">
          {channels.map(c => (
            <div key={c.id} className="p-3 rounded-2xl border flex items-center justify-between">
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-xs text-neutral-500">Instagram • {c.status}</div>
              </div>
              <button className="btn">Instellingen</button>
            </div>
          ))}
          {channels.length === 0 && <div className="text-neutral-500">Nog geen kanalen.</div>}
        </div>
      </div>

      <div className="card p-4">
        <div className="font-semibold mb-2">Instagram verbinden (mock)</div>
        <p className="text-sm text-neutral-600">
          Later verbinden we hier echte Instagram via Meta Login. Voor nu kun je mock-kanalen gebruiken om flows te testen.
        </p>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border rounded-xl px-3 py-2 mt-3"
          placeholder="IG @account"
        />
        <button onClick={addMock} className="btn btn-brand mt-3">Mock-kanaal toevoegen</button>
      </div>

      <div className="card p-4 md:col-span-2">
        <div className="font-semibold mb-2">Connect Instagram (Coming Soon)</div>
        <p className="text-sm text-neutral-600">
          Hier verschijnt straks de echte Meta Login. Tot die tijd kun je mock-kanalen gebruiken.
        </p>
        <div className="mt-3 flex gap-2">
          <button className="btn btn-primary" disabled>Login met Facebook (uitgeschakeld)</button>
          <a className="btn" href="https://developers.facebook.com/docs/instagram-api" target="_blank" rel="noreferrer">Documentatie</a>
        </div>
      </div>
    </div>
  )
}
