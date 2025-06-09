import { Component, input, output } from '@angular/core';
import { IconAndSelectionData } from '../icon-list.component';
import { IconItemComponent } from './icon-item/icon-item.component';

export type IndexAndValue<T> = { index: number; value: T };

@Component({
  selector: 'app-icon-row',
  imports: [IconItemComponent],
  templateUrl: './icon-row.component.html',
  styleUrl: './icon-row.component.scss',
})
export class IconRowComponent {
  readonly icons = input.required<IconAndSelectionData[]>();

  onItemCheckboxChange(newState: boolean, index: number): void {
    this.checkboxStateChange.emit({ index, value: newState });
  }
  onItemClick(event: MouseEvent, index: number): void {
    this.itemClick.emit({ index, value: event });
  }

  readonly checkboxStateChange = output<IndexAndValue<boolean>>();
  readonly itemClick = output<IndexAndValue<MouseEvent>>();
}
