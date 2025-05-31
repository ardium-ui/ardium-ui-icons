import { Component, computed, input } from '@angular/core';
import { IconDisplayNamePipe } from '@pipes/icon-display-name.pipe';
import { IconData } from '@services/icon-storage/icon-storage.types';

@Component({
  selector: 'app-icon-item',
  imports: [IconDisplayNamePipe],
  templateUrl: './icon-item.component.html',
  styleUrl: './icon-item.component.scss',
})
export class IconItemComponent {
  readonly iconData = input.required<IconData>();

  readonly iconSrc = computed<string>(
    () => `assets/icons/${this.iconData().type}/${this.iconData().name}.svg`
  );
}
