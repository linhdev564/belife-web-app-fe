import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class TranslateHttpLoader implements TranslateLoader {
  constructor(private http: HttpClient, public prefix: string = '/assets/i18n/', public suffix: string = '.json') {}

  public getTranslation(lang: string): Observable<{ [key: string]: string }> {
    return this.http.get<{ [key: string]: string }>(`${this.prefix}${lang}${this.suffix}`);
  }
}
