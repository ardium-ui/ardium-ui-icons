import { computed, Injectable } from '@angular/core';
import { arraySignal } from '@ardium-ui/devkit';
import { ICON_LIST } from '../../data/icon-list';
import { IconCategory } from './../../../../../homepage/src/app/components/category-selector/categories';
import { ICON_DATA as EXISTING_ICON_DATA } from './../../../../../homepage/src/app/services/icon-storage/icon-data';
import { mergeIconDataWithExisting } from './merge-with-existing';

@Injectable({
  providedIn: 'root',
})
export class IconDataService {
  private readonly _iconData = arraySignal(
    mergeIconDataWithExisting(ICON_LIST, EXISTING_ICON_DATA)
  );
  public readonly iconData = this._iconData.asReadonly();

  readonly allTags = computed<string[]>(() => [
    ...new Set(
      this._iconData()
        .map((v) => v.tags)
        .flat()
    ),
  ]);

  setCategory(itemIndex: number, newCategory: IconCategory) {
    this._iconData.updateAt(itemIndex, (icon) => ({
      ...icon,
      category: newCategory,
    }));
  }

  setTags(itemIndex: number, newTags: string[]) {
    this._iconData.updateAt(itemIndex, (icon) => ({
      ...icon,
      tags: newTags,
    }));
  }
}
