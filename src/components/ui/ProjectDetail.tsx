import { useEffect, useState } from 'react'
import { motion, easeOut } from 'framer-motion'
import clsx from 'clsx'
import { Panel } from '@/components/ui/Panel'
import { ExternalLink} from 'lucide-react'
import {SiGithub as Github } from '@icons-pack/react-simple-icons'
import type { Project } from '@/data/projects'
import { getTech, sortTech } from '@/data/techStack'
import { ICON_BG, STATUS_COLOR } from '@/data/colors'
import Lightbox from './Lightbox'

const STATUS_LABEL = {
  active:   'active',
  complete: 'completed',
  wip:      'wip',
  archived: 'archived',
} as const

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
}
const sectionVariants = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.2, ease: easeOut } },
}
const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 4 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.15, ease: easeOut } },
}


interface Props {
  project: Project
}

export default function ProjectDetail({ project }: Props) {
  const { id, name, description, longDescription, tags, tech, status, statusColor, accentColor, icon, date, url, repo, screenshots } = project
  const dateLabel = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const [maxVisible, setMaxVisible] = useState<number>(() => {
    if (window.matchMedia('(min-width: 1280px)').matches) return 3
    if (window.matchMedia('(min-width: 768px)').matches) return 2
    return 1
  })

  useEffect(() => {
    const mqXl = window.matchMedia('(min-width: 1280px)')
    const mqMd = window.matchMedia('(min-width: 768px)')
    const update = () => {
      if (mqXl.matches) setMaxVisible(3)
      else if (mqMd.matches) setMaxVisible(2)
      else setMaxVisible(1)
    }
    mqXl.addEventListener('change', update)
    mqMd.addEventListener('change', update)
    return () => {
      mqXl.removeEventListener('change', update)
      mqMd.removeEventListener('change', update)
    }
  }, [])

  return (
    <Panel initial={{ opacity: 0, y: 8 }} transition={{ duration: 0.2, ease: easeOut }} className="p-6">
      <motion.div
        className="flex flex-col gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div variants={sectionVariants}>
          <div className="flex items-start gap-3 mb-3">
            <div className={clsx(
              'w-12 h-12 rounded-lg flex items-center justify-center text-[24px] shrink-0',
              ICON_BG[accentColor]
            )}>
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white tracking-tight leading-tight">{name}</h2>
              <p className="font-mono text-[13px] md:text-[14px] text-white/30 mt-1">@{id} · {dateLabel}</p>
            </div>
            <span className={clsx('font-mono text-[12px] md:text-[13px] flex items-center gap-1.5 shrink-0', STATUS_COLOR[statusColor])}>
              <span
                className="w-1.5 h-1.5 rounded-full bg-current shrink-0"
                style={{ boxShadow: '0 0 5px currentColor' }}
              />
              {STATUS_LABEL[status]}
            </span>
          </div>
          <p className="text-[15px] md:text-[16px] text-white/55 leading-relaxed">{description}</p>
        </motion.div>

        {/* Screenshots */}
        {screenshots && screenshots.length > 0 && (
          <motion.div variants={sectionVariants}>
            <p className="panel-label">preview</p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
              {screenshots.slice(0, maxVisible).map((src, i) => {
                const isLast = i === maxVisible - 1
                const remaining = screenshots.length - maxVisible
                const showOverlay = isLast && remaining > 0
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    className="relative aspect-video rounded-md border border-white/10 overflow-hidden bg-white/5 cursor-pointer group hover:border-accent-blue/30 transition-colors"
                    aria-label={
                      showOverlay
                        ? `Show ${remaining} more screenshots`
                        : `Open screenshot ${i + 1} of ${screenshots.length}`
                    }
                  >
                    <img
                      src={src}
                      alt={`${name} screenshot ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    {showOverlay && (
                      <span className="absolute bottom-2 right-2 font-mono text-[12px] md:text-[13px] px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm border border-white/15 text-white/85 group-hover:text-accent-blue group-hover:border-accent-blue/40 transition-colors">
                        +{remaining} more
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
            <Lightbox
              images={screenshots}
              index={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
              onChange={setLightboxIndex}
              alt={`${name} screenshot`}
            />
          </motion.div>
        )}

        {/* About */}
        {longDescription && (
          <motion.div variants={sectionVariants}>
            <p className="panel-label">about</p>
            <p className="text-[14px] md:text-[15px] text-white/45 leading-relaxed whitespace-pre-line">{longDescription}</p>
          </motion.div>
        )}

        {/* Stack */}
        <motion.div variants={sectionVariants}>
          <p className="panel-label">stack</p>
          <motion.div className="flex flex-wrap gap-1.5" variants={listVariants}>
            {sortTech(tech).map(t => {
              const td = getTech(t)
              return (
                <motion.span
                  key={t}
                  variants={itemVariants}
                  className="font-mono text-[12px] md:text-[13px] px-2 py-1 rounded border flex items-center gap-1.5"
                  style={{ color: td.hex, backgroundColor: `${td.hex}1a`, borderColor: `${td.hex}33` }}
                >
                  {td.icon?.(12)}
                  {t}
                </motion.span>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Tags */}
        <motion.div variants={sectionVariants}>
          <p className="panel-label">tags</p>
          <motion.div className="flex flex-wrap gap-1.5" variants={listVariants}>
            {tags.map(t => (
              <motion.span key={t} variants={itemVariants} className="font-mono text-[12px] md:text-[13px] px-2 py-1 rounded border bg-white/5 border-white/10 text-white/50">
                {t}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Links */}
        {(url || repo) && (
          <motion.div variants={sectionVariants}>
            <p className="panel-label">links</p>
            <motion.div className="flex flex-wrap gap-2" variants={listVariants}>
              {url && (
                <motion.a href={url} target="_blank" rel="noopener noreferrer"
                  variants={itemVariants}
                  className="font-mono text-[13px] md:text-[14px] px-3 py-2 rounded-md bg-accent-blue text-surface-base font-bold transition-all hover:brightness-120 flex items-center gap-2">
                  <ExternalLink size={14} /> View Live
                </motion.a>
              )}
              {repo && (
                <motion.a href={repo} target="_blank" rel="noopener noreferrer"
                  variants={itemVariants}
                  className="font-mono text-[13px] md:text-[14px] px-3 py-2 rounded-md border bg-white/3 border-white/10 text-white/50 transition-colors hover:text-white/75 hover:bg-white/8 flex items-center gap-2">
                  <Github size={14} /> View Source
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </Panel>
  )
}
