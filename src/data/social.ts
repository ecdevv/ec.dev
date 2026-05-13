export interface SocialLink {
  label: string
  url: string
  icon: string
  username?: string
}

// Named URLs exported individually so consumers don't have to do
// `socials.find(...).url` lookups. The socials array references them
// so there's a single source of truth.
export const githubUrl   = 'https://github.com/ecdevv'
export const linkedinUrl = 'https://linkedin.com/in/ericchour'
export const email       = 'ech2447@gmail.com'

export const socials: SocialLink[] = [
  { label: 'GitHub',   url: githubUrl,   icon: 'Github',   username: 'ecdevv' },
  { label: 'LinkedIn', url: linkedinUrl, icon: 'Linkedin' },
]
