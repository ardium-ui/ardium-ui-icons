import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable } from '@angular/core';
import { arraySignal } from '@ardium-ui/devkit';
import { Subscription } from 'rxjs';
import { ICON_DATA as EXISTING_ICON_DATA } from '../../data/existing-icon-data';
import { ICON_LIST } from '../../data/icon-list';
import { IconCategory } from './../../../../../homepage/src/app/components/category-selector/categories';
import { mergeIconDataWithExisting } from './merge-with-existing';

@Injectable({
  providedIn: 'root',
})
export class IconDataService {
  private readonly _http = inject(HttpClient);

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

  private _sub: Subscription | null = null;
  constructor() {
    effect((onCleanup) => {
      this._sub?.unsubscribe();
      console.log(this._iconData());
      this._sub = this._http
        .post(
          'http://localhost:7243/update-homepage-icon-data',
          this._iconData()
        )
        .subscribe();

      onCleanup(() => {
        this._sub?.unsubscribe();
      });
    });
  }
}
