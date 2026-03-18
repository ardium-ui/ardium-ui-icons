import { IconCategory } from "@components/category-selector/categories";
import { ICON_DATA } from "./icon-data";
import { IconData } from "./icon-storage.types";
  
export const ICONS_BY_CATEGORY: { [key in IconCategory]: IconData[] } = Object.values(IconCategory).reduce((acc, category) => {
  acc[category] = ICON_DATA.filter(icon => icon.category === category);
  return acc;
}, {} as { [key in IconCategory]: IconData[] });

export const ICON_CATEGORY_COUNTS: { [key in IconCategory]: number } = Object.values(IconCategory).reduce((acc, category) => {
  acc[category] = ICONS_BY_CATEGORY[category].length;
  return acc;
}, {} as { [key in IconCategory]: number });

export const TOTAL_ICONS = ICON_DATA.length;