import type { AccentKey } from '@/data/techStack'
import { sortAlpha } from '@/utils/sort'

export type PrimaryTag = 'app' | 'web' | 'game' | 'widget' | 'plugin' | 'library' | 'mod'
export type DomainTag  = 'system' | 'productivity' | 'devtool' | 'graphics' | 'gameplay' | 'utility' | 'education'
export type RuntimeTag = 'linux' | 'windows' | 'mac' | 'browser' | 'node' | 'cross-platform'

export type Tag = {
  primary: PrimaryTag,
  domain?: DomainTag[]
  runtime?: RuntimeTag[],
}

export type TagEntry = { type: 'primary' | 'domain' | 'runtime'; value: string }

export function getTagEntries(tags: Tag): TagEntry[] {
  return [
    { type: 'primary', value: tags.primary },
    ...sortAlpha(tags.domain  ?? []).map(v => ({ type: 'domain'  as const, value: v })),
    ...sortAlpha(tags.runtime ?? []).map(v => ({ type: 'runtime' as const, value: v })),
  ]
}

export type ProjectStatus = 'active' | 'complete' | 'wip' | 'archived'

export const STATUS_LEGEND: Record<ProjectStatus, string> = {
  active:   '#68d391',
  wip:      '#facc15',
  complete: '#63b3ed',
  archived: '#AAAAAA',
}

export interface Project {
  id: string
  name: string
  description: string
  longDescription?: string
  tags: Tag
  tech: string[]
  status: ProjectStatus
  pinned: boolean
  icon: string
  accentColor: AccentKey
  statusColor: AccentKey
  date: Date,
  url?: string
  repo?: string
  screenshots?: string[]
}

export const projects: Project[] = [
  // {
  //   id: 'tax-assist',
  //   name: 'TaxAssist',
  //   description: 'Client-side tax assistant with in-browser OCR and PDF export. No backend, no data leaves your device.',
  //   longDescription: 'TaxAssist runs entirely in the browser — documents are processed locally via Tesseract.js OCR and rendered into a filled PDF without ever leaving the device. Designed as a privacy-first alternative for simple returns, where the convenience of automation usually comes at the cost of uploading sensitive financial data to a third party.',
  //   tags: ['web', 'tool'],
  //   tech: ['React', 'TypeScript', 'Tesseract.js'],
  //   status: 'active',
  //   pinned: false,
  //   icon: '⚡',
  //   accentColor: 'blue',
  //   statusColor: 'green',
  //   date: new Date('2026-01-01'),
  //   url: '',
  //   repo: '',
  //   screenshots: [],
  // },
  // {
  //   id: 'project-nemesis',
  //   name: 'Project Nemesis',
  //   description: 'Dark fantasy top-down 2D action-adventure. Zelda-style combat, Lufia 2 puzzle mechanics, Souls-inspired tone.',
  //   longDescription: 'A 2D action-adventure built in Godot 4. Combat takes cues from classic top-down Zelda — tight, deliberate, weapon-driven - while puzzle design draws from Lufia II\'s tile-based environmental logic. The world tone leans into Souls-style ambiguity: minimal exposition, consequential choices, and a setting that rewards paying attention.',
  //   tags: ['game'],
  //   tech: ['Godot 4', 'GDScript'],
  //   status: 'wip',
  //   pinned: true,
  //   icon: '🗡️',
  //   accentColor: 'purple',
  //   statusColor: 'amber',
  //   date: new Date('2026-01-01'),
  //   url: '',
  //   repo: '',
  //   screenshots: [],
  // },
  {
    id: 'aestheticclock-port',
    name: 'Aesthetic Clock - KDE Plasma 6 Port',
    description: 'A modern port of the classic Aesthetic Clock for KDE Plasma 6.',
    longDescription: 'A modern port of the classic Aesthetic Clock for KDE Plasma 6. Features dynamic fill-style text animations, real-time system monitoring via KSysguard, and smart media player integration. Now ported to KDE Plasma 6 with modern QML and Plasma 6 APIs.',
    tags: {
      primary: 'widget',
      runtime: ['linux'],
      domain: ['system']
    },
    tech: ['Qt', 'QML', 'KDE'],
    status: 'active',
    pinned: true,
    icon: '🕒',
    accentColor: 'blue',
    statusColor: 'green',
    date: new Date('2026-05-01'),
    url: '',
    repo: 'https://github.com/ecdevv/plasma-applet-aestheticclock',
    screenshots: ['/screenshots/aestheticclock_preview.webp', '/screenshots/aestheticclock_preview2.webp', '/screenshots/aestheticclock_preview3.webp'],
  },
  {
    id: 'criticore',
    name: 'CritiCore',
    description: 'Video game critic aggregator for PC games using Steam and OpenCritic APIs.',
    longDescription: 'CritiCore pulls critic and player scores from Steam and OpenCritic into a single dashboard, making it easy to compare consensus across both audiences without hopping between sites. Built with Next.js for fast page loads and dynamic per-game routes.',
    tags: {
      primary: 'web',
    },
    tech: ['Next.js', 'React', 'TypeScript', 'HTML', 'CSS', 'Tailwind'],
    status: 'complete',
    pinned: true,
    icon: '⭐',
    accentColor: 'gray',
    statusColor: 'blue',
    date: new Date('2025-01-10'),
    url: 'https://criticore.vercel.app/',
    repo: 'https://github.com/ecdevv/CritiCore',
    screenshots: ['/screenshots/criticore_preview.webp', '/screenshots/criticore_preview2.webp', '/screenshots/criticore_preview3.webp', '/screenshots/criticore_preview4.webp', '/screenshots/criticore_preview5.webp'],
  },
  {
    id: 'urban-luxe',
    name: 'Urban Luxe',
    description: 'An e-commerce apparel store of a luxury clothing brand.',
    longDescription: 'Urban Luxe is a full e-commerce front-end for a fictional luxury apparel brand with a product catalog, cart flow, and responsive layouts. Built with Next.js to combine static generation for performance with dynamic routing for individual product pages.',
    tags: {
      primary: 'web',
    },
    tech: ['Next.js', 'React', 'TypeScript', 'HTML', 'CSS'],
    status: 'complete',
    pinned: true,
    icon: '🛍️',
    accentColor: 'gray',
    statusColor: 'blue',
    date: new Date('2024-07-31'),
    url: 'https://urbanluxe.vercel.app/',
    repo: 'https://github.com/ecdevv/urban-luxe',
    screenshots: ['/screenshots/urbanluxe_preview.webp', '/screenshots/urbanluxe_preview2.webp', '/screenshots/urbanluxe_preview3.webp', '/screenshots/urbanluxe_preview4.webp'],
  },
]

export const pinnedProjects = projects.filter(p => p.pinned)
