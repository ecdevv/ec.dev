import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence, easeOut } from 'framer-motion'
import { X } from 'lucide-react'
import { projects, STATUS_LEGEND } from '@/data/projects'
import ProjectCard from '@/components/ui/ProjectCard'
import ProjectDetail from '@/components/ui/ProjectDetail'
import { Panel } from '@/components/ui/Panel'

const ALL_TAGS = ['all', ...Array.from(new Set(projects.flatMap(p => p.tags)))]
const SORTED   = projects.slice().sort((a, b) => b.date.getTime() - a.date.getTime())

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeId  = searchParams.get('project')
  const activeTag = searchParams.get('tag') ?? 'all'

  // Track xl breakpoint reactively — modal is derived from this + activeId
  const [isXl, setIsXl] = useState(() => window.matchMedia('(min-width: 1280px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1280px)')
    const update = () => setIsXl(mq.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Modal is open when a project is selected AND we're below xl
  const modalOpen = !!activeId && !isXl

  const filtered = activeTag === 'all' ? SORTED : SORTED.filter(p => p.tags.includes(activeTag))
  const activeProject = projects.find(p => p.id === activeId) ?? null

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams)
    if (value === null) next.delete(key)
    else next.set(key, value)
    setSearchParams(next, { replace: true })
  }

  // Selecting a project just sets the URL — modal derives from it.
  // Dispatch modal-change immediately (synchronous) for snappy topbar response;
  // the reactive effect below also fires after render as a correctness fallback.
  const select = (id: string) => {
    if (!isXl) window.dispatchEvent(new CustomEvent('modal-change', { detail: { open: true } }))
    setParam('project', id)
  }
  const closeModal = () => {
    window.dispatchEvent(new CustomEvent('modal-change', { detail: { open: false } }))
    setParam('project', null)
  }

  // Auto-select first project at xl+ on initial mount only
  useEffect(() => {
    if (activeId) return
    if (!window.matchMedia('(min-width: 1280px)').matches) return
    if (SORTED.length === 0) return
    setParam('project', SORTED[0].id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sync topbar visibility with modal state (fires whenever modalOpen changes)
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('modal-change', { detail: { open: modalOpen } }))
  }, [modalOpen])

  // On unmount, always restore topbar — guards against navigating away while modal is open
  useEffect(() => {
    return () => {
      window.dispatchEvent(new CustomEvent('modal-change', { detail: { open: false } }))
    }
  }, [])

  // ESC closes modal (clears URL selection)
  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen])

  // Lock body scroll while modal open
  useEffect(() => {
    if (!modalOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = original }
  }, [modalOpen])

  return (
    <div className="pt-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: easeOut }}>
        {/* Hero */}
        <div className="max-w-3xl mb-6">
          <p className="font-mono text-[13px] md:text-[14px] text-accent-blue tracking-[1.5px] uppercase mb-1 opacity-80">// work</p>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white tracking-tight mb-1">Projects</h1>
          <p className="text-[14px] md:text-[15px] text-white/40">Things I've built or am actively working on.</p>
        </div>

        {/* Tag filter */}
        <div className="flex gap-2 flex-wrap mb-4 max-w-3xl">
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setParam('tag', tag === 'all' ? null : tag)}
              className={`font-mono text-[12px] md:text-[13px] px-3 py-1.5 rounded-md border transition-all cursor-pointer ${
                activeTag === tag
                  ? 'text-accent-blue bg-accent-blue/10 border-accent-blue/20'
                  : 'text-white/35 border-white/[0.07] bg-white/3 hover:text-white/60 hover:bg-white/6'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Master-detail layout */}
        <div className="grid gap-3 grid-cols-1 xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] xl:items-start">
          {/* List */}
          <Panel initial={{ opacity: 0, y: 8 }} transition={{ duration: 0.2, ease: easeOut }} className="p-4 flex flex-col gap-2">
            {/* Status legend */}
            <div className="flex items-center gap-4 flex-wrap pb-2 mb-1 border-b border-white/5">
              {(Object.entries(STATUS_LEGEND) as [keyof typeof STATUS_LEGEND, string][]).map(([label, color]) => (
                <span key={label} className="flex items-center gap-1.5 font-mono text-[12px] md:text-[13px] text-white/35">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  {label}
                </span>
              ))}
            </div>
            {filtered.length === 0
              ? <p className="font-mono text-[13px] md:text-[14px] text-white/25 py-4 text-center">no projects found.</p>
              : filtered.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  isActive={p.id === activeId}
                  onSelect={() => select(p.id)}
                  delay={i * 0.05}
                />
              ))
            }
          </Panel>

          {/* Detail panel — xl+ only, sticky */}
          {isXl && (
            <div className="sticky top-24 self-start">
              {activeProject
                ? <ProjectDetail key={activeProject.id} project={activeProject} />
                : (
                  <Panel initial={{ opacity: 0, y: 8 }} transition={{ duration: 0.2, ease: easeOut }} className="p-6 font-mono text-[13px] md:text-[14px] text-white/30">
                    select a project →
                  </Panel>
                )
              }
            </div>
          )}
        </div>
      </motion.div>

      {/* Modal — below xl */}
      <AnimatePresence>
        {modalOpen && activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 xl:hidden bg-black/60 backdrop-blur-sm overflow-y-auto"
            onClick={closeModal}
          >
            <div className="flex min-h-full items-start md:items-center justify-center p-4 md:pb-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2, ease: easeOut }}
                className="w-full max-w-2xl md:max-w-3xl relative"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute right-4 top-4 z-10 text-white/40 hover:text-white/70 transition-colors"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
                <ProjectDetail key={activeProject.id} project={activeProject} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
