import YarlLightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/counter.css'

interface Props {
  images: string[]
  index: number | null
  onClose: () => void
  onChange: (i: number) => void
  alt?: string
}

export default function Lightbox({ images, index, onClose, onChange, alt = 'screenshot' }: Props) {
  const slides = images.map((src, i) => ({ src, alt: `${alt} ${i + 1}` }))
  return (
    <YarlLightbox
      open={index !== null}
      index={index ?? 0}
      close={onClose}
      slides={slides}
      on={{ view: ({ index: i }) => onChange(i) }}
      plugins={[Zoom, Counter]}
      carousel={{ finite: true, preload: 1 }}
      controller={{ closeOnBackdropClick: true }}
      animation={{ fade: 0, swipe: 450, easing: { swipe: 'cubic-bezier(0.4, 0, 0.2, 1)', navigation: 'cubic-bezier(0.4, 0, 0.2, 1)' } }}
      zoom={{
        maxZoomPixelRatio: 3,
        scrollToZoom: true,
        doubleTapDelay: 250,
        doubleClickDelay: 300,
      }}
      counter={{ container: { style: { top: 0 } } }}
      className="custom-lightbox"
    />
  )
}
