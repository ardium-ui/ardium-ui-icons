import { IconData } from '@services/icon-storage/icon-storage.types';

export type PartialIconData = Pick<IconData, 'name' | 'type' | 'tags'> &
  Partial<Omit<IconData, 'name' | 'type' | 'tags'>>;
