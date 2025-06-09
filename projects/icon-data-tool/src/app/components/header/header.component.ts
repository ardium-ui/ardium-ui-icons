import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ArdiumButtonModule,
  ArdiumIconButtonModule,
  ArdiumIconModule
} from '@ardium-ui/ui';
import { IconDataService } from '../../services/icon-data/icon-data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ArdiumButtonModule,
    DecimalPipe,
    ArdiumIconButtonModule,
    ArdiumIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly iconDataService = inject(IconDataService);
}
