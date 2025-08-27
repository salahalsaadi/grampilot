'use client'
import { useLocalJson } from '@/components/useLocalJson'
import Link from 'next/link'

export default function Page() {
  const [stats] = useLocalJson('stats', { contacts: 128, active24h: 46, flows: 3, broadcasts: 1 })
  return (
    <div className="grid md:grid-cols-4 gap-4">
      <div className="card p-5">
        <div className="text-sm text-neutral-500">Contacten</div>
        <div className="text-3xl font-semibold">{stats.contacts}</div>
      </div>
      <div className="card p-5">
        <div className="text-sm text-neutral-500">Actief (≤24u)</div>
        <div className="text-3xl font-semibold">{stats.active24h}</div>
      </div>
      <div className="card p-5">
        <div className="text-sm text-neutral-500">Flows</div>
        <div className="text-3xl font-semibold">{stats.flows}</div>
      </div>
      <div className="card p-5">
        <div className="text-sm text-neutral-500">Broadcasts</div>
        <div className="text-3xl font-semibold">{stats.broadcasts}</div>
      </div>
      <div className="card p-6 md:col-span-4">
        <div className="font-semibold mb-2">Snelstart</div>
        <ol className="list-decimal ml-6 space-y-1 text-neutral-700">
          <li>Voeg een kanaal toe onder <b>Channels</b> (mock, meerdere IG-accounts).</li>
          <li>Maak een flow onder <b>Flows</b>.</li>
          <li>Open <b>Inbox</b> en test een automatische reply (simulator).</li>
          <li>Stuur een <b>Broadcast</b> (alleen contacten ≤24u).</li>
        </ol>
        <div className="mt-4 flex gap-2">
          <Link className="btn btn-brand" href="/channels">Connect Instagram</Link>
          <Link className="btn" href="/flows">Nieuwe flow</Link>
        </div>
      </div>
    </div>
  )
}
