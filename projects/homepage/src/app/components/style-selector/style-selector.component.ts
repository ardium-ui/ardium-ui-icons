import { Component, model } from '@angular/core';
import {
  ArdIconCircle,
  ArdIconCircleFilled,
  ArdIconTwoCirclesFilled,
} from '@ardium-ui/icons';
import { IconType } from '@services/icon-storage/icon-storage.types';
import { StyleButtonComponent } from './style-button/style-button.component';

@Component({
  selector: 'app-style-selector',
  imports: [
    StyleButtonComponent,
    ArdIconTwoCirclesFilled,
    ArdIconCircle,
    ArdIconCircleFilled,
  ],
  templateUrl: './style-selector.component.html',
  styleUrl: './style-selector.component.scss',
})
export class StyleSelectorComponent {
  readonly IconType = IconType;

  readonly selectedStyle = model.required<IconType | null>();
}
