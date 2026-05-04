export interface SocialLink {
  label: string
  url: string
  icon: string
  username?: string
}

export const socials: SocialLink[] = [
  { label: 'GitHub',   url: 'https://github.com/ecdevv',    icon: 'Github',  username: 'ecdevv' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/ericchour', icon: 'Linkedin' },
]

export const email = 'ech2447@gmail.com'
