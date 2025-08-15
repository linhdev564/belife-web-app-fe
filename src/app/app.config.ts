import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi, HttpClient, withFetch  } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from './app.translate-loader';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiHttpInterceptor } from './core/interceptors/http.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { TranslateInitializer } from '../app/core/initializers/translate.initializer';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi(), withFetch() ),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'vi',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),
    TranslateInitializer,
    provideRouter(routes),
    { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ]
};
