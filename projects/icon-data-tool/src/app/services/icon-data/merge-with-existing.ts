import { IconType } from './../../../../../homepage/src/app/services/icon-storage/icon-storage.types';
import { PartialIconData } from './partial-icon-data';

export function mergeIconDataWithExisting(
  allIconsData: Record<IconType, string[]>,
  existingIconData: any[]
): PartialIconData[] {
  return Object.entries(allIconsData).flatMap(([type, names]) => {
    return names.map((name) => {
      const existingIcon = existingIconData.find(
        (icon) => icon.name === name && icon.type === type
      );

      if (existingIcon) {
        return {
          ...existingIcon,
          type: type as IconType,
          name,
        };
      } else {
        return {
          type: type as IconType,
          name,
          tags: [],
        };
      }
    });
  });
}
