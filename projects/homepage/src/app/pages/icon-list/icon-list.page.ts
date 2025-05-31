import { Component } from '@angular/core';
import { IconListComponent } from '@components/icon-list/icon-list.component';
import { IconData, IconType } from '@services/icon-storage/icon-storage.types';

@Component({
  selector: 'app-icon-list-page',
  imports: [IconListComponent],
  templateUrl: './icon-list.page.html',
  styleUrl: './icon-list.page.scss',
})
export class IconListPage {
  readonly MOCK_ICONS: IconData[] = [
    {
      name: 'play',
      type: IconType.Outlined,
    },
    {
      name: 'sun',
      type: IconType.Outlined,
    },
    {
      name: 'alert',
      type: IconType.Outlined,
    },
    {
      name: 'activity',
      type: IconType.Outlined,
    },
    {
      name: 'bank',
      type: IconType.Outlined,
    },
    {
      name: 'brain',
      type: IconType.Outlined,
    },
    {
      name: 'heart',
      type: IconType.Outlined,
    },
    {
      name: 'heart',
      type: IconType.Filled,
    },
    {
      name: 'speaker',
      type: IconType.Outlined,
    },
    {
      name: 'speaker-2',
      type: IconType.Outlined,
    },
  ];
}
