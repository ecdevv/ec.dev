import { projects } from '@/data/projects';

export const NAV_ITEMS = [
  { label: 'home',     to: '/' },
  { label: 'projects', to: '/projects' },
  { label: 'contact',  to: '/contact' },
  // { label: 'mods',  to: '/mods' },   // uncomment when ready
  // { label: 'blog',  to: '/blog' },
] as const

export const profile = {
  initials: 'ec',
  name: 'Your Name',
  handle: '@ecdevv',
  stats: [
    { num: projects.length.toString(), label: 'projects' },
    { num: '4k+', label: 'commits' },
    { num: '3', label: 'mods' },
  ],
  interests: [
    { label: 'linux', highlight: true },
    { label: 'programming', highlight: true },
    { label: 'ricing', highlight: true },
    { label: 'video games', highlight: false },
    { label: 'board games', highlight: false },
    { label: 'gym', highlight: false },
    { label: 'basketball', highlight: false },
    { label: 'music', highlight: false },
  ],
}

export const hero = {
  tag: '// developer portfolio',
  heading: ['Building things', 'that matter.'],
  subtitle: 'software engineer · problem solver · linux enthusiast',
  description:
    'I build clean, fast software with obsessive attention to detail — from web apps to game mods. Currently open to new opportunities.',
}

export const stack = [
  'TypeScript',
  'React',
  'Next.js',
  'Vite',
  'Linux',
  'Unreal Engine 5',
  'Godot',
]

export const skills = [
  { name: 'TypeScript/Javascript', pct: 90 },
  { name: 'HTML/CSS/Tailwind',   pct: 90 },
  { name: 'React',      pct: 85 },
  { name: 'Next.js',    pct: 80 },
  { name: 'Vite',       pct: 80 },
  { name: 'Python',     pct: 70 },
  { name: 'Systems',    pct: 70 },
  { name: 'Game Dev',   pct: 65 },
  { name: 'C++/C',      pct: 60 },
]
