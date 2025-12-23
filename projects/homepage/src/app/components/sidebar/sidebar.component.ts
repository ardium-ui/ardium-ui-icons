import { Component } from '@angular/core';
import { CategorySelectorComponent } from "@components/category-selector/category-selector.component";

@Component({
  selector: 'app-sidebar',
  imports: [CategorySelectorComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
