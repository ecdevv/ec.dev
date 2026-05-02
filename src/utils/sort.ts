// Sorts an array of strings in alphabetical order
export const sortAlpha = (arr: string[]) => [...arr].sort((a, b) => a.localeCompare(b))