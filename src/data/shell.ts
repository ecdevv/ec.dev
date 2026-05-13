import { NAV_ITEMS } from "@/data/portfolio"

export const SHELL_USER = 'ecdevv'
export const SHELL_HOST = 'ecdevv-os'
export const SHELL_NAME = 'bash'
export const PROMPT     = `${SHELL_USER}@${SHELL_HOST} ~ $`

export type OutputLine = { type: 'cmd' | 'out' | 'err' | 'blank' | 'hdr'; text?: string }
export type CommandHandler = (args: string[], navigate: (to: string) => void) => OutputLine[]

function cdHandler(args: string[], navigate: (to: string) => void): OutputLine[] {
  const target = args[0]
  if (!target) return [{ type: 'err', text: 'cd: missing operand' }]
  const key = target.replace(/^\//, '').toLowerCase()
  const route = NAV_ITEMS.find(i => i.label === key)?.to
  if (!route) return [{ type: 'err', text: `cd: ${target}: no such page` }]
  navigate(route)
  return []
}

export const COMMANDS: Record<string, CommandHandler> = {
  help: () => [
    { type: 'blank' },
    { type: 'hdr',  text: 'navigation' },
    { type: 'out',  text: '  cd <page>     -> navigate to a page (e.g. cd home, cd /home)' },
    { type: 'out',  text: '  goto <page>   -> alias for cd (e.g. goto home, goto /home)' },
    { type: 'out',  text: '  ls            -> list all available pages' },
    { type: 'blank' },
    { type: 'hdr',  text: 'info' },
    { type: 'out',  text: '  whoami        -> about the site owner' },
    { type: 'out',  text: '  resume        -> open resume (pdf) in a new tab' },
    { type: 'out',  text: '  help          -> show this message' },
    { type: 'blank' },
    { type: 'hdr',  text: 'utility' },
    { type: 'out',  text: '  boot          -> replay the boot sequence' },
    { type: 'out',  text: '  echo <text>   -> print text to terminal (e.g. echo hello world -> hello world)' },
    { type: 'out',  text: '  clear         -> clear all output in the terminal' },
    { type: 'blank' },
  ],
  ls: () => [
    { type: 'out', text: NAV_ITEMS.map(item => item.label).join('  ') },
  ],
  whoami: () => [
    { type: 'out', text: `${SHELL_USER} - software engineer, linux enthusiast, problem solver` },
  ],
  resume: () => {
    window.open('/Eric_Chour_Resume.pdf', '_blank', 'noopener,noreferrer')
    return [{ type: 'out', text: 'opening resume (pdf) in a new tab...' }]
  },
  boot: () => {
    window.bReplay?.(() => {})
    return []
  },
  echo: (args) => [{ type: 'out', text: args.join(' ') }],
  cd:   cdHandler,
  goto: cdHandler,
}
