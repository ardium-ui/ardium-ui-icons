import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  Component,
  computed,
  input,
  output
} from '@angular/core';
import { PartialIconData } from '../../services/icon-data/partial-icon-data';
import { IconRowComponent, IndexAndValue } from './icon-row/icon-row.component';

export type RowIndexAndValue<T> = {
  rowIndex: number;
  itemIndex: number;
  value: T;
};

export type IconAndSelectionData = { icon: PartialIconData; selected: boolean };

@Component({
  selector: 'app-icon-list',
  imports: [ScrollingModule, IconRowComponent],
  templateUrl: './icon-list.component.html',
  styleUrl: './icon-list.component.scss',
  host: {
    '[style.--_icon-size]': 'iconSize() + "px"',
  },
})
export class IconListComponent {
  readonly icons = input.required<PartialIconData[]>();
  readonly selectedIndexes = input.required<Set<number>>();

  readonly iconSize = input.required<number>();
  readonly iconsPerRow = input.required<number>();

  readonly iconsInRows = computed<IconAndSelectionData[][]>(() => {
    const allRows: IconAndSelectionData[][] = [];

    let i = 0;
    while (i < this.icons().length) {
      const rowArray: IconAndSelectionData[] = [];
      while (rowArray.length < this.iconsPerRow() && i < this.icons().length) {
        rowArray.push({
          icon: this.icons()[i],
          selected: this.selectedIndexes().has(i),
        });
        i++;
      }
      allRows.push(rowArray);
    }
    return allRows;
  });

  onCheckboxStateChange(
    itemData: IndexAndValue<boolean>,
    rowIndex: number
  ): void {
    this.checkboxStateChange.emit({
      value: itemData.value,
      itemIndex: itemData.index,
      rowIndex,
    });
  }
  onItemClick(itemData: IndexAndValue<MouseEvent>, rowIndex: number): void {
    this.itemClick.emit({
      value: itemData.value,
      itemIndex: itemData.index,
      rowIndex,
    });
  }

  readonly checkboxStateChange = output<RowIndexAndValue<boolean>>();
  readonly itemClick = output<RowIndexAndValue<MouseEvent>>();
}
