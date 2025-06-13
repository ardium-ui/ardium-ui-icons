import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { Component, computed, HostListener, input, model, output } from '@angular/core';
import { ArdiumCheckboxModule, ArdiumIconModule } from '@ardium-ui/ui';
import { PartialIconData } from 'projects/icon-data-tool/src/app/services/icon-data/partial-icon-data';
import { IconDisplayNamePipe } from './../../../../../../../homepage/src/app/pipes/icon-display-name.pipe';

@Component({
  selector: 'app-icon-item',
  imports: [IconDisplayNamePipe, CommonModule, ClipboardModule, ArdiumCheckboxModule, ArdiumIconModule],
  templateUrl: './icon-item.component.html',
  styleUrl: './icon-item.component.scss',
  host: {
    '[class.selected]': 'checkboxSelected()'
  }
})
export class IconItemComponent {
  readonly iconData = input.required<PartialIconData>();

  readonly iconSrc = computed<string>(
    () => `icons/${this.iconData().type}/${this.iconData().name}.svg`
  );

  readonly checkboxSelected = model<boolean>(false);

  readonly itemClick = output<MouseEvent>();

  onCheckboxClick(event: MouseEvent) {
    event.stopPropagation();
  }

  @HostListener('click', ['$event'])
  onItemClick(event: MouseEvent) {
    this.itemClick.emit(event);
  }
}
