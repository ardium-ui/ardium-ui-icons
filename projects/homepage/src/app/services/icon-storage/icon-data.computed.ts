import { IconCategory } from '@components/category-selector/categories';
import { ICON_DATA } from './icon-data';
import { IconData, IconType } from './icon-storage.types';

//! lists
export const ICONS_BY_TYPE: Record<IconType, IconData[]> = Object.values(
  IconType,
).reduce(
  (acc, type) => {
    acc[type] = ICON_DATA.filter((icon) => icon.type === type);
    return acc;
  },
  {} as Record<IconType, IconData[]>,
);

export const ICONS_BY_CATEGORY: Record<IconCategory, IconData[]> =
  Object.values(IconCategory).reduce(
    (acc, category) => {
      acc[category] = ICON_DATA.filter((icon) => icon.category === category);
      return acc;
    },
    {} as Record<IconCategory, IconData[]>,
  );

export const ICONS_BY_TYPE_AND_CATEGORY: Record<
  IconType,
  Record<IconCategory, IconData[]>
> = Object.entries(ICONS_BY_TYPE).reduce(
  (acc, [type, icons]) => {
    acc[type as IconType] = Object.entries(ICONS_BY_CATEGORY).reduce(
      (categoryAcc, [category, _]) => {
        categoryAcc[category as IconCategory] = icons.filter(
          (icon) => icon.category === category,
        );
        return categoryAcc;
      },
      {} as Record<IconCategory, IconData[]>,
    );
    return acc;
  },
  {} as Record<IconType, Record<IconCategory, IconData[]>>,
);

//! counts
export const ICON_CATEGORY_COUNTS: Record<IconCategory, number> = Object.values(IconCategory).reduce(
  (acc, category) => {
    acc[category] = ICONS_BY_CATEGORY[category].length;
    return acc;
  },
  {} as Record<IconCategory, number>,
);

export const ICON_TYPE_CATEGORY_COUNTS: Record<
  IconType,
  Record<IconCategory, number>
> = Object.values(IconType).reduce(
  (acc, type) => {
    acc[type] = Object.values(IconCategory).reduce(
      (categoryAcc, category) => {
        categoryAcc[category] =
          ICONS_BY_TYPE_AND_CATEGORY[type][category].length;
        return categoryAcc;
      },
      {} as Record<IconCategory, number>,
    );
    return acc;
  },
  {} as Record<IconType, Record<IconCategory, number>>,
);

export const TOTAL_ICONS = ICON_DATA.length;

export const TYPE_TOTAL_ICONS: Record<IconType, number> = Object.values(IconType).reduce(
  (acc, type) => {
    acc[type] = ICONS_BY_TYPE[type].length;
    return acc;
  },
  {} as Record<IconType, number>,
);
