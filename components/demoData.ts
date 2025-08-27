export const demoThreads = [
  { id: 't1', contact: 'lisa.van.dijk', last: 'Hoi! Werkt dit?', unread: true, tags: ['New'], updatedAt: Date.now() - 1000*60*5 },
  { id: 't2', contact: 'mohammed.store', last: 'Ik wil info over prijzen', unread: false, tags: ['Lead'], updatedAt: Date.now() - 1000*60*30 },
]

export const demoMessages: Record<string, any[]> = {
  't1': [
    { id: 'm1', from: 'lisa.van.dijk', text: 'Hoi! Werkt dit?', ts: Date.now() - 1000*60*6 },
  ],
  't2': [
    { id: 'm2', from: 'jij', text: 'Welkom bij GramPilot 👋', ts: Date.now() - 1000*60*60 },
    { id: 'm3', from: 'mohammed.store', text: 'Ik wil info over prijzen', ts: Date.now() - 1000*60*50 },
  ]
}

export const starterFlows = [
  {
    id: 'f1',
    name: 'Welkom DM',
    nodes: [
      { id: 'n1', type: 'message', text: 'Welkom! Waarmee kan ik je helpen?' },
      { id: 'n2', type: 'choice', text: 'Kies:', options: ['Prijzen', 'Support'] },
      { id: 'n3', type: 'tag', add: 'Lead' }
    ]
  }
]
