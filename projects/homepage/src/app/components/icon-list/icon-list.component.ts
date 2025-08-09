import { BreakpointObserver } from '@angular/cdk/layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  signal,
} from '@angular/core';
import { IconData } from '@services/icon-storage/icon-storage.types';
import { Subject, takeUntil } from 'rxjs';
import { IconItemComponent } from './icon-item/icon-item.component';

@Component({
  selector: 'app-icon-list',
  imports: [IconItemComponent, ScrollingModule],
  templateUrl: './icon-list.component.html',
  styleUrl: './icon-list.component.scss',
  host: {
    '[style.--_icon-size]': 'MIN_ICON_SIZE + "px"',
  },
})
export class IconListComponent implements OnDestroy {
  readonly icons = input.required<IconData[]>();

  readonly iconsInRows = computed<IconData[][]>(() => {
    const icons = this.icons();
    const allRows: IconData[][] = [];
    const perRow = this.iconsPerRow();

    let i = 0;
    while (i < icons.length) {
      allRows.push(icons.slice(i, i + perRow));
      i += perRow;
    }
    return allRows;
  });

  readonly MIN_ICON_SIZE: number = 148;

  readonly BREAKPOINTS: string[] = new Array(30)
    .fill('')
    .map(
      (_, i) =>
        `(min-width: ${i * this.MIN_ICON_SIZE + 272}px) and (max-width: ${
          (i + 1) * this.MIN_ICON_SIZE + 272 - 0.02
        }px)`
    );

  private readonly _iconsPerRow = signal<number>(1);
  public readonly iconsPerRow = this._iconsPerRow.asReadonly();

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
  }

  readonly destroyed = new Subject<void>();
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
