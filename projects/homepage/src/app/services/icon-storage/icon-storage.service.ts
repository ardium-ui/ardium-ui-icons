import { computed, Injectable, signal } from '@angular/core';
import { persistentSignal, PersistentStorageMethod } from '@ardium-ui/devkit';
import { IconCategory } from '@components/category-selector/categories';
import { matchSorter } from 'match-sorter';
import { ICON_DATA } from './icon-data';
import { ICONS_BY_CATEGORY } from './icon-data.computed';
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

  readonly iconsByCategory = computed(() => {
    const category = this.selectedCategory();

    if (!category) {
      return ICON_DATA;
    }
    return ICONS_BY_CATEGORY[category] || [];
  });
  readonly currentIconsCount = computed(() => this.iconsByCategory().length);

  readonly filteredIcons = computed(() => {
    const searchTerm = normalizeSearchTerm(
      this.searchTerm()?.toLowerCase() || '',
    );
    const icons = this.iconsByCategory();
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
