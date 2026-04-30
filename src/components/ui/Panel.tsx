import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import clsx from 'clsx'
import { usePanelAnimation } from '@/hooks/usePanelAnimation'

interface PanelProps extends HTMLMotionProps<'div'> {
  delay?: number
  scrollDelay?: number
}

export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ delay = 0, scrollDelay = 0, className, children, ...motionProps }, forwardedRef) => {
    const { ref, ...defaultAnimProps } = usePanelAnimation(
      delay,
      scrollDelay,
      forwardedRef as React.RefObject<HTMLDivElement | null> | undefined
    )
    const hasCustomAnim = 'animate' in motionProps || 'whileInView' in motionProps
    return (
      <motion.div
        ref={ref}
        {...(hasCustomAnim ? {} : defaultAnimProps)}
        {...motionProps}
        className={clsx('panel', className)}
      >
        {children}
      </motion.div>
    )
  }
)
Panel.displayName = 'Panel'
