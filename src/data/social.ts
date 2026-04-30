export interface SocialLink {
  label: string
  url: string
  icon: string
  username?: string
}

export const socials: SocialLink[] = [
  { label: 'GitHub',   url: 'https://github.com/ecdevv',    icon: 'Github',  username: 'ecdevv' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/TODO', icon: 'Linkedin' },
]

export const email = 'TODO@example.com'
