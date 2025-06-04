import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, input, output } from '@angular/core';
import { PartialIconData } from '../../services/icon-data/partial-icon-data';
import { IconCategory } from './../../../../../homepage/src/app/components/category-selector/categories';
import { IconItemComponent } from './icon-item/icon-item.component';

type IndexAndValue<T> = { index: number; value: T };

@Component({
  selector: 'app-icon-list',
  imports: [IconItemComponent, ScrollingModule],
  templateUrl: './icon-list.component.html',
  styleUrl: './icon-list.component.scss',
})
export class IconListComponent {
  readonly icons = input.required<PartialIconData[]>();

  readonly changeCategory = output<IndexAndValue<IconCategory>>();
  readonly changeTags = output<IndexAndValue<string[]>>();
}
