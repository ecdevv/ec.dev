import { useEffect } from 'react'

interface Props {
  onDone: () => void
}

/**
 * Shell-replay wrapper. All boot logic lives in index.html (runBoot / window.bReplay).
 * Mount this component to trigger a replay; it renders nothing itself.
 */
export default function BootSequence({ onDone }: Props) {
  useEffect(() => {
    window.bReplay(onDone)
  // onDone is stable from the call site — intentionally omitted from deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
