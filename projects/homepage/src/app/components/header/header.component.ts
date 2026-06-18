import { Component, computed, inject } from '@angular/core';
import { ArdIconSearch_2 } from "@ardium-ui/icons";
import { ArdiumInputModule } from '@ardium-ui/ui';
import { CATEGORY_LABELS } from '@components/category-selector/categories';
import { IconStorageService } from '@services/icon-storage/icon-storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ArdiumInputModule, ArdIconSearch_2],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly iconStorageService = inject(IconStorageService);

  readonly searchPlaceholder = computed(() => {
    const count = this.iconStorageService.currentIconsCount();
    const category = this.iconStorageService.selectedCategory();
    if (!category) {
      return `Search ${count} icons...`;
    }
    return `Search ${CATEGORY_LABELS[category]} (${count}) icons...`;
  })

  onSearch(value: string | null): void {
    this.iconStorageService.searchTerm.set(value || '');
  }
}
