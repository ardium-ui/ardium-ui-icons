export const IconCategory = {
  Animals: 'animals',
  Food: 'food',
  Weather: 'weather',
  Other: 'other',
} as const;
export type IconCategory = typeof IconCategory[keyof typeof IconCategory];