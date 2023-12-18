import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Translation, TranslocoLoader } from '@ngneat/transloco';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService implements TranslocoLoader {

  private http = inject(HttpClient);

  private cached: { [key: string]: Translation }  = {};

  constructor() { }

  getTranslation(lang: string) {
    console.log(this.cached);
      return this.http.get<Translation>(`/assets/i18n/${lang}.json`).pipe(
        tap((translation) => {
          this.cached[lang] = translation;
        }),
        catchError(() => {
          return [this.cached[lang] || {}];
        }),
      );
  }
  
}
