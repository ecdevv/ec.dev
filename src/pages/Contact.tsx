import { useState } from 'react'
import { motion, easeOut } from 'framer-motion'
import { Mail, Copy, Check, ArrowUpRight } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { socials, email } from '@/data/social'
import { Linkedin } from '@/components/icons/Icons'
import { Panel } from '@/components/ui/Panel'

const ICON_MAP: Record<string, React.ReactNode> = {
  Github:   <SiGithub size={16} />,
  Linkedin: <Linkedin size={16} />,
  Mail:     <Mail size={16} />,
}

export default function Contact() {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="pt-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: easeOut }}>
        <p className="font-mono text-[13px] md:text-[14px] text-accent-blue tracking-[1.5px] uppercase mb-1 opacity-80">// reach out</p>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white tracking-tight mb-1">Contact</h1>
        <p className="text-[14px] md:text-[15px] text-white/40 mb-6">
          Open to new opportunities, collabs, or just talking tech.
        </p>

        <Panel initial={{ opacity: 0, y: 8 }} transition={{ duration: 0.2, ease: easeOut }}
          className="md:max-w-lg p-5 flex flex-col gap-4">
          {/* Email */}
          <div>
            <p className="panel-label">email</p>
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${email}`}
                className="font-mono text-[13px] md:text-[14px] text-accent-blue hover:text-white transition-colors"
              >
                {email}
              </a>
              <button
                onClick={handleCopy}
                className="cursor-copy text-white/30 hover:text-white/70 transition-colors"
                aria-label="Copy email address"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
              </button>
            </div>
          </div>

          <div className="h-px bg-white/7" />

          {/* Socials */}
          <div>
            <p className="panel-label">elsewhere</p>
            <div className="flex flex-col gap-2">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/3
                    border border-white/6 hover:bg-white/7 hover:border-accent-blue/25 transition-colors group"
                >
                  <span className="text-white/30 group-hover:text-accent-blue transition-colors">
                    {ICON_MAP[s.icon] ?? s.icon}
                  </span>
                  <span className="font-mono text-[13px] md:text-[14px] flex-1 relative">
                    <span className="block text-white/50 group-hover:opacity-0 transition-opacity duration-150">
                      {s.username ? `${s.label} / ${s.username}` : s.label}
                    </span>
                    <span className="absolute inset-0 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 truncate">
                      {s.url.replace('https://', '')}
                    </span>
                  </span>
                  <ArrowUpRight size={13} className="text-white/0 group-hover:text-white/40 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </Panel>
      </motion.div>
    </div>
  )
}
