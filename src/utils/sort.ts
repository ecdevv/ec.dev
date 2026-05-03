// Sorts an array of strings in alphabetical order
export const sortAlpha = <T extends string>(arr: T[]): T[] =>
  [...arr].sort((a, b) => a.localeCompare(b, 'en'))