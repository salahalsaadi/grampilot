'use client'
import { useLocalJson } from '@/components/useLocalJson'

export default function Audience() {
  const [contacts] = useLocalJson('contacts', [
    { id: 'u1', username: 'lisa.van.dijk', tags: ['New'], lastInteractionAt: Date.now()-1000*60*60 },
    { id: 'u2', username: 'old.user', tags: [], lastInteractionAt: Date.now()-1000*60*60*36 }
  ])
  return (
    <div className="card p-4">
      <div className="font-semibold mb-2">Audience</div>
      <table className="w-full text-sm">
        <thead><tr className="text-left text-neutral-500"><th>Gebruiker</th><th>Tags</th><th>Laatst actief</th></tr></thead>
        <tbody>
          {contacts.map(c => (
            <tr key={c.id} className="border-t">
              <td>@{c.username}</td>
              <td>{c.tags.join(', ') || '-'}</td>
              <td>{Math.round((Date.now()-c.lastInteractionAt)/3600000)} uur geleden</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
