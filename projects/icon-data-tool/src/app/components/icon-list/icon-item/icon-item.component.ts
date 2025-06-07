import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component, computed, inject, input, output } from '@angular/core';
import { ArdiumSelectModule } from '@ardium-ui/ui';
import { IconDataService } from '../../../services/icon-data/icon-data.service';
import { PartialIconData } from '../../../services/icon-data/partial-icon-data';
import { IconCategory } from './../../../../../../homepage/src/app/components/category-selector/categories';
import { IconDisplayNamePipe } from './../../../../../../homepage/src/app/pipes/icon-display-name.pipe';

@Component({
  selector: 'app-icon-item',
  imports: [IconDisplayNamePipe, ClipboardModule, ArdiumSelectModule],
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

  onCategoryChange(event: any) {
    this.changeCategory.emit(event);
  }
  onTagsChange(event: any) {
    this.changeTags.emit(event);
  }

  readonly changeCategory = output<IconCategory>();
  readonly changeTags = output<string[]>();
}
