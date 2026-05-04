import { NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'
import { NAV_ITEMS } from '@/data/portfolio'
import { useFocusTrap } from '@/hooks/useFocusTrap'

const SCROLL_THRESHOLD = 80   // px from top before autohide activates
const PEEK_HIDE_DELAY  = 1500 // ms before topbar auto-hides after leaving peek zone
const HIDE_DELAY       = 80   // px of continuous downward scroll before hiding
const SHOW_VELOCITY    = 0.5  // px/ms minimum upward velocity to reveal
const PEEK_ZONE        = 80   // px from top to trigger show on hover

function Clock() {
  const [time, setTime] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="font-mono text-[13px] md:text-[14px] text-white/30 hidden sm:block">
      {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
      {'  '}
      {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
    </span>
  )
}

export default function Topbar() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const drawerRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)
  const scrollDownStart = useRef(0)
  const lastScrollTime = useRef(0)
  const peekTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const modalIsOpen = useRef(false)
  const location = useLocation()
  const navTo = (to: string) => location.pathname === to ? `${to}${location.search}` : to

  const clearPeekTimer = useCallback(() => {
    if (peekTimer.current) { clearTimeout(peekTimer.current); peekTimer.current = null }
  }, [])
  const startPeekTimer = useCallback(() => {
    peekTimer.current = setTimeout(() => { peekTimer.current = null; setVisible(false) }, PEEK_HIDE_DELAY)
  }, [])
  const resetModalState = useCallback(() => {
    modalIsOpen.current = false
    lastScrollY.current = window.scrollY
    scrollDownStart.current = 0
    clearPeekTimer()
  }, [clearPeekTimer])
  const handleModalClose = useCallback(() => {
    resetModalState()
    setVisible(window.scrollY < SCROLL_THRESHOLD)
  }, [resetModalState])

  useFocusTrap(drawerRef, open)

  // Close drawer on ESC
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    // Handle scrolling to auto-hide
    const onScroll = () => {
      if (modalIsOpen.current) return
      const y = window.scrollY
      const now = Date.now()
      const elapsed = now - lastScrollTime.current
      if (y < SCROLL_THRESHOLD) {
        clearPeekTimer()
        setVisible(true)
        scrollDownStart.current = 0
      } else if (y > lastScrollY.current) {
        // Scrolling down
        if (scrollDownStart.current === 0) scrollDownStart.current = lastScrollY.current
        if (y - scrollDownStart.current > HIDE_DELAY) {
          clearPeekTimer()
          setVisible(false)
          setOpen(false)
        }
      } else if (y < lastScrollY.current) {
        // Scrolling up - only reveal if velocity exceeds threshold (filters accidental touches)
        scrollDownStart.current = 0
        const velocity = (lastScrollY.current - y) / elapsed
        if (velocity > SHOW_VELOCITY) {
          clearPeekTimer()
          setVisible(true)
          startPeekTimer()
        }
      }
      lastScrollY.current = y
      lastScrollTime.current = now
    }

    // Handle peek hovering near the top of the viewport - mouse only, ignore touch/stylus
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      if (modalIsOpen.current) return
      if (e.clientY < PEEK_ZONE) {
        clearPeekTimer()
        setVisible(true)
      } else if (window.scrollY >= SCROLL_THRESHOLD && !peekTimer.current) {
        startPeekTimer()
      }
    }

    // Handle modal state and topbar visibility
    const onModalChange = (e: Event) => {
      if ((e as CustomEvent<{ open: boolean }>).detail.open) {
        modalIsOpen.current = true
        clearPeekTimer()
        setVisible(false)
        setOpen(false)
      } else if (modalIsOpen.current) {
        // Guard: only run if modal is still marked open.
        // onXlChange may have already called resetModalState() synchronously
        // (setting modalIsOpen to false); skipping here prevents a double-reset.
        handleModalClose()
      }
    }

    // Start peek timer when mouse cursor exits the viewport entirely (e.g. moves out the top/sides)
    const onPointerLeave = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      if (modalIsOpen.current) return
      if (window.scrollY >= SCROLL_THRESHOLD && !peekTimer.current) startPeekTimer()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('modal-change', onModalChange)
    document.documentElement.addEventListener('pointerleave', onPointerLeave, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('modal-change', onModalChange)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
      clearPeekTimer()
    }
  }, [handleModalClose, clearPeekTimer, startPeekTimer])

  // Sync topbar + drawer state with breakpoints on resize
  useEffect(() => {
    const mqXl = window.matchMedia('(min-width: 1280px)')
    const mqMd = window.matchMedia('(min-width: 768px)')

    // xl crossing: recalc topbar visibility + close drawer
    const onXlChange = () => {
      if (modalIsOpen.current) {
        if (mqXl.matches) {
          // At xl the modal becomes an inline panel - reset state and set visibility
          // by scroll position without peeking (no peek timer)
          resetModalState()
          setVisible(window.scrollY < SCROLL_THRESHOLD)
        } else {
          setVisible(false)
        }
      } else {
        setVisible(window.scrollY < SCROLL_THRESHOLD)
      }
      setOpen(false)
    }

    // md crossing: close drawer (hamburger disappears at md, drawer is md:hidden)
    const onMdChange = () => {
      if (mqMd.matches) setOpen(false)
    }

    onXlChange()
    mqXl.addEventListener('change', onXlChange)
    mqMd.addEventListener('change', onMdChange)
    return () => {
      mqXl.removeEventListener('change', onXlChange)
      mqMd.removeEventListener('change', onMdChange)
    }
  }, [resetModalState])

  // '-translate-y-[calc(100%+16px)]' +16px because of px-4 padding in the panel so if the panel is not touching the ceiling, it will account for the padding and make the panel disappear
  return (
    <>
      <header className={`sticky top-0 z-40 w-full transition-transform duration-300 ease-in-out ${visible ? 'translate-y-0' : '-translate-y-[calc(100%+16px)]'}`}>
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
          <div className="panel mt-4 px-4 py-2.5 flex items-center justify-between gap-4">
            {/* Left: logo + desktop nav */}
            <div className="flex items-center gap-4">
              <NavLink to="/" className="font-mono text-[16px] md:text-[18px] font-bold text-accent-blue tracking-tight">~/dev</NavLink>
              <div className="w-px h-3.5 bg-white/10 hidden md:block" />
              <nav className="hidden md:flex gap-1">
                {NAV_ITEMS.map(({ label, to }) => (
                  <NavLink
                    key={to}
                    to={navTo(to)}
                    end={to === '/'}
                    className={({ isActive }) =>
                      clsx(
                        'font-mono text-[13px] md:text-[14px] px-3 py-1.5 rounded transition-colors duration-150',
                        isActive
                          ? 'text-accent-blue bg-accent-blue/10'
                          : 'text-white/45 hover:text-white/70 hover:bg-white/5'
                      )
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Right: clock + status + mobile menu */}
            <div className="flex items-center gap-3">
              <Clock />
              <div className="status-dot" role="img" aria-label="Open to work" />
              {/* Mobile hamburger */}
              <button
                className="md:hidden text-white/40 hover:text-white/70 transition-colors"
                onClick={() => setOpen(o => !o)}
                aria-label="Toggle menu"
                aria-expanded={open}
                aria-controls="mobile-nav"
              >
                {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-30 md:hidden" onClick={() => setOpen(false)}>
            <motion.nav
              ref={drawerRef}
              id="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute top-20 left-4 right-4 panel px-4 py-3 flex flex-col gap-1"
              onClick={e => e.stopPropagation()}
            >
              {NAV_ITEMS.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={navTo(to)}
                  end={to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    clsx(
                      'font-mono text-[14px] px-3 py-2.5 rounded transition-colors duration-150',
                      isActive
                        ? 'text-accent-blue bg-accent-blue/10'
                        : 'text-white/45 hover:text-white/70 hover:bg-white/5'
                    )
                  }
                >
                  {label}
                </NavLink>
              ))}
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
