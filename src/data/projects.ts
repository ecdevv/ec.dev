import type { AccentKey } from '@/data/techStack'
import { sortAlpha } from '@/utils/sort'

export type PrimaryTag = 'app' | 'cli' | 'web' | 'game' | 'widget' | 'plugin' | 'library' | 'mod'
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
  //   id: 'project-nemesis',
  //   name: 'Project Nemesis',
  //   description: 'Dark fantasy top-down 2D action-adventure. Zelda-style combat, Lufia 2 puzzle mechanics, Souls-inspired tone.',
  //   longDescription: 'A 2D action-adventure built in Godot 4. Combat takes cues from classic top-down Zelda — tight, deliberate, weapon-driven — while puzzle design draws from Lufia II\'s tile-based environmental logic. The world tone leans into Souls-style ambiguity: minimal exposition, consequential choices, and a setting that rewards paying attention.',
  //   tags: ['game'],
  //   tech: ['Godot 4', 'GDScript'],
  //   status: 'wip',
  //   pinned: false,
  //   icon: '🗡️',
  //   accentColor: 'purple',
  //   statusColor: 'amber',
  //   date: new Date('2026-01-01'),
  //   url: '',
  //   repo: '',
  //   screenshots: [],
  // },
  {
    id: 'lumen',
    name: 'Lumen',
    description: 'A token-efficient, local-LLM-first coding agent CLI. Claude Code "light" with Pi-style modularity.',
    longDescription: 'A token-efficient coding agent CLI built around local LLMs first via llama.cpp, with an OpenAI-compatible HTTP Provider trait so remote backends (Anthropic, OpenAI, Gemini) slot in later without refactoring. Rust workspace with a strict core (lib) and cli (bin) boundary — Pi-style modularity that keeps the agent core reusable beyond the terminal.',
    tags: {
      primary: 'cli',
      runtime: ['cross-platform'],
      domain: ['devtool', 'productivity']
    },
    tech: ['Rust', 'llama.cpp'],
    status: 'wip',
    pinned: true,
    icon: '🖥️',
    accentColor: 'purple',
    statusColor: 'amber',
    date: new Date('2026-05-12'),
    url: '',
    repo: 'https://github.com/ecdevv/lumen',
    screenshots: ['/screenshots/projects/lumen/lumen_preview.webp'],
  },
  {
    id: 'plasma-applet-aestheticclock',
    name: 'Aesthetic Clock - KDE Plasma 6 Port',
    description: 'A modern port of the classic Aesthetic Clock widget to KDE Plasma 6, rewritten with modern QML and Plasma 6 APIs.',
    longDescription: 'A modern port of the classic Aesthetic Clock widget to KDE Plasma 6. Features dynamic fill-style text animations, real-time system monitoring via KSysguard, and smart media player integration — rewritten with modern QML and Plasma 6 APIs.',
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
    screenshots: ['/screenshots/projects/aestheticclock/aestheticclock_preview.webp', '/screenshots/projects/aestheticclock/aestheticclock_preview2.webp', '/screenshots/projects/aestheticclock/aestheticclock_preview3.webp'],
  },
  {
    id: 'criticore',
    name: 'CritiCore',
    description: 'A critic and player score aggregator pulling from Steam and OpenCritic into one dashboard.',
    longDescription: 'CritiCore aggregates critic and player scores from Steam and OpenCritic into a single dashboard, surfacing both perspectives without hopping between sites. Built with Next.js for fast page loads and dynamic per-game routes.',
    tags: {
      primary: 'web',
    },
    tech: ['Next.js', 'React', 'TypeScript', 'HTML', 'CSS', 'Tailwind'],
    status: 'complete',
    pinned: false,
    icon: '⭐',
    accentColor: 'gray',
    statusColor: 'blue',
    date: new Date('2025-01-10'),
    url: 'https://criticore.vercel.app/',
    repo: 'https://github.com/ecdevv/CritiCore',
    screenshots: ['/screenshots/projects/criticore/criticore_preview.webp', '/screenshots/projects/criticore/criticore_preview2.webp', '/screenshots/projects/criticore/criticore_preview3.webp', '/screenshots/projects/criticore/criticore_preview4.webp', '/screenshots/projects/criticore/criticore_preview5.webp'],
  },
  {
    id: 'urban-luxe',
    name: 'Urban Luxe',
    description: 'A fictional luxury apparel storefront with full catalog, cart, and responsive layouts — built with Next.js.',
    longDescription: 'Urban Luxe is a fictional luxury apparel storefront built to showcase a complete e-commerce frontend — product catalog, cart flow, and responsive design — powered by Next.js for static generation and dynamic product routing.',
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
    screenshots: ['/screenshots/projects/urbanluxe/urbanluxe_preview.webp', '/screenshots/projects/urbanluxe/urbanluxe_preview2.webp', '/screenshots/projects/urbanluxe/urbanluxe_preview3.webp', '/screenshots/projects/urbanluxe/urbanluxe_preview4.webp'],
  },
]

export const pinnedProjects = projects.filter(p => p.pinned)
