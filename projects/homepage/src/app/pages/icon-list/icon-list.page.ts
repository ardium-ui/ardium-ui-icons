import { Component, inject } from '@angular/core';
import { IconListComponent } from '@components/icon-list/icon-list.component';
import { IconStorageService } from '@services/icon-storage/icon-storage.service';

@Component({
  selector: 'app-icon-list-page',
  imports: [IconListComponent],
  templateUrl: './icon-list.page.html',
  styleUrl: './icon-list.page.scss',
})
export class IconListPage {
  readonly iconStorage = inject(IconStorageService);
}
