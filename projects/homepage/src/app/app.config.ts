import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { IconStorageService } from '@services/icon-storage/icon-storage.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), IconStorageService]
};
