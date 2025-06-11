import { Component } from '@angular/core';
import { CategoryModalComponent } from './category-modal/category-modal.component';
import { TagsModalComponent } from './tags-modal/tags-modal.component';

@Component({
  selector: 'app-modals',
  imports: [CategoryModalComponent, TagsModalComponent],
  template: `<app-category-modal /> <app-tags-modal />`,
})
export class ModalsComponent {}
