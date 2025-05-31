import { Component, input } from '@angular/core';
import { IconData } from '@services/icon-storage/icon-storage.types';
import { IconItemComponent } from './icon-item/icon-item.component';

@Component({
  selector: 'app-icon-list',
  imports: [IconItemComponent],
  templateUrl: './icon-list.component.html',
  styleUrl: './icon-list.component.scss'
})
export class IconListComponent {
  readonly icons = input.required<IconData[]>();
}
