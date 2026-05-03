import { useRef } from 'react'
import { motion, easeOut, useInView } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { GitHubCalendar } from 'react-github-calendar'
import { profile, hero, stack, skills } from '@/data/portfolio'
import { pinnedProjects } from '@/data/projects'
import { nowEntries, nowUpdated } from '@/data/now'
import { TECH, sortTech } from '@/data/techStack'
import ProjectCard from '@/components/ui/ProjectCard'
import { Panel } from '@/components/ui/Panel'

const HEATMAP_THEME = {
  dark: [
    'rgba(255,255,255,0.05)',
    'rgba(99,179,237,0.22)',
    'rgba(99,179,237,0.42)',
    'rgba(99,179,237,0.68)',
    'rgba(99,179,237,1)',
  ],
}

export default function Home() {
  const navigate = useNavigate()
  const skillsRef = useRef<HTMLDivElement>(null)
  const skillsInView = useInView(skillsRef, { once: true, margin: '-50px' })

  return (
    <div className="pt-6 grid gap-3
      grid-cols-1
      md:grid-cols-[275px_minmax(0,1fr)]
      xl:grid-cols-[280px_minmax(0,1fr)_280px]">

      {/* ── SIDEBAR PROFILE PANEL ── */}
      <Panel delay={0.05} className="p-4 md:row-span-2 xl:col-start-1 xl:row-span-2 flex flex-col gap-0">
        <p className="panel-label">whoami</p>

        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-linear-to-br from-accent-blue to-accent-purple
          flex items-center justify-center font-display font-extrabold text-xl text-white mb-3">
          {profile.initials}
        </div>

        <p className="font-display font-bold text-[15px] md:text-[17px] text-white/90 leading-tight">{profile.name}</p>
        <p className="font-mono text-[13px] md:text-[14px] text-accent-blue mt-0.5 mb-3">{profile.handle}</p>

        <div className="h-px bg-white/[0.07] my-1" />

        {/* Stats */}
        <div className="flex justify-between my-3">
          {profile.stats.map(({ num, label }) => (
            <div key={label} className="text-center">
              <p className="font-mono text-[15px] md:text-[17px] font-bold text-white">{num}</p>
              <p className="font-mono text-[12px] md:text-[13px] text-white/30 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="h-px bg-white/[0.07] my-1" />

        {/* Interests */}
        <p className="panel-label mt-3">interests</p>
        <div className="flex flex-wrap gap-1.5">
          {profile.interests.map(({ label, highlight }, i) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: 0.15 + i * 0.04, ease: easeOut }}
              className={`font-mono text-[12px] md:text-[13px] px-2 py-1 rounded border ${
                highlight
                  ? 'bg-accent-blue/10 border-accent-blue/20 text-accent-blue'
                  : 'bg-white/4 border-white/[0.07] text-white/40'
              }`}
            >
              {label}
            </motion.span>
          ))}
        </div>

        {/* Status */}
        <div className="mt-auto pt-4 flex md:hidden items-center gap-2">
          <div className="status-dot" />
          <span className="font-mono text-[13px] md:text-[14px] text-white/35">open to work</span>
        </div>
      </Panel>

      {/* ── HERO PANEL ── */}
      <Panel delay={0.1} className="p-6 xl:col-start-2">
        <p className="font-mono text-[13px] md:text-[14px] text-accent-blue tracking-[1.5px] uppercase mb-2 opacity-80">
          {hero.tag}
        </p>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white leading-[1.05] tracking-tight">
          {hero.heading.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h1>
        <p className="font-mono text-[13px] md:text-[14px] text-white/35 mt-2">
          {hero.subtitle}
        </p>
        <p className="text-[14px] md:text-[15px] text-white/45 leading-relaxed mt-3 max-w-md">
          {hero.description}
        </p>
        <div className="flex gap-3 mt-5 flex-wrap">
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, delay: 0.25, ease: easeOut }}>
            <Link to="/projects"
              className="font-mono text-[13px] md:text-[14px] px-4 py-2 rounded-md bg-accent-blue text-surface-base font-bold transition-colors hover:bg-accent-blue/80">
              View Projects
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, delay: 0.32, ease: easeOut }}>
            <Link to="/contact"
              className="font-mono text-[13px] md:text-[14px] px-4 py-2 rounded-md border bg-white/3 border-white/10 text-white/50 transition-colors hover:text-white/75 hover:bg-white/8">
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </Panel>

      {/* ── PINNED PROJECTS PANEL ── */}
      <Panel delay={0.1} className="p-4 xl:col-start-2">
        <p className="panel-label">pinned projects</p>
        <div className="flex flex-col gap-2 mt-1">
          {pinnedProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={0.2 + i * 0.05} onSelect={() => navigate(`/projects?project=${p.id}`)} />
          ))}
        </div>
      </Panel>

      {/* ── WIDGET COLUMN (right) — hidden below xl ── */}
      <div className="flex flex-col gap-3
        md:grid md:grid-cols-[1fr_2fr] md:col-span-2
        xl:flex xl:flex-col xl:col-span-1 xl:row-span-2 xl:col-start-3 xl:row-start-1">
        {/* Stack widget */}
        <Panel delay={0.1} className="p-4 md:col-start-1 md:row-start-1">
          <p className="panel-label">stack</p>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {sortTech(stack).map((title, i) => (
            <motion.div
              key={title}
              title={title}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: 0.25 + i * 0.025, ease: easeOut }}
              className="w-11 h-11 rounded-md bg-white/5 border border-white/7
                flex items-center justify-center font-mono text-[12px] md:text-[13px] text-white/50"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '0.5px solid rgba(255,255,255,0.08)',
              }}
            >
              {TECH[title]?.icon?.(18) ?? title}
            </motion.div>
          ))}
          </div>
        </Panel>

        {/* Skills widget */}
        <Panel ref={skillsRef} delay={0.15} className="p-4 flex-1 md:col-start-2 md:row-start-1 md:row-span-2">
          <p className="panel-label">proficiency</p>
          <div className="flex flex-col gap-3 mt-1">
            {skills.map(({ name, pct }, i) => (
              <div key={name}>
                <div className="flex justify-between mb-1">
                  <span className="font-mono text-[12px] md:text-[13px] text-white/40">{name}</span>
                  <span className="font-mono text-[12px] md:text-[13px] text-accent-blue">{pct}%</span>
                </div>
                <div className="h-[3px] bg-white/6 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-linear-to-r from-accent-blue to-accent-purple"
                    initial={{ width: '0%' }}
                    animate={skillsInView ? { width: `${pct}%` } : undefined}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: easeOut }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Status widget */}
        <Panel delay={0.15} className="hidden md:block p-4 md:col-start-1 md:row-start-2">
          <p className="panel-label">status</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="status-dot" />
            <span className="font-mono text-[13px] md:text-[14px] text-white/40">open to work</span>
          </div>
        </Panel>
      </div>

      {/* ── BOTTOM ROW: contributions + now ── */}
      <div className="md:col-span-2 xl:col-span-3 grid gap-3
        grid-cols-1
        md:grid-cols-[260px_minmax(0,1fr)]
        lg:grid-cols-3">
        {/* Contributions heatmap */}
        <Panel delay={0.25} className="p-5 flex flex-col
          md:col-start-2 md:row-start-1
          lg:col-start-2 lg:col-span-2 lg:row-start-1">
          <div className="flex items-baseline justify-between gap-3">
            <p className="panel-label">contributions</p>
            <span className="font-mono text-[12px] md:text-[13px] text-white/35">github · @ecdevv</span>
          </div>

          <div className="mt-4 flex-1 flex items-center justify-center text-white/40 font-mono text-[12px] md:text-[13px] overflow-x-auto">
            <GitHubCalendar
              username="ecdevv"
              theme={HEATMAP_THEME}
              colorScheme="dark"
              blockSize={11}
              blockMargin={3}
              blockRadius={6}
              fontSize={12}
              labels={{
                totalCount: '{{count}} contributions in the last year',
              }}
            />
          </div>
        </Panel>

        {/* Now panel */}
        <Panel delay={0.2} className="p-5 flex flex-col
          md:col-start-1 md:row-start-1
          lg:col-start-1 lg:col-span-1 lg:row-start-1">
          <div className="flex items-baseline justify-between gap-3">
            <p className="panel-label">now</p>
            <span className="font-mono text-[12px] md:text-[13px] text-white/35">updated {nowUpdated}</span>
          </div>

          <div className="flex flex-col gap-3 mt-3">
            {nowEntries.map(({ category, primary, secondary }, i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, delay: 0.35 + i * 0.05, ease: easeOut }}
                className="grid items-baseline gap-x-3 gap-y-0.5
                  grid-cols-[14px_84px_minmax(0,1fr)]
                  md:grid-cols-[14px_minmax(0,1fr)]
                  lg:grid-cols-[14px_84px_minmax(0,1fr)]"
              >
                <span className="font-mono text-[13px] md:text-[14px] text-accent-blue leading-none">▶</span>
                <span className="font-mono text-[13px] md:text-[14px] text-white/40 md:col-start-2 md:row-start-1">{category}</span>
                <div className="min-w-0 md:col-start-2 md:row-start-2 lg:col-start-3 lg:row-start-1">
                  <p className="font-mono text-[13px] md:text-[14px] text-white/85 truncate">{primary}</p>
                  {secondary && (
                    <p className="font-mono text-[12px] md:text-[13px] text-white/35 truncate mt-0.5">{secondary}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  )
}
