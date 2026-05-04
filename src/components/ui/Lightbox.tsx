import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import useEmblaCarousel from 'embla-carousel-react'

interface Props {
  images: string[]
  index: number | null
  onClose: () => void
  onChange: (i: number) => void
  alt?: string
}

interface ContentProps {
  images: string[]
  startIndex: number
  onClose: () => void
  onChange: (i: number) => void
  alt: string
}

function LightboxContent({ images, startIndex, onClose, onChange, alt }: ContentProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  useFocusTrap(dialogRef, true)

  const startIndexRef = useRef(startIndex)
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [emblaRef, emblaApi] = useEmblaCarousel(reducedMotion ? { duration: 0 } : {})
  const [currentIndex, setCurrentIndex] = useState(startIndex)
  const [canPrev, setCanPrev] = useState(startIndex > 0)
  const [canNext, setCanNext] = useState(startIndex < images.length - 1)

  const handleClose = useCallback((e: ReactMouseEvent) => { e.stopPropagation(); onClose() }, [onClose])
  const handlePrev = useCallback((e: ReactMouseEvent) => { e.stopPropagation(); emblaApi?.scrollPrev() }, [emblaApi])
  const handleNext = useCallback((e: ReactMouseEvent) => { e.stopPropagation(); emblaApi?.scrollNext() }, [emblaApi])

  // Update state on select
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const i = emblaApi.selectedScrollSnap()
    setCurrentIndex(i)
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
    onChange(i)
  }, [emblaApi, onChange])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    if (startIndexRef.current !== 0) emblaApi.scrollTo(startIndexRef.current, true)
    else onSelect()
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  // ESC + arrow keys
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') emblaApi?.scrollPrev()
      else if (e.key === 'ArrowRight') emblaApi?.scrollNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [emblaApi, onClose])

  // Lock body scroll
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = original }
  }, [])

  return (
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
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Counter */}
      <div aria-live="polite" aria-atomic="true" className="absolute top-4 left-4 font-mono text-[12px] md:text-[13px] text-white/40 select-none">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Close */}
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-1"
        aria-label="Close"
      >
        <X size={20} aria-hidden="true" />
      </button>

      {/* Prev */}
      {canPrev && (
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 text-white/45 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
          aria-label="Previous image"
        >
          <ChevronLeft size={28} aria-hidden="true" />
        </button>
      )}

      {/* Next */}
      {canNext && (
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 text-white/45 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
          aria-label="Next image"
        >
          <ChevronRight size={28} aria-hidden="true" />
        </button>
      )}

      {/* Carousel */}
      <div
        ref={emblaRef}
        className="overflow-hidden w-full"
      >
        <div className="flex touch-pan-y gap-80">
          {images.map((src, i) => (
            <div
              key={i}
              aria-hidden={i !== currentIndex}
              className="flex-[0_0_100%] min-w-0 flex items-center justify-center"
              onClick={onClose}
            >
              <img
                src={src}
                alt={`${alt} ${i + 1}`}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="max-w-full max-h-[calc(100svh-2rem)] sm:max-h-[calc(100svh-6rem)] object-contain rounded-md border border-white/10 select-none"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Lightbox({ images, index, onClose, onChange, alt = 'screenshot' }: Props) {
  const isOpen = index !== null
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <LightboxContent
          images={images}
          startIndex={index!}
          onClose={onClose}
          onChange={onChange}
          alt={alt}
        />
      )}
    </AnimatePresence>,
    document.body
  )
}
