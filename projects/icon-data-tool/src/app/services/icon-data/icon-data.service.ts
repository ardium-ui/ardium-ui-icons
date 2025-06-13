import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import {
  computed,
  effect,
  inject,
  Injectable,
  OnDestroy,
  signal,
} from '@angular/core';
import { arraySignal, setSignal } from '@ardium-ui/devkit';
import { IconCategory } from '@components/category-selector/categories';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ICON_DATA as EXISTING_ICON_DATA } from '../../data/existing-icon-data';
import { ICON_LIST } from '../../data/icon-list';
import { groupTags } from '../../utils/group-tags';
import {
  ActionType,
  ModalControllerService,
  ModalType,
} from '../modal-controller/modal-controller.service';
import { mergeIconDataWithExisting } from './merge-with-existing';

@Injectable({
  providedIn: 'root',
})
export class IconDataService implements OnDestroy {
  private readonly _http = inject(HttpClient);
  private readonly _modalController = inject(ModalControllerService);

  private readonly _iconData = arraySignal(
    mergeIconDataWithExisting(ICON_LIST, EXISTING_ICON_DATA)
  );
  public readonly iconData = this._iconData.asReadonly();

  private readonly _selectedIconIndexes = setSignal<number>();
  public readonly selectedIconIndexes = this._selectedIconIndexes.asReadonly();

  private readonly _lastSelectedIndex = signal<number | null>(null);

  readonly isAnyIconSelected = computed<boolean>(
    () => !this._selectedIconIndexes.isEmpty()
  );

  toggleSelectionStateForRowAndItem(
    rowIndex: number,
    itemIndex: number,
    newState?: boolean
  ): void {
    const indexToToggle = this.iconsPerRow() * rowIndex + itemIndex;
    const isSelected = this._selectedIconIndexes.has(indexToToggle);
    newState ??= !isSelected;

    if (newState === false && isSelected) {
      this._selectedIconIndexes.delete(indexToToggle);
    } else if (newState === true) {
      this._selectedIconIndexes.add(indexToToggle);
    }
    this._lastSelectedIndex.set(indexToToggle);
  }
  selectItemsBetweenThisAndLastSelected(
    rowIndex: number,
    itemIndex: number
  ): void {
    const currentIndex = this.iconsPerRow() * rowIndex + itemIndex;
    const lastSelectedIndex = this._lastSelectedIndex() ?? currentIndex;

    const startIndex = Math.min(currentIndex, lastSelectedIndex);
    const endIndex = Math.max(currentIndex, lastSelectedIndex);

    if (!this._lastSelectedIndex()) {
      this._lastSelectedIndex.set(currentIndex);
    }
    for (let i = startIndex; i <= endIndex; i++) {
      if (!this._selectedIconIndexes.has(i)) {
        this._selectedIconIndexes.add(i);
      }
    }
  }
  unselectAll(): void {
    this._selectedIconIndexes.clear();
    this._lastSelectedIndex.set(null);
  }
  setCategoryForSelected(newCategory: IconCategory) {
    for (const index of this.selectedIconIndexes()) {
      this._iconData.updateAt(index, (icon) => ({
        ...icon,
        category: newCategory,
      }));
    }
    this.unselectAll();
  }
  updateTagsForSelected(actions: { actionType: ActionType; tag: string }[]) {
    for (const index of this.selectedIconIndexes()) {
      this._iconData.updateAt(index, (icon) => {
        const newTags = new Set(icon.tags);

        for (const action of actions) {
          if (action.actionType === ActionType.Add) {
            newTags.add(action.tag);
          } else {
            newTags.delete(action.tag);
          }
        }

        return {
          ...icon,
          tags: [...newTags],
        };
      });
    }
    this.unselectAll();
  }

  openCategorySelectionModal(): void {
    this._modalController.openModal(ModalType.Category);
  }
  openTagsManagementModal(): void {
    this._modalController.openModal(
      ModalType.Tags,
      groupTags(
        this._iconData().filter((_, i) => this.selectedIconIndexes().has(i))
      )
    );
  }

  //! determining number of icons per row
  readonly ICON_SIZE: number = 132;

  readonly BREAKPOINTS: string[] = new Array(30)
    .fill('')
    .map(
      (_, i) =>
        `(min-width: ${i * this.ICON_SIZE + 16}px) and (max-width: ${
          (i + 1) * this.ICON_SIZE + 16 - 0.02
        }px)`
    );

  private readonly _iconsPerRow = signal<number>(1);
  public readonly iconsPerRow = this._iconsPerRow.asReadonly();

  private _sub: Subscription | null = null;
  constructor() {
    inject(BreakpointObserver)
      .observe(this.BREAKPOINTS)
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const breakpoint in result.breakpoints) {
          const isMatched = result.breakpoints[breakpoint];
          if (!isMatched) continue;

          const breakpointIndex = this.BREAKPOINTS.indexOf(breakpoint);
          this._iconsPerRow.set(breakpointIndex);
        }
      });

    // auto-update data on every change
    effect((onCleanup) => {
      this._sub?.unsubscribe();
      this._sub = this._http
        .post(
          'http://localhost:7243/update-homepage-icon-data',
          this._iconData()
        )
        .subscribe();

      onCleanup(() => {
        this._sub?.unsubscribe();
      });
    });

    // listen to modal submit events
    this._modalController.modalResult$.subscribe((event) => {
      const { type } = event;
      switch (type) {
        case ModalType.Category: {
          this.setCategoryForSelected(event.value);
          break;
        }
        case ModalType.Tags: {
          this.updateTagsForSelected(event.value);
          break;
        }

        default: {
          throw new Error(`Unknown modal type "${type}"`);
        }
      }
    });
  }

  readonly destroyed = new Subject<void>();
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
