import { Component, inject } from '@angular/core';
import { IconListComponent } from '@components/icon-list/icon-list.component';
import { IconStorageService } from '@services/icon-storage/icon-storage.service';
import { IconData, IconType } from '@services/icon-storage/icon-storage.types';

@Component({
  selector: 'app-icon-list-page',
  imports: [IconListComponent],
  templateUrl: './icon-list.page.html',
  styleUrl: './icon-list.page.scss',
})
export class IconListPage {
  readonly iconStorage = inject(IconStorageService);

  readonly MOCK_ICONS: IconData[] = [
    {
      name: 'play',
      type: IconType.Outlined,
      category: 'other',
      tags: [],
    },
    {
      name: 'sun',
      type: IconType.Outlined,
      category: 'weather',
      tags: [],
    },
    {
      name: 'alert',
      type: IconType.Outlined,
      category: 'other',
      tags: [],
    },
    {
      name: 'activity',
      type: IconType.Outlined,
      category: 'other',
      tags: [],
    },
    {
      name: 'bank',
      type: IconType.Outlined,
      category: 'other',
      tags: [],
    },
    {
      name: 'brain',
      type: IconType.Outlined,
      category: 'other',
      tags: [],
    },
    {
      name: 'heart',
      type: IconType.Outlined,
      category: 'other',
      tags: [],
    },
    {
      name: 'heart',
      type: IconType.Filled,
      category: 'other',
      tags: [],
    },
    {
      name: 'speaker',
      type: IconType.Outlined,
      category: 'other',
      tags: [],
    },
    {
      name: 'speaker-2',
      type: IconType.Outlined,
      category: 'other',
      tags: [],
    },
  ];
}
