import { Component, inject } from '@angular/core';
import { KeyboardService } from '@ardium-ui/devkit';
import {
  IconListComponent,
  RowIndexAndValue,
} from '../../components/icon-list/icon-list.component';
import { IconDataService } from '../../services/icon-data/icon-data.service';

@Component({
  selector: 'app-icon-data',
  imports: [IconListComponent],
  templateUrl: './icon-data.page.html',
  styleUrl: './icon-data.page.scss',
})
export class IconDataPage {
  readonly iconDataService = inject(IconDataService);

  private readonly _keyboardService = inject(KeyboardService);

  onCheckboxStateChange(iconData: RowIndexAndValue<boolean>): void {
    if (this._keyboardService.isShiftHeld()) {
      this.iconDataService.selectItemsBetweenThisAndLastSelected(
        iconData.rowIndex,
        iconData.itemIndex
      );
      return;
    }
    this.iconDataService.toggleSelectionStateForRowAndItem(
      iconData.rowIndex,
      iconData.itemIndex,
      iconData.value
    );
  }
  onItemClick(iconData: RowIndexAndValue<MouseEvent>): void {
    if (!this.iconDataService.isAnyIconSelected()) return;

    if (this._keyboardService.isShiftHeld()) {
      this.iconDataService.selectItemsBetweenThisAndLastSelected(
        iconData.rowIndex,
        iconData.itemIndex
      );
      return;
    }
    this.iconDataService.toggleSelectionStateForRowAndItem(
      iconData.rowIndex,
      iconData.itemIndex
    );
    iconData.value.preventDefault();
    iconData.value.stopPropagation();
  }
}
