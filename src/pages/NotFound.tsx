import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useShell } from '@/hooks/useShell'
import { NAV_ITEMS } from '@/data/portfolio'
import { SHELL_USER, SHELL_HOST, SHELL_NAME } from '@/data/shell'

const LINE_CLS: Record<string, string> = {
  cmd:   'bl-inf',
  out:   'bl-txt',
  err:   'bl-err',
  blank: 'bl-blk',
  hdr:   'bl-wel',
}

function ShellPrompt() {
  return (
    <>
      <span style={{ color: 'rgba(104,211,145,1)' }}>{SHELL_USER}</span>
      <span style={{ color: 'rgba(255,255,255,0.35)' }}>@{SHELL_HOST}</span>
      <span style={{ color: 'rgba(255,255,255,0.5)', whiteSpace: 'pre' }}> ~ $ </span>
    </>
  )
}

export default function NotFound() {
  const { pathname } = useLocation()
  const { output, input, setInput, inputRef, handleKeyDown } = useShell()
  const bbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (bbRef.current) bbRef.current.scrollTop = bbRef.current.scrollHeight
  }, [output])

  useEffect(() => {
    inputRef.current?.focus()
  }, [inputRef])

  const hint = NAV_ITEMS.map(item => item.label).join('  ')

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '1rem' }}>
      <div className="bw">

        <div className="btb">
          <div className="btb-spc" />
          <span className="btb-title">{SHELL_USER}@{SHELL_HOST} — {SHELL_NAME}</span>
          <div className="btb-dots">
            <div className="btb-dot" style={{ background: 'rgba(104,211,145,.7)' }} />
            <div className="btb-dot" style={{ background: 'rgba(99,179,237,.7)' }} />
            <div className="btb-dot" style={{ background: 'rgba(252,129,129,.7)' }} />
          </div>
        </div>

        <div
          className="bb"
          ref={bbRef}
          style={{ overflowY: 'auto', maxHeight: '60vh', cursor: 'text' }}
          onClick={() => inputRef.current?.focus()}
        >
          <div className="bl-inf" style={{ display: 'flex', alignItems: 'center' }}>
            <ShellPrompt />
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>cd {pathname}</span>
          </div>
          <span className="bl-blk" />
          <span className="bl-err">{SHELL_NAME}: no such file or directory: {pathname} [exit 404]</span>
          <span className="bl-inf" style={{ color: 'rgba(255,255,255,0.3)' }}>
            &nbsp;&nbsp;→ available: {hint}
          </span>
          <span className="bl-inf" style={{ color: 'rgba(255,255,255,0.3)' }}>
            &nbsp;&nbsp;→ type 'help' for all commands
          </span>
          <span className="bl-blk" />

          {output.map(line =>
            line.type === 'blank'
              ? <span key={line.id} className="bl-blk" />
              : line.type === 'cmd'
                ? <div key={line.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <ShellPrompt />
                    <span style={{ color: 'rgba(255,255,255,0.85)' }}>{line.text}</span>
                  </div>
                : <div key={line.id} className={LINE_CLS[line.type] ?? 'bl-txt'} style={{ whiteSpace: 'pre' }}>{line.text}</div>
          )}

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ShellPrompt />
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'rgba(255,255,255,0.85)',
                font: 'inherit',
                caretColor: 'rgba(104,211,145,1)',
                flex: 1,
                padding: 0,
              }}
            />
          </div>
        </div>

        <div className="bctrl">
          <Link to="/" className="bskip">
            <span className="bkey-enter">[HOME]</span> return to safety
          </Link>
        </div>

      </div>
    </div>
  )
}
