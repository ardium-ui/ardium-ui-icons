import { Component, computed, inject, Signal } from '@angular/core';
import { setSignal } from '@ardium-ui/devkit';
import {
  ArdiumChipModule,
  ArdiumDialogModule,
  ArdiumSelectModule,
} from '@ardium-ui/ui';
import { IconDataService } from '../../../services/icon-data/icon-data.service';
import {
  ActionType,
  ModalControllerService,
  ModalType,
} from '../../../services/modal-controller/modal-controller.service';
import { RecentlyAccessedList } from '../../../utils/recently-accessed-list';

@Component({
  selector: 'app-tags-modal',
  imports: [ArdiumDialogModule, ArdiumSelectModule, ArdiumChipModule],
  templateUrl: './tags-modal.component.html',
  styleUrl: './tags-modal.component.scss',
})
export class TagsModalComponent {
  readonly modalController = inject(ModalControllerService);
  readonly iconDataService = inject(IconDataService);
  readonly OpenModalType = ModalType;

  readonly tagList = new RecentlyAccessedList([
    ...new Set(
      this.iconDataService
        .iconData()
        .map((v) => v.tags)
        .flat()
    ),
  ]);

  readonly originalTags = this.modalController.openModalData as Signal<{
    common: string[];
    other: string[];
  } | null>;
  readonly addedTags = setSignal<string>();
  readonly removedTags = setSignal<string>();

  readonly originalCommonTagsToDisplay = computed<string[]>(
    () =>
      this.originalTags()?.common.filter((v) => !this.removedTags().has(v)) ??
      []
  );
  readonly originalOtherTagsToDisplay = computed<string[]>(
    () =>
      this.originalTags()?.other.filter(
        (v) => !this.removedTags().has(v) && !this.addedTags().has(v)
      ) ?? []
  );

  readonly resultAsActions = computed<
    { actionType: ActionType; tag: string }[]
  >(() => [
    ...[...this.addedTags()].map((t) => ({
      actionType: ActionType.Add,
      tag: t,
    })),
    ...[...this.removedTags()].map((t) => ({
      actionType: ActionType.Delete,
      tag: t,
    })),
  ]);

  addTag(tag: string): void {
    if (!this.tagList.has(tag)) {
    }
    if (this.removedTags.has(tag)) {
      this.removedTags.delete(tag);
      return;
    }
    if (this.originalTags()?.common.includes(tag)) return;
    this.addedTags.add(tag);
  }
  removeAddedTag(tag: string): void {
    this.addedTags.delete(tag);
  }
  removeOriginalTag(tag: string): void {
    if (this.addedTags.has(tag)) {
      this.removeAddedTag(tag);
      return;
    }
    this.removedTags.add(tag);
  }

  emitResult(): void {
    const v = this.resultAsActions();
    if (!v.length) return;

    this.modalController.closeModal();
    this.modalController.modalResult$.next({
      type: ModalType.Tags,
      value: v,
    });
  }
}
