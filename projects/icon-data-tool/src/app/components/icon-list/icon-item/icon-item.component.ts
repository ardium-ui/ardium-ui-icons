import { Component, computed, input, output } from '@angular/core';
import { PartialIconData } from '../../../services/icon-data/partial-icon-data';
import { IconCategory } from './../../../../../../homepage/src/app/components/category-selector/categories';
import { IconDisplayNamePipe } from './../../../../../../homepage/src/app/pipes/icon-display-name.pipe';

@Component({
  selector: 'app-icon-item',
  imports: [IconDisplayNamePipe],
  templateUrl: './icon-item.component.html',
  styleUrl: './icon-item.component.scss',
})
export class IconItemComponent {
  readonly iconData = input.required<PartialIconData>();

  readonly iconSrc = computed<string>(
    () => `icons/${this.iconData().type}/${this.iconData().name}.svg`
  );

  readonly changeCategory = output<IconCategory>();
  readonly changeTags = output<string[]>();
}
