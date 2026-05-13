import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Command } from 'cmdk'
import clsx from 'clsx'
import { COMMANDS, type OutputLine } from '@/data/shell'
import { buildPaletteItems, type PaletteItem } from '@/data/palette'
import { useFocusTrap } from '@/hooks/useFocusTrap'

const GROUPS: PaletteItem['group'][] = ['Pages', 'Actions', 'Elsewhere']

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function CommandPalette({ open, setOpen }: Props) {
  const navigate = useNavigate()
  const dialogRef = useRef<HTMLDivElement>(null)
  const [output, setOutput] = useState<OutputLine[] | null>(null)

  const items = useMemo(() => buildPaletteItems(), [])

  useFocusTrap(dialogRef, open)

  // Reset output when the palette closes so it doesn't reappear on next open.
  useEffect(() => {
    if (!open) setOutput(null)
  }, [open])

  function handleSelect(item: PaletteItem) {
    if (item.kind === 'nav') {
      navigate(item.to)
      setOpen(false)
      return
    }
    if (item.kind === 'link') {
      window.open(item.url, '_blank', 'noopener,noreferrer')
      setOpen(false)
      return
    }
    // command
    const lines = COMMANDS[item.cmd](item.args ?? [], navigate)
    // If the command produced inline output, keep open and render it.
    // Otherwise (pure side-effect commands), close.
    const hasMeaningfulOutput = lines.length > 0 && lines.some(l => l.type !== 'blank')
    if (hasMeaningfulOutput) {
      setOutput(lines)
    } else {
      setOpen(false)
    }
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command Palette"
      overlayClassName="fixed inset-0 z-50 hidden md:block bg-black/55 backdrop-blur-[2px]"
      contentClassName="fixed left-1/2 top-[14vh] -translate-x-1/2 w-[min(640px,calc(100vw-2rem))] z-60 hidden md:block"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={clsx(
          'rounded-xl border border-border-subtle bg-surface-panel shadow-2xl',
          'backdrop-blur-[12px] overflow-hidden outline-none'
        )}
      >
        <Command.Input
          placeholder="Type a command or search..."
          aria-label="Search commands and pages"
          onValueChange={() => setOutput(null)}
          className={clsx(
            'w-full bg-transparent px-4 py-3.5 border-b border-border-subtle',
            'font-mono text-[13px] md:text-[14px] text-white placeholder:text-white/30',
            'outline-none'
          )}
        />

        <Command.List className="max-h-[60vh] overflow-y-auto py-2">
          <Command.Empty className="px-4 py-6 text-center font-mono text-[13px] text-white/40">
            No results.
          </Command.Empty>

          {/* Persistent aria-live region so SRs announce inline output reliably.
              Hidden when empty so it doesn't take vertical space. */}
          <div
            aria-live="polite"
            aria-atomic="true"
            className={clsx(
              'mx-2 mb-2 rounded-md font-mono text-[12px] leading-relaxed',
              output
                ? 'px-4 py-2 bg-white/3 border border-white/5'
                : 'h-0 overflow-hidden border-0'
            )}
          >
            {output?.map((line, i) => (
              <OutputLineRow key={i} line={line} />
            ))}
          </div>

          {GROUPS.map(group => {
            const groupItems = items.filter(i => i.group === group)
            if (groupItems.length === 0) return null
            return (
              <Command.Group
                key={group}
                heading={group}
                className={clsx(
                  '**:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:py-2',
                  '**:[[cmdk-group-heading]]:font-mono **:[[cmdk-group-heading]]:text-[11px]',
                  '**:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-wider',
                  '**:[[cmdk-group-heading]]:text-white/35'
                )}
              >
                {groupItems.map(item => (
                  <Command.Item
                    key={item.id}
                    value={`${item.label} ${(item.keywords ?? []).join(' ')}`}
                    onSelect={() => handleSelect(item)}
                    className={clsx(
                      'mx-2 px-3 py-2 rounded-md cursor-pointer',
                      'font-mono text-[13px] text-white/65',
                      'data-[selected=true]:bg-white/6 data-[selected=true]:text-white',
                      'transition-colors duration-150'
                    )}
                  >
                    {item.label}
                  </Command.Item>
                ))}
              </Command.Group>
            )
          })}
        </Command.List>

        <div className="border-t border-border-subtle px-4 py-2 flex items-center gap-4 font-mono text-[11px] text-white/35">
          <span><kbd className="text-white/55">↵</kbd> select</span>
          <span><kbd className="text-white/55">esc</kbd> close</span>
          <span className="ml-auto"><kbd className="text-white/55">⌘K</kbd> toggle</span>
        </div>
      </div>
    </Command.Dialog>
  )
}

function OutputLineRow({ line }: { line: OutputLine }) {
  if (line.type === 'blank') return <div className="h-2" aria-hidden="true" />
  const color = clsx(
    line.type === 'hdr' && 'text-accent-blue uppercase tracking-wider text-[11px] mt-1',
    line.type === 'err' && 'text-accent-red',
    line.type === 'out' && 'text-white/70',
    line.type === 'cmd' && 'text-white/85'
  )
  return <div className={color}>{line.text}</div>
}
