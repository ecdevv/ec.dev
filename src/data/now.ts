export interface NowEntry {
  category: string
  primary: string
  secondary?: string
}

export const nowEntries: NowEntry[] = [
  { category: 'working',   primary: 'project-nemesis',          secondary: 'godot 4 · enemy ai' },
  // { category: 'reading',   primary: 'dune messiah' },
  { category: 'playing',   primary: 'kingdom come deliverance ii' },
  { category: 'ricing',    primary: 'kde + glass & darkly' },
  { category: 'training',  primary: 'push / pull / legs split' },
  { category: 'listening', primary: 'corridors of time - yasunori mitsuda' },
]

export const nowUpdated = '2026-04-25'
