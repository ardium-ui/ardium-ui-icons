import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ArdiumButtonModule,
  ArdiumIconButtonModule,
  ArdiumIconModule,
  ArdiumInputModule
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
    ArdiumInputModule,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly iconDataService = inject(IconDataService);
}
