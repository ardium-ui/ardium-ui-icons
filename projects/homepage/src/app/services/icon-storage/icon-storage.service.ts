import { computed, Injectable, signal } from '@angular/core';
import { persistentSignal, PersistentStorageMethod } from '@ardium-ui/devkit';
import { IconCategory } from '@components/category-selector/categories';
import { matchSorter } from 'match-sorter';
import { ICON_DATA } from './icon-data';
import {
  ICON_CATEGORY_COUNTS,
  ICON_TYPE_CATEGORY_COUNTS,
  ICONS_BY_CATEGORY,
  ICONS_BY_TYPE,
  ICONS_BY_TYPE_AND_CATEGORY,
  TOTAL_ICONS,
  TYPE_TOTAL_ICONS,
} from './icon-data.computed';
import { IconType } from './icon-storage.types';

function normalizeSearchTerm(value: string): string {
  return value.trim().replace(/\s+/g, '-');
}

@Injectable({
  providedIn: 'root',
})
export class IconStorageService {
  readonly selectedType = persistentSignal<IconType | null>(null, {
    method: PersistentStorageMethod.LocalStorage,
    name: 'selectedType',
  });
  readonly selectedCategory = persistentSignal<IconCategory | null>(null, {
    method: PersistentStorageMethod.LocalStorage,
    name: 'selectedCategory',
  });

  readonly searchTerm = signal<string>('');

  readonly iconsByTypeAndCategory = computed(() => {
    const type = this.selectedType();
    const category = this.selectedCategory();

    if (!type && !category) {
      return ICON_DATA;
    }
    if (type && !category) {
      return ICONS_BY_TYPE[type] || [];
    }
    if (!type && category) {
      return ICONS_BY_CATEGORY[category] || [];
    }
    return ICONS_BY_TYPE_AND_CATEGORY[type!]?.[category!] || [];
  });

  readonly currentIconsCount = computed(
    () => this.iconsByTypeAndCategory().length,
  );

  readonly typeTotalCount = computed(() => {
    const type = this.selectedType();

    if (!type) return TOTAL_ICONS;
    return TYPE_TOTAL_ICONS[type] || 0;
  });
  readonly typeCategoryCounts = computed(() => {
    const type = this.selectedType();

    if (!type) return ICON_CATEGORY_COUNTS;
    return ICON_TYPE_CATEGORY_COUNTS[type] || {};
  });

  readonly filteredIcons = computed(() => {
    const searchTerm = normalizeSearchTerm(
      this.searchTerm()?.toLowerCase() || '',
    );
    const icons = this.iconsByTypeAndCategory();
    if (!searchTerm) {
      return icons;
    }
    return matchSorter(icons, searchTerm, {
      keys: [
        {
          key: 'name',
          maxRanking: matchSorter.rankings.STARTS_WITH,
          threshold: matchSorter.rankings.MATCHES,
        },
        {
          key: 'tags',
          maxRanking: matchSorter.rankings.CONTAINS,
          threshold: matchSorter.rankings.MATCHES,
        },
      ],
    });
  });
}
