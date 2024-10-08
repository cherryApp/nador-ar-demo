import { inject, Injectable } from "@angular/core";
import { Translation, TranslocoLoader } from "@ngneat/transloco";
import { HttpClient } from "@angular/common/http";

/**
 * Egy olyan osztály, amely a {@link TranslocoLoader} interfészt implementálja, és a fordításokat JSON fájlokból tölti be.
 *
 * Példányosítva van a {@link HttpClientModule}-hoz hasonlóan, tehát példányosítva van egy példány az alkalmazásban.
 *
 * A fordítások beolvasásához az Angular {@link HttpClient}-ét használja.
 *
 * A fordításokat a fordítási nyelv szerinti almappában kell elhelyezni, pl. `en`, `hu`, stb.
 */
@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
    private http = inject(HttpClient);

    /**
     * Visszaadja a megadott nyelvhez tartozó fordításokat.
     *
     * A fordításokat a fordítási nyelv szerinti almappában kell elhelyezni, pl. `en`, `hu`, stb.
     *
     * @param lang a nyelv, amelynek a fordításait kell visszaadni
     */
    getTranslation(lang: string) {
        return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
    }
}
