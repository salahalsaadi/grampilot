'use client'
import { useLocalJson } from '@/components/useLocalJson'
import { starterFlows } from '@/components/demoData'
import { useState } from 'react'

export default function Flows() {
  const [flows, setFlows] = useLocalJson('flows', starterFlows)
  const [name, setName] = useState('Nieuwe Flow')

  function addFlow() {
    setFlows([...flows, { id: 'f'+Date.now(), name, nodes: [] }])
    setName('Nieuwe Flow')
  }

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="card p-4 md:col-span-2">
        <div className="font-semibold mb-2">Flows</div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {flows.map(f => (
            <div key={f.id} className="p-4 rounded-2xl border">
              <div className="font-medium">{f.name}</div>
              <div className="text-xs text-neutral-500 mt-1">{f.nodes.length} blokken</div>
              <button className="btn mt-3">Bewerken (mock)</button>
            </div>
          ))}
        </div>
      </div>
      <div className="card p-4">
        <div className="font-semibold mb-2">Nieuwe flow</div>
        <input value={name} onChange={e=>setName(e.target.value)} className="w-full border rounded-xl px-3 py-2"/>
        <button onClick={addFlow} className="btn btn-primary mt-3">Aanmaken</button>
      </div>
    </div>
  )
}
