import { APP_INITIALIZER, Provider } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export function initTranslate(translate: TranslateService) {
  return () => {
    translate.addLangs(['vi', 'en']);
    translate.setDefaultLang('vi');
  };
}

export const TranslateInitializer: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initTranslate,
  deps: [TranslateService],
  multi: true
};
