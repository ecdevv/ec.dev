export type ModGame = string

export interface Mod {
  id: string
  name: string
  description: string
  game: ModGame
  downloadUrl?: string
  nexusUrl?: string
  version: string
  tags: string[]
  icon: string
  year: number
}

// Mods page is commented out in App.tsx until you're ready to launch it
export const mods: Mod[] = []
