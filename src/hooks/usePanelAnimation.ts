import { useRef, useState, useEffect } from 'react'
import { easeOut } from 'framer-motion'

export function usePanelAnimation(
  delay = 0,
  scrollDelay = 0,
  externalRef?: React.RefObject<HTMLDivElement | null>
) {
  const internalRef = useRef<HTMLDivElement>(null)
  const ref = externalRef ?? internalRef
  const [inViewOnMount, setInViewOnMount] = useState(true)

  useEffect(() => {
    const el = (externalRef ?? internalRef).current
    if (el && el.getBoundingClientRect().top >= window.innerHeight)
      setInViewOnMount(false)
  // refs are stable — externalRef identity never changes after mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const animationProps = inViewOnMount
    ? {
        initial:    { opacity: 0, y: 12 },
        animate:    { opacity: 1, y: 0 },
        transition: { duration: 0.25, delay, ease: easeOut },
      }
    : {
        initial:    { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport:   { once: true, margin: '-50px' as const },
        transition: { duration: 0.25, delay: scrollDelay, ease: easeOut },
      }

  return { ref, ...animationProps }
}
