import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ModalsComponent } from "./components/modals/modals.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ModalsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
