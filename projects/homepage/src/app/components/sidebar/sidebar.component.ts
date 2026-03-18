import { Component, inject } from '@angular/core';
import { CategorySelectorComponent } from "@components/category-selector/category-selector.component";
import { IconStorageService } from '@services/icon-storage/icon-storage.service';

@Component({
  selector: 'app-sidebar',
  imports: [CategorySelectorComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  readonly iconStorageService = inject(IconStorageService);
}
