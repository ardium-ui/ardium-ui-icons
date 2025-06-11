import { Component, inject, signal } from '@angular/core';
import { ArdiumDialogModule, ArdiumSelectModule } from '@ardium-ui/ui';
import { IconCategory } from '@components/category-selector/categories';
import {
  ModalControllerService,
  ModalType,
} from '../../../services/modal-controller/modal-controller.service';
import { RecentlyAccessedList } from '../../../utils/recently-accessed-list';

@Component({
  selector: 'app-category-modal',
  imports: [ArdiumDialogModule, ArdiumSelectModule],
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.scss',
})
export class CategoryModalComponent {
  readonly modalController = inject(ModalControllerService);
  readonly OpenModalType = ModalType;

  readonly categoryList = new RecentlyAccessedList(
    Object.keys(IconCategory) as (keyof typeof IconCategory)[]
  );

  readonly category = signal<keyof typeof IconCategory | null>(null);

  saveCategory(result: any): void {
    const category = result as keyof typeof IconCategory;
    this.category.set(category);
  }
  emitResult(): void {
    const v = this.category();
    if (!v) return;

    this.modalController.closeModal();
    this.modalController.modalResult$.next({
      type: ModalType.Category,
      value: IconCategory[v],
    });
  }
}
