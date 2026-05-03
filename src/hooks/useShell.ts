import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { SHELL_NAME, COMMANDS, type OutputLine } from '@/data/shell'

type TrackedLine = OutputLine & { id: number }

export function useShell() {
  const navigate = useNavigate()
  const [output,  setOutput] = useState<TrackedLine[]>([])
  const [input,   setInput]  = useState('')
  const [histIdx, setHistIdx] = useState(-1)
  const inputRef   = useRef<HTMLInputElement>(null)
  const historyRef = useRef<string[]>([])
  const idCounter  = useRef(0)

  const submit = useCallback(() => {
    const raw = input.trim()
    if (!raw) return
    const [cmd, ...args] = raw.split(/\s+/)

    historyRef.current = [raw, ...historyRef.current]

    if (cmd === 'clear') {
      setOutput([])
      setInput('')
      setHistIdx(-1)
      return
    }

    const handler = COMMANDS[cmd]
    const lines: OutputLine[] = handler
      ? handler(args, navigate)
      : [{ type: 'err', text: `${SHELL_NAME}: command not found: ${cmd}` }]

    setOutput(o => [
      ...o,
      { type: 'cmd', text: raw, id: idCounter.current++ },
      ...lines.map(line => ({ ...line, id: idCounter.current++ })),
    ])
    setHistIdx(-1)
    setInput('')
  }, [input, navigate])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { submit(); return }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHistIdx(i => {
        const next = Math.min(i + 1, historyRef.current.length - 1)
        setInput(historyRef.current[next] ?? '')
        return next
      })
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHistIdx(i => {
        const next = Math.max(i - 1, -1)
        setInput(next === -1 ? '' : historyRef.current[next] ?? '')
        return next
      })
    }
    if (e.ctrlKey && e.key === 'c') { setInput(''); setHistIdx(-1) }
  }, [submit])

  return { output, input, setInput, inputRef, handleKeyDown }
}
