import { Injectable, inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

/**
 * Az alkalmazás által használt tárhely-szolgáltatás.
 *
 * Ez a szolgáltatás a {@link Storage} osztályt használja a tárhelyhez való hozzáféréshez.
 *
 * A példányosítást a {@link StorageService} szolgáltatásban kell elvégezni.
 */

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage = inject(Storage);

  private _storage: Storage | null = null;

  /**
   * Az alkalmazás által használt tárhely-szolgáltatás konstruktora.
   *
   * Ez a konstruktor inicializálja a {@link StorageService} szolgáltatást.
   *
   * @param storage a {@link Storage} osztály példánya, amely a tárhelyhez való hozzáférést biztosítja
   */
  constructor() {
    this.init();
  }

  /**
   * Inicializálja a {@link StorageService} szolgáltatást.
   *
   * Ez a metódus inicializálja a {@link StorageService} szolgáltatást.
   *
   * @returns a {@link Promise} példánya, amely a szolgáltatás inicializálásának eredményét tartalmazza
   */
  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  /**
   * Beállítja a megadott kulcsot a megadott értékre.
   *
   * Ez a metódus beállítja a megadott kulcsot a megadott értékre.
   *
   * @param key a kulcs, amelyre a beállítandó értéket szeretnénk menteni
   * @param value az érték, amelyet a megadott kulcshoz szeretnénk menteni
   */
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  /**
   * Visszaadja a megadott kulcshoz tartozó értéket.
   *
   * Ez a metódus visszaadja a megadott kulcshoz tartozó értéket.
   *
   * @param key a kulcs, amelynek az értékét szeretnénk lekérni
   * @returns a {@link Promise} példánya, amely a megadott kulcshoz tartozó értéket tartalmazza
   */
  public getValue(key: string): Promise<string> {
    return this._storage?.get(key) || Promise.resolve('');
  }

  /**
   * Visszaadja a megadott kulcshoz tartozó értéket, mint JSON objektumot.
   *
   * Ez a metódus visszaadja a megadott kulcshoz tartozó értéket, mint JSON objektumot.
   *
   * @param key a kulcs, amelynek az értékét szeretnénk lekérni
   * @returns a {@link Promise} példánya, amely a megadott kulcshoz tartozó értéket tartalmazza,
   *          mint JSON objektumot
   */
  public async getJSON(key: string): Promise<any> {
    const value = await this._storage?.get(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return null;
    }
  }
  
}