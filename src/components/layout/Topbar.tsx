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
const PEEK_ZONE        = 40   // px from top to trigger show on hover

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
  const lastScrollY = useRef(window.scrollY)
  const scrollDownStart = useRef(0)
  const lastScrollTime = useRef(0)
  const peekTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const modalIsOpen = useRef(false)
  const openRef = useRef(false)
  const location = useLocation()
  const navTo = (to: string) => location.pathname === to ? `${to}${location.search}` : to

  const clearPeekTimer = useCallback(() => {
    if (peekTimer.current) { clearTimeout(peekTimer.current); peekTimer.current = null }
  }, [])
  const startPeekTimer = useCallback(() => {
    // Always clears any existing timer before setting a new one to prevent handle leaks
    if (peekTimer.current) clearTimeout(peekTimer.current)
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

  // Sync openRef (fallback for ESC/nav/breakpoint close paths; hamburger onClick sets it
  // synchronously to beat scroll-anchor events). On close, reset scroll tracking and schedule
  // auto-hide if past threshold. Visibility while open is `open || visible` in the JSX.
  useEffect(() => {
    openRef.current = open
    if (open) {
      clearPeekTimer()
    } else {
      lastScrollY.current = window.scrollY
      scrollDownStart.current = 0
      if (window.scrollY >= SCROLL_THRESHOLD) startPeekTimer()
    }
  }, [open, clearPeekTimer, startPeekTimer])

  useEffect(() => {
    // Autohide on scroll
    const onScroll = () => {
      if (modalIsOpen.current) return
      const y = window.scrollY
      const now = Date.now()
      const elapsed = now - lastScrollTime.current
      // Drawer open: track position but skip all hide/show logic.
      // The drawer lives inside the sticky header; opening/closing it changes the header height
      // and triggers scroll-anchor events that would otherwise falsely fire autohide.
      if (openRef.current) {
        lastScrollY.current = y
        lastScrollTime.current = now
        scrollDownStart.current = 0
        return
      }
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
        // Scrolling up - only reveal if velocity exceeds threshold (filters accidental touches).
        // If elapsed is stale (zero init or long pause >1s), treat as Infinity so any
        // intentional upward scroll after a pause always reveals.
        scrollDownStart.current = 0
        // Clamp elapsed to [1, 200]ms: prevents near-zero division artifacts on rapid
        // events and ensures any upward scroll after a long pause is treated as full-speed.
        const velocity = (lastScrollY.current - y) / Math.min(Math.max(elapsed, 1), 200)
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
      if (modalIsOpen.current || openRef.current) return
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
      if (modalIsOpen.current || openRef.current) return
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

    // md crossing: close drawer when going mobile→md (hamburger hidden at md+, drawer is md:hidden).
    // Going md→mobile intentionally does nothing - drawer can't be open at md, so no stale state.
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

  // '-translate-y-[calc(100%+16px)]' +16px because of the mt-4 gap on the inner panel - accounts
  // for the space between the header top and the visible panel edge so nothing bleeds through when hidden
  return (
    <>
      <header className={clsx(
        'sticky top-0 z-40 w-full transition-transform duration-300 ease-in-out',
        (open || visible) ? 'translate-y-0' : '-translate-y-[calc(100%+16px)]'
      )}>
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

            {/* Right: command palette trigger + clock + status + mobile menu */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('cmdk-toggle'))}
                className="hidden md:inline-flex items-center px-1.5 h-5 rounded border border-border-subtle bg-surface-panel/40 font-mono text-[11px] text-white/35 hover:text-white/70 hover:border-accent-blue/30 transition-colors duration-150"
                aria-label="Open command palette"
                title="Open command palette"
              >
                ⌘K
              </button>
              <div className="w-px h-3.5 bg-white/10 hidden md:block" />
              <Clock />
              <div className="status-dot" role="img" aria-label="Open to work" />
              {/* Mobile hamburger - openRef set synchronously so the scroll guard in onScroll
                  is active before any scroll-anchor events fire from the drawer height change */}
              <button
                className="md:hidden text-white/40 hover:text-white/70 transition-colors"
                onClick={() => { const next = !openRef.current; openRef.current = next; setOpen(next) }}
                aria-label="Toggle menu"
                aria-expanded={open}
                aria-controls="mobile-nav"
              >
                {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
              </button>
            </div>
          </div>

        </div>

        {/* Mobile drawer - absolute so it overlays content rather than expanding the header height.
            top-full anchors to the bottom of the header's in-flow height (panel only). */}
        <AnimatePresence>
          {open && (
            <div className="absolute left-0 right-0 top-full">
              <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
                <motion.nav
                  ref={drawerRef}
                  id="mobile-nav"
                  aria-label="Mobile navigation"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  tabIndex={-1}
                  className="panel mt-2 px-4 py-3 flex flex-col gap-1 md:hidden"
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
            </div>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop - click-to-close; z-30 sits behind the sticky header (z-40) */}
      {open && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
