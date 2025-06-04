import { Component, inject } from '@angular/core';
import { IconListComponent } from "../../components/icon-list/icon-list.component";
import { IconDataService } from '../../services/icon-data/icon-data.service';

@Component({
  selector: 'app-icon-data',
  imports: [IconListComponent],
  templateUrl: './icon-data.page.html',
  styleUrl: './icon-data.page.scss',
})
export class IconDataPage {
  readonly iconDataService = inject(IconDataService);
}
