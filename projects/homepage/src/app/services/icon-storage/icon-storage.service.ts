import { effect, Injectable, signal } from '@angular/core';
import { persistentSignal, PersistentStorageMethod } from '@ardium-ui/devkit';
import { IconCategory } from '@components/category-selector/categories';
import { IconType } from './icon-storage.types';

@Injectable({
  providedIn: 'root',
})
export class IconStorageService {
  private readonly _worker!: { postMessage: (message: string) => void };

  readonly selectedType = persistentSignal<IconType | null>(null, {
    method: PersistentStorageMethod.LocalStorage,
    name: 'selectedType',
  });
  readonly selectedCategory = persistentSignal<IconCategory | null>(null, {
    method: PersistentStorageMethod.LocalStorage,
    name: 'selectedCategory',
  });

  readonly searchTerm = signal<string>('');

  constructor() {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker(
        new URL('./search-worker.worker', import.meta.url)
      );
      worker.onmessage = ({ data }) => {
        console.log(`page got message: ${data}`);
      };
      this._worker = worker;
    } else {
      console.warn(
        'Web Workers are not supported in this environment. Falling back to main thread processing.'
      );

      // TODO
    }

    effect(() => {
      const type = this.selectedType();
      const category = this.selectedCategory();
      const search = this.searchTerm();
    });
  }
}
