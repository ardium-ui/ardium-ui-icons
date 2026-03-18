import { Component, input } from '@angular/core';

@Component({
  selector: 'app-category-button',
  imports: [],
  templateUrl: './category-button.component.html',
  styleUrl: './category-button.component.scss'
})
export class CategoryButtonComponent {
  readonly label = input.required<string>();
  readonly count = input.required<number>();
  readonly active = input.required<boolean>();
}
