import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/icon-list/icon-list.page').then((p) => p.IconListPage),
  },
];
