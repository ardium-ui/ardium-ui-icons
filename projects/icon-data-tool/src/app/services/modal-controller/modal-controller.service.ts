import { Injectable, signal } from '@angular/core';
import { IconCategory } from '@components/category-selector/categories';
import { Subject } from 'rxjs';

export const ModalType = {
  Category: 'category',
  Tags: 'tags',
} as const;
export type ModalType = (typeof ModalType)[keyof typeof ModalType];

export const ActionType = {
  Add: 'add',
  Delete: 'delete',
} as const;
export type ActionType = (typeof ActionType)[keyof typeof ActionType];

export type ModalResult =
  | { type: (typeof ModalType)['Category']; value: IconCategory }
  | {
      type: (typeof ModalType)['Tags'];
      value: { actionType: ActionType; tag: string }[];
    };

@Injectable({
  providedIn: 'root',
})
export class ModalControllerService {
  private readonly _openModalType = signal<ModalType | null>(null);
  public readonly openModalType = this._openModalType.asReadonly();

  private readonly _openModalData = signal<any>(null);
  public readonly openModalData = this._openModalData.asReadonly();

  openModal(modalType: ModalType, data: any = null): void {
    this._openModalType.set(modalType);
    this._openModalData.set(data);
  }
  closeModal(): void {
    this._openModalType.set(null);
    this._openModalData.set(null);
  }

  readonly modalResult$ = new Subject<ModalResult>();
}
