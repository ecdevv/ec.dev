import { NAV_ITEMS } from '@/data/portfolio'
import { socials, email } from '@/data/social'
import type { COMMANDS } from '@/data/shell'

export type PaletteGroup = 'Pages' | 'Actions' | 'Elsewhere'

export type PaletteItem =
  | { kind: 'nav';     id: string; label: string; group: PaletteGroup; to: string;                 keywords?: string[] }
  | { kind: 'command'; id: string; label: string; group: PaletteGroup; cmd: keyof typeof COMMANDS; args?: string[]; keywords?: string[] }
  | { kind: 'link';    id: string; label: string; group: PaletteGroup; url: string;                keywords?: string[] }

const PAGE_KEYWORDS: Record<string, string[]> = {
  home:     ['index', 'start', 'about'],
  projects: ['work', 'portfolio'],
  contact:  ['email', 'reach', 'socials'],
}

export function buildPaletteItems(): PaletteItem[] {
  const pages: PaletteItem[] = NAV_ITEMS.map(({ label, to }) => ({
    kind: 'nav',
    id: `nav:${label}`,
    label: label.charAt(0).toUpperCase() + label.slice(1),
    group: 'Pages',
    to,
    keywords: PAGE_KEYWORDS[label] ?? [],
  }))

  const actions: PaletteItem[] = [
    { kind: 'command', id: 'cmd:resume', label: 'Open resume (PDF)', group: 'Actions', cmd: 'resume', keywords: ['pdf', 'cv'] },
    { kind: 'command', id: 'cmd:whoami', label: 'whoami',            group: 'Actions', cmd: 'whoami', keywords: ['about', 'bio'] },
    { kind: 'command', id: 'cmd:boot',   label: 'Replay boot',       group: 'Actions', cmd: 'boot',   keywords: ['intro', 'animation'] },
  ]

  const elsewhere: PaletteItem[] = [
    ...socials.map<PaletteItem>(s => ({
      kind: 'link',
      id: `link:${s.label}`,
      label: s.label,
      group: 'Elsewhere',
      url: s.url,
      keywords: [s.label.toLowerCase(), s.username, 'external'].filter((k): k is string => Boolean(k)),
    })),
    // Email goes through the shell command (location.href = mailto:...) rather than
    // window.open + 'mailto:' which is unreliable across browsers.
    { kind: 'command', id: 'cmd:email', label: 'Email', group: 'Elsewhere', cmd: 'email', keywords: ['mail', 'contact', email] },
  ]

  return [...pages, ...actions, ...elsewhere]
}
