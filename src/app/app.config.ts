import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection,importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { provideHttpClient } from '@angular/common/http';
import Aura from '@primeuix/themes/aura';
import { InmemoryTestData } from './data/inmemory.api';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    }),

    provideHttpClient(),
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(InmemoryTestData, {
        delay: 500,
        passThruUnknownUrl: false
      })
    ),
  ]
};
