import type { AccentKey } from '@/data/techStack'

export type Tag = string
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
  tags: Tag[]
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
  {
    id: 'tax-assist',
    name: 'TaxAssist',
    description: 'Client-side tax assistant with in-browser OCR and PDF export. No backend, no data leaves your device.',
    longDescription: 'TaxAssist runs entirely in the browser — documents are processed locally via Tesseract.js OCR and rendered into a filled PDF without ever leaving the device. Designed as a privacy-first alternative for simple returns, where the convenience of automation usually comes at the cost of uploading sensitive financial data to a third party.',
    tags: ['web', 'tool'],
    tech: ['React', 'TypeScript', 'Tesseract.js'],
    status: 'active',
    pinned: false,
    icon: '⚡',
    accentColor: 'blue',
    statusColor: 'green',
    date: new Date('2026-01-01'),
    url: '',
    repo: '',
    screenshots: [],
  },
  {
    id: 'project-nemesis',
    name: 'Project Nemesis',
    description: 'Dark fantasy top-down 2D action-adventure. Zelda-style combat, Lufia 2 puzzle mechanics, Souls-inspired tone.',
    longDescription: 'A 2D action-adventure built in Godot 4. Combat takes cues from classic top-down Zelda — tight, deliberate, weapon-driven — while puzzle design draws from Lufia II\'s tile-based environmental logic. The world tone leans into Souls-style ambiguity: minimal exposition, consequential choices, and a setting that rewards paying attention.',
    tags: ['game'],
    tech: ['Godot 4', 'GDScript'],
    status: 'wip',
    pinned: true,
    icon: '🗡️',
    accentColor: 'purple',
    statusColor: 'amber',
    date: new Date('2026-01-01'),
    url: '',
    repo: '',
    screenshots: [],
  },
  {
    id: 'smartcart',
    name: 'SmartCart',
    description: 'Browser extension for cross-site price intelligence and community opinion aggregation.',
    longDescription: 'A browser extension that surfaces cross-retailer price comparisons and aggregated community sentiment directly on product pages. The goal: turn every product page into a research-grade decision without needing to bounce between a price tracker, a review site, and a Reddit thread.',
    tags: ['extension', 'web'],
    tech: ['TypeScript', 'Chrome APIs'],
    status: 'wip',
    pinned: false,
    icon: '🛒',
    accentColor: 'green',
    statusColor: 'amber',
    date: new Date('2025-01-21'),
    url: '',
    repo: '',
    screenshots: [],
  },
  {
    id: 'criticore',
    name: 'CritiCore',
    description: 'Video game critic aggregator for PC games using Steam and OpenCritic APIs.',
    longDescription: 'CritiCore pulls critic and player scores from Steam and OpenCritic into a single dashboard, making it easy to compare consensus across both audiences without hopping between sites. Built with Next.js for fast page loads and dynamic per-game routes.',
    tags: ['web'],
    tech: ['Next.js', 'React', 'TypeScript', 'HTML', 'CSS', 'Tailwind'],
    status: 'complete',
    pinned: true,
    icon: '⭐',
    accentColor: 'gray',
    statusColor: 'blue',
    date: new Date('2025-01-10'),
    url: 'https://criticore.vercel.app/',
    repo: 'https://github.com/ecdevv/CritiCore',
    screenshots: ['/screenshots/criticore_preview.avif'],
  },
  {
    id: 'urban-luxe',
    name: 'Urban Luxe',
    description: 'An e-commerce apparel store of a luxury clothing brand.',
    longDescription: 'A full e-commerce front-end for a fictional luxury apparel brand — product catalog, cart flow, and responsive layouts. Built with Next.js to combine static generation for performance with dynamic routing for individual product pages.',
    tags: ['web'],
    tech: ['Next.js', 'React', 'TypeScript', 'HTML', 'CSS'],
    status: 'complete',
    pinned: true,
    icon: '🛍️',
    accentColor: 'gray',
    statusColor: 'blue',
    date: new Date('2024-07-31'),
    url: 'https://urbanluxe.vercel.app/',
    repo: 'https://github.com/ecdevv/urban-luxe',
    screenshots: ['/screenshots/urbanluxe_preview.avif', '/screenshots/criticore_preview.avif', '/screenshots/criticore_preview.avif', '/screenshots/criticore_preview.avif'],
  },
]

export const pinnedProjects = projects.filter(p => p.pinned)
