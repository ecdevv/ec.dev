import { motion, easeOut } from 'framer-motion'
import { Mail } from 'lucide-react'
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
  return (
    <div className="pt-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: easeOut }}>
        <p className="font-mono text-[13px] md:text-[14px] text-accent-blue tracking-[1.5px] uppercase mb-1 opacity-80">// reach out</p>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white tracking-tight mb-1">Contact</h1>
        <p className="text-[14px] md:text-[15px] text-white/40 mb-6">
          Open to new opportunities, collabs, or just talking tech.
        </p>

        <Panel initial={{ opacity: 0, y: 8 }} transition={{ duration: 0.2, ease: easeOut }} className="md:max-w-lg xl:mx-0 p-5 flex flex-col gap-4">
          {/* Email */}
          <div>
            <p className="panel-label">email</p>
            <a href={`mailto:${email}`}
              className="font-mono text-[13px] md:text-[14px] text-accent-blue hover:text-white transition-colors">
              {email}
            </a>
          </div>

          <div className="h-px bg-white/[0.07]" />

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
                    border border-white/6 hover:border-accent-blue/25 transition-colors group"
                >
                  <span className="text-white/30 group-hover:text-accent-blue transition-colors">
                    {ICON_MAP[s.icon] ?? s.icon}
                  </span>
                  <span className="font-mono text-[13px] md:text-[14px] text-white/50 group-hover:text-white/80 transition-colors">
                    {s.username ? `${s.label} / ${s.username}` : s.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Panel>
      </motion.div>
    </div>
  )
}
