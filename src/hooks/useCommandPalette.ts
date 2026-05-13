import { useState, useEffect, useCallback, useRef } from 'react'

const MD_BREAKPOINT = '(min-width: 768px)'

/**
 * Global open/close state for the command palette, plus listeners for:
 *  - Cmd+K (Mac) / Ctrl+K (Win/Linux) keyboard shortcut
 *  - `cmdk-toggle` custom event (so any button can request a toggle without prop drilling)
 *  - `modal-change` events from other modals (Projects detail, etc.) so the
 *    palette refuses to open over another modal and closes itself if one opens
 *
 * The keyboard listener early-exits below md breakpoint so mobile never opens
 * the palette via keyboard.
 */
export function useCommandPalette() {
  const [open, setOpen] = useState(false)
  const openRef = useRef(open)
  const otherModalOpenRef = useRef(false)

  useEffect(() => { openRef.current = open }, [open])

  const toggle = useCallback(() => {
    // Closing self is always allowed; opening is blocked if another modal is up.
    if (openRef.current || !otherModalOpenRef.current) {
      setOpen(v => !v)
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!window.matchMedia(MD_BREAKPOINT).matches) return
      // Require !shiftKey so we don't intercept Cmd+Shift+K (Firefox Web Console).
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey) && !e.shiftKey) {
        e.preventDefault()
        toggle()
      }
    }
    const onEvent = () => toggle()
    const onModalChange = (e: Event) => {
      const opening = (e as CustomEvent).detail?.open ?? false
      otherModalOpenRef.current = opening
      // If another modal just opened while ours is up, yield to it.
      if (opening && openRef.current) setOpen(false)
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('cmdk-toggle', onEvent)
    window.addEventListener('modal-change', onModalChange)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('cmdk-toggle', onEvent)
      window.removeEventListener('modal-change', onModalChange)
    }
  }, [toggle])

  return { open, setOpen }
}
