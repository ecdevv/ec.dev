import { useState } from 'react'
import { motion, easeOut } from 'framer-motion'
import clsx from 'clsx'
import type { Project } from '@/data/projects'
import { getTech } from '@/data/techStack'
import { ICON_BG, STATUS_HEX } from '@/data/colors'

interface Props {
  project: Project
  delay?: number
  isActive?: boolean
  onSelect?: () => void
}

export default function ProjectCard({ project, delay = 0, isActive = false, onSelect }: Props) {
  const { name, description, tech, icon, accentColor, statusColor } = project
  const firstTech = getTech(tech[0])
  const [frozenDelay] = useState(delay)

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-label={name}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: frozenDelay, ease: easeOut }}
      className={clsx(
        'w-full text-left flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors group cursor-pointer border border-l-2',
        isActive
          ? 'bg-accent-blue/6 border-accent-blue/40'
          : 'bg-white/3 border-white/6 hover:bg-white/7 hover:border-accent-blue/25'
      )}
      style={{ borderLeftColor: STATUS_HEX[statusColor] }}
    >
      {/* Icon */}
      <div className={clsx('w-8 h-8 rounded-md flex items-center justify-center text-[15px] shrink-0', ICON_BG[accentColor])}>
        {icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className={clsx('font-display font-bold text-[14px] md:text-[15px] transition-colors truncate', isActive ? 'text-white' : 'text-white/85')}>{name}</p>
        <p className={clsx('font-mono text-[12px] md:text-[13px] transition-colors truncate mt-0.5', isActive ? 'text-white/50' : 'text-white/40 group-hover:text-white/55')}>{description}</p>
      </div>

      {/* Right side: tech badge + link */}
      <div className="flex items-center gap-2 shrink-0">
        <span
          className="font-mono text-[12px] md:text-[13px] px-2 py-0.5 rounded border flex items-center gap-1"
          style={{ color: firstTech.hex, backgroundColor: `${firstTech.hex}1a`, borderColor: `${firstTech.hex}33` }}
        >
          {firstTech.icon?.(12)}
          {tech[0]}
        </span>

      </div>
    </motion.button>
  )
}
