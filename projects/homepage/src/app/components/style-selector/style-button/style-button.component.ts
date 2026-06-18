import { Component, input } from '@angular/core';

@Component({
  selector: 'app-style-button',
  imports: [],
  templateUrl: './style-button.component.html',
  styleUrl: './style-button.component.scss'
})
export class StyleButtonComponent {
  readonly label = input.required<string>();
  readonly active = input.required<boolean>();
}
