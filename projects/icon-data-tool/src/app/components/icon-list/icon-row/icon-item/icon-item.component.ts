import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component, computed, HostListener, inject, input, model, output } from '@angular/core';
import { ArdiumCheckboxModule } from '@ardium-ui/ui';
import { IconCategory } from '@components/category-selector/categories';
import { IconDataService } from 'projects/icon-data-tool/src/app/services/icon-data/icon-data.service';
import { PartialIconData } from 'projects/icon-data-tool/src/app/services/icon-data/partial-icon-data';
import { IconDisplayNamePipe } from './../../../../../../../homepage/src/app/pipes/icon-display-name.pipe';

@Component({
  selector: 'app-icon-item',
  imports: [IconDisplayNamePipe, ClipboardModule, ArdiumCheckboxModule],
  templateUrl: './icon-item.component.html',
  styleUrl: './icon-item.component.scss',
})
export class IconItemComponent {
  readonly ALL_CATEGORIES = Object.values(IconCategory);

  private readonly _iconDataService = inject(IconDataService);
  readonly ALL_TAGS = this._iconDataService.allTags;

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
