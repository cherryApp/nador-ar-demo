import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Translation, TranslocoLoader } from '@ngneat/transloco';
import { catchError, tap } from 'rxjs';

/**
 * A fordításokat betöltő szervíz, amely a {@link TranslocoLoader} interfészt implementálja.
 *
 * Ez a szervíz az Angular {@link HttpClient}-ét használja a fordítások beolvasásához.
 *
 * A fordításokat a fordítási nyelv szerinti almappában kell elhelyezni, pl. `en`, `hu`, stb.
 *
 * A példányosítást a {@link TranslocoModule}-ban kell elvégezni.
 */
@Injectable({
  providedIn: 'root'
})
export class TranslationService implements TranslocoLoader {

  /**
   * Az Angular {@link HttpClient}-e, amely a fordítások beolvasásához szükséges.
   *
   * A példányosítást a {@link TranslocoModule}-ban kell elvégezni.
   */
  private http = inject(HttpClient);

  /**
   * A fordításokat tartalmazó cache táblázat, amelyben a kulcs a nyelv rövidítése, 
   * az érték pedig a megfelelő nyelvhez tartozó fordítások táblázata.
   *
   * A cache táblázatba a fordítások beolvasásakor kerülnek a nyelvhez tartozó fordítások.
   * A {@link getTranslation} metódusban kerül használatra.
   */
  private cached: { [key: string]: Translation }  = {};

  constructor() { }

  /**
   * A megadott nyelvhez tartozó fordításokat betölti, és visszaadja a fordításokat.
   *
   * A fordításokat a fordítási nyelv szerinti almappában kell elhelyezni, pl. `en`, `hu`, stb.
   *
   * A metódusban a cache táblázatban is elmenti a fordításokat, így a következő hívásoknál
   * gyorsabb lesz a fordítások beolvasása.
   *
   * @param lang a nyelv, amelynek a fordításait kell visszaadni
   * @returns a megadott nyelvhez tartozó fordítások
   */
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
