export const IconType = {
  Outlined: 'outlined',
  Filled: 'filled',
} as const;
export type IconType = typeof IconType[keyof typeof IconType];

export interface IconData {
  name: string;
  type: IconType;
}