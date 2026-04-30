import type { AccentKey } from '@/data/techStack'

export const ICON_BG: Record<AccentKey, string> = {
  blue:   'bg-accent-blue/10',
  cyan:   'bg-accent-cyan/10',
  purple: 'bg-accent-purple/10',
  green:  'bg-accent-green/10',
  amber:  'bg-yellow-400/10',
  red:    'bg-accent-red/10',
  gray:   'bg-[#AAAAAA]/10',
}

export const STATUS_HEX: Record<AccentKey, string> = {
  blue:   '#63b3ed',
  cyan:   '#76e5f7',
  purple: '#9f7aea',
  green:  '#68d391',
  amber:  '#facc15',
  red:    '#fc8181',
  gray:   '#AAAAAA',
}

export const STATUS_COLOR: Record<AccentKey, string> = {
  blue:   'text-accent-blue',
  cyan:   'text-accent-cyan',
  purple: 'text-accent-purple',
  green:  'text-accent-green',
  amber:  'text-yellow-400',
  red:    'text-accent-red',
  gray:   'text-[#AAAAAA]',
}
