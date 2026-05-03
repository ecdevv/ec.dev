import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useFocusTrap } from '@/hooks/useFocusTrap'

interface Props {
  images: string[]
  index: number | null
  onClose: () => void
  onChange: (i: number) => void
  alt?: string
}

export default function Lightbox({ images, index, onClose, onChange, alt = 'screenshot' }: Props) {
  const isOpen = index !== null
  const dialogRef = useRef<HTMLDivElement>(null)
  useFocusTrap(dialogRef, isOpen)

  // ESC + arrow keys
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft' && index > 0) onChange(index - 1)
      else if (e.key === 'ArrowRight' && index < images.length - 1) onChange(index + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, index, images.length, onClose, onChange])

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = original }
  }, [isOpen])

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-12"
          onClick={onClose}
        >
          {/* Counter */}
          <div className="absolute top-4 left-4 font-mono text-[12px] md:text-[13px] text-white/40 select-none">
            {index! + 1} / {images.length}
          </div>

          {/* Close button */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose() }}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-1"
            aria-label="Close"
          >
            <X size={20} aria-hidden="true" />
          </button>

          {/* Prev button */}
          {index! > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); onChange(index! - 1) }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/45 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} aria-hidden="true" />
            </button>
          )}

          {/* Next button */}
          {index! < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); onChange(index! + 1) }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/45 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
              aria-label="Next image"
            >
              <ChevronRight size={28} aria-hidden="true" />
            </button>
          )}

          {/* Image with fade-between transitions */}
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              src={images[index!]}
              alt={`${alt} ${index! + 1}`}
              className="max-w-full max-h-full object-contain rounded-md border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
