import {
  SiTypescript, SiJavascript, SiReact, SiNextdotjs, SiVite,
  SiTailwindcss, SiHtml5, SiCss, SiPython,
  SiUnrealengine, SiGodotengine, SiRust, SiCplusplus, SiSharp,
  SiNodedotjs, SiDeno, SiBun,
  SiPostgresql, SiMongodb, SiRedis, SiPrisma,
  SiDocker, SiGit,
  SiQt, SiKde
} from '@icons-pack/react-simple-icons'
import tux from '@/assets/tux.svg'

export type AccentKey = 'blue' | 'cyan' | 'purple' | 'green' | 'amber' | 'red' | 'gray'

export interface TechDef {
  icon?: (size?: number) => React.ReactNode
  hex: string
}

export const TECH: Record<string, TechDef> = {
  // Languages
  'TypeScript':       { icon: (s = 18) => <SiTypescript size={s} color="#5B9BD5" />,   hex: '#5B9BD5' },
  'JavaScript':       { icon: (s = 18) => <SiJavascript size={s} color="#F7DF1E" />,   hex: '#F7DF1E' },
  'HTML':             { icon: (s = 18) => <SiHtml5 size={s} color="#E34F26" />,        hex: '#E34F26' },
  'CSS':              { icon: (s = 18) => <SiCss size={s} color="#9B6FD4" />,          hex: '#9B6FD4' },
  'Python':           { icon: (s = 18) => <SiPython size={s} color="#5B9FCC" />,       hex: '#5B9FCC' },
  'Rust':             { icon: (s = 18) => <SiRust size={s} color="#E8693A" />,         hex: '#E8693A' },
  'C++':              { icon: (s = 18) => <SiCplusplus size={s} color="#4A9FD4" />,    hex: '#4A9FD4' },
  'C#':               { icon: (s = 18) => <SiSharp size={s} color="#B07ED4" />,        hex: '#B07ED4' },
  'QML':              {                                                                hex: '#8E5CFF' },

  // Frameworks / Libraries
  'React':            { icon: (s = 18) => <SiReact size={s} color="#61DAFB" />,        hex: '#61DAFB' },
  'Next.js':          { icon: (s = 18) => <SiNextdotjs size={s} color="#AAAAAA" />,    hex: '#AAAAAA' },
  'Vite':             { icon: (s = 18) => <SiVite size={s} color="#A855F7" />,         hex: '#A855F7' },
  'Tailwind':         { icon: (s = 18) => <SiTailwindcss size={s} color="#06B6D4" />,  hex: '#06B6D4' },
  'Node.js':          { icon: (s = 18) => <SiNodedotjs size={s} color="#339933" />,    hex: '#339933' },
  'Deno':             { icon: (s = 18) => <SiDeno size={s} color="#AAAAAA" />,         hex: '#AAAAAA' },
  'Bun':              { icon: (s = 18) => <SiBun size={s} color="#D4A853" />,          hex: '#D4A853' },
  'Qt':               { icon: (s = 18) => <SiQt size={s} color="#41CD52" />,           hex: '#41CD52' },  

  // Databases / ORMs
  'PostgreSQL':       { icon: (s = 18) => <SiPostgresql size={s} color="#6B8EF0" />,   hex: '#6B8EF0' },
  'MongoDB':          { icon: (s = 18) => <SiMongodb size={s} color="#47A248" />,      hex: '#47A248' },
  'Redis':            { icon: (s = 18) => <SiRedis size={s} color="#FF4438" />,        hex: '#FF4438' },
  'Prisma':           { icon: (s = 18) => <SiPrisma size={s} color="#AAAAAA" />,       hex: '#AAAAAA' },

  // Game dev
  'Godot':            { icon: (s = 18) => <SiGodotengine size={s} color="#6AAED6" />,  hex: '#6AAED6' },
  'Godot 4':          { icon: (s = 18) => <SiGodotengine size={s} color="#6AAED6" />,  hex: '#6AAED6' },
  'GDScript':         {                                                                hex: '#6AAED6' },
  'Unreal Engine':    { icon: (s = 18) => <SiUnrealengine size={s} color="#AAAAAA" />, hex: '#AAAAAA' },
  'Unreal Engine 5':  { icon: (s = 18) => <SiUnrealengine size={s} color="#AAAAAA" />, hex: '#AAAAAA' },
  'UE5':              { icon: (s = 18) => <SiUnrealengine size={s} color="#AAAAAA" />, hex: '#AAAAAA' },

  // Tooling / Infrastructure
  'Docker':           { icon: (s = 18) => <SiDocker size={s} color="#2496ED" />,       hex: '#2496ED' },
  'Git':              { icon: (s = 18) => <SiGit size={s} color="#F05032" />,          hex: '#F05032' },
  'Linux':            { icon: (s = 18) => <img src={tux} width={s} height={s} alt="linux" />, hex: '#FCC624' },

  // Desktop / UI Platforms
  'KDE':              { icon: (s = 18) => <SiKde size={s} color="#1D99F3" />,          hex: '#1D99F3' },

  // Misc
  'Chrome APIs':      {                                                                hex: '#4285F4' },
  'Tesseract.js':     {                                                                hex: '#F5A623' },
  'llama.cpp':        {                                                                hex: '#D4A853' },
}

export function getTech(name: string): TechDef {
  return TECH[name] ?? { hex: '#888888' }
}

const TECH_ORDER: Record<string, number> = {
  // Frameworks / Runtimes
  'Node.js': 0, 'Deno': 0, 'Bun': 0,
  'React': 1, 'Qt': 1,
  'Next.js': 2,
  // Build tools
  'Vite': 10,
  // Languages
  'TypeScript': 20, 'JavaScript': 20, 'Python': 20, 'Rust': 20, 'C++': 20, 'C#': 20,
  'QML': 21,
  // Markup / styling
  'HTML': 30, 'CSS': 30, 'Tailwind': 30,
  // Databases / ORMs
  'PostgreSQL': 40, 'MongoDB': 40, 'Redis': 40, 'Prisma': 40,
  // Game engines + paired scripting languages (adjacent intentionally)
  'Godot': 50, 'Godot 4': 50,
  'GDScript': 51,
  'Unreal Engine': 52, 'Unreal Engine 5': 52, 'UE5': 52,
  // Tooling / infra
  'Docker': 60, 'Git': 60, 'Linux': 60,
  // Desktop / UI Platforms
  'KDE': 70,
  // Misc / APIs - unknown keys default to 80
}

export function sortTech(tech: string[]): string[] {
  return [...tech].sort((a, b) => (TECH_ORDER[a] ?? 80) - (TECH_ORDER[b] ?? 80))
}

