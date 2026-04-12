import { Component, inject } from '@angular/core';
import { ArdIconSearch_2 } from "@ardium-ui/icons";
import { ArdiumInputModule } from '@ardium-ui/ui';
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

  onSearch(value: string | null): void {
    this.iconStorageService.searchTerm.set(value || '');
  }
}
