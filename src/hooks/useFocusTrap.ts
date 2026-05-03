import { useEffect, useRef, type RefObject } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean) {
  const previousFocus = useRef<Element | null>(null)

  // Save current focus on open; restore on close
  useEffect(() => {
    if (!active) return
    previousFocus.current = document.activeElement
    const first = ref.current?.querySelector<HTMLElement>(FOCUSABLE)
    first?.focus()
    return () => {
      if (previousFocus.current instanceof HTMLElement) {
        previousFocus.current.focus()
      }
    }
  }, [active, ref])

  // Cycle focus within trap on Tab / Shift+Tab
  useEffect(() => {
    if (!active) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const el = ref.current
      if (!el) return
      const focusable = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
        e.preventDefault()
        ;(e.shiftKey ? last : first).focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [active, ref])
}
