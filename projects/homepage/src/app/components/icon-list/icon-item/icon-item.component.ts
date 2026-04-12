import { Component, computed, inject, input } from '@angular/core';
import { IconStorageService } from '@services/icon-storage/icon-storage.service';
import { IconData } from '@services/icon-storage/icon-storage.types';
import { highlightOrderedMatch } from '../../../utils/highlight';

@Component({
  selector: 'app-icon-item',
  imports: [],
  templateUrl: './icon-item.component.html',
  styleUrl: './icon-item.component.scss',
})
export class IconItemComponent {
  private readonly _iconStorageService = inject(IconStorageService);

  readonly iconData = input.required<IconData>();

  readonly highlightedNameParts = computed(() => {
    const search = this._iconStorageService.searchTerm();
    return highlightOrderedMatch(this.iconData().name, search);
  });

  readonly iconSrc = computed<string>(
    () => `assets/icons/${this.iconData().type}/${this.iconData().name}.svg`,
  );
}
