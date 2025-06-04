import { Routes } from '@angular/router';
import { IconDataPage } from './pages/icon-data/icon-data.page';

export const routes: Routes = [
  { path: '', component: IconDataPage },
  { path: '**', redirectTo: '' },
];
