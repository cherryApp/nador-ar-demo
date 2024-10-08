import { HttpClient } from '@angular/common/http';
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule,
} from '@ngneat/transloco';
import { Injectable, isDevMode, NgModule } from '@angular/core';

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
export class TranslocoLoaderService implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  /**
   * Visszaadja a megadott nyelvhez tartozó fordításokat.
   *
   * A fordításokat a fordítási nyelv szerinti almappában kell elhelyezni, pl. `en`, `hu`, stb.
   *
   * @param lang a nyelv, amelynek a fordításait kell visszaadni
   * @returns a megadott nyelvhez tartozó fordítások
   */
  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

/**
 * A fordításokat kezelő modul.
 *
 * Ez a modul exportálja a {@link TranslocoModule}-t, és szolgáltatja a
 * {@link TranslocoLoader} interfészt implementáló {@link TranslocoLoaderService}-t,
 * amely a fordításokat az Angular {@link HttpClient}-ével tölti be.
 *
 * A fordításokat a fordítási nyelv szerinti almappában kell elhelyezni, pl. `en`, `hu`, stb.
 *
 * A példányosítást ebben a modulban kell elvégezni.
 */
@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'de', 'fa'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoLoaderService },
  ],
})
export class TranslocoRootModule {}
