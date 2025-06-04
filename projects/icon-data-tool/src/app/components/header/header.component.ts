import { Component } from '@angular/core';
import { ArdiumButtonModule } from '@ardium-ui/ui';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ArdiumButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
