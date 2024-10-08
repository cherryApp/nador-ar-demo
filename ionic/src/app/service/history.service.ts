import { Injectable, inject } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { HistoryData } from "../model/history-data";
import { BehaviorSubject, filter, firstValueFrom } from "rxjs";

/**
 * A HistoryService osztály biztosítja a történeti adatokhoz való hozzáférést.
 *
 * Ez a szolgáltatás kezeli a történeti adatokkal kapcsolatos műveleteket,
 * mint például a történeti adatok beolvasása, hozzáadása, módosítása és
 * törlése.
 *
 * A történeti adatokat a {@link HistoryData} osztály példányai reprezentálják.
 *
 * A szolgáltatás egy {@link BehaviorSubject} példányt használ a történeti adatok
 * listájának tárolására, amelyet a {@link list$} tulajdonságban érhetünk el.
 *
 * A szolgáltatás egy másik {@link BehaviorSubject} példányt használ a kiválasztott
 * történeti adat tárolására, amelyet a {@link selected} tulajdonságban érhetünk el.
 *
 * A szolgáltatás egy {@link waitForStorage} nevű privát metódust használ a
 * tárhely létrehozására, amelyet a {@link initStorage} metódusban hívunk meg.
 */
@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  storage = inject(Storage);

  private _storage: Storage | null = null;

  private hasStorage: BehaviorSubject<boolean> = 
    new BehaviorSubject<boolean>(false);

  public list$: BehaviorSubject<HistoryData[]> = 
    new BehaviorSubject<HistoryData[]>([]);

  public selected: BehaviorSubject<HistoryData | null> = 
    new BehaviorSubject<HistoryData | null>(null);

  constructor() {
    this.initStorage();
  }

  /**
   * Inicializálja a {@link HistoryService} szolgáltatásban használt tárhelyet.
   *
   * Ez a metódus inicializálja a {@link HistoryService} szolgáltatásban
   * használt tárhelyet, és elmenti a példányosított {@link Storage} példányt a
   * {@link _storage} tulajdonságban.
   *
   * A metódus visszatérési értéke egy {@link Promise} példánya, amely a
   * tárhely létrehozásának eredményét tartalmazza.
   */
  async initStorage() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.hasStorage.next(true);
  }

  /**
   * Várja meg, amíg a tárhely létrejön.
   *
   * Ez a metódus várja meg, amíg a {@link HistoryService} szolgáltatásban
   * használt tárhely létrejön, és csak ezt követően tér vissza.
   *
   * A metódus visszatérési értéke egy {@link Promise} példánya, amely
   * a tárhely létrehozásának eredményét tartalmazza.
   */
  private waitForStorage(): Promise<boolean> {
    if (this.hasStorage.value === true) {
      return Promise.resolve(true);
    }

    return firstValueFrom(this.hasStorage.pipe(
      filter((hasStorage) => hasStorage === true),
    ));
  }

  /**
   * A történeti adatokat beolvassa a tárhelyről.
   *
   * Ez a metódus a történeti adatokat beolvassa a tárhelyről, és a
   * {@link list$} tulajdonságban érhető el.
   *
   * A metódus visszatérési értéke egy {@link Promise} példánya, amely a
   * beolvasás eredményét tartalmazza.
   *
   * @param name a tárhely kulcsa, amely alatt a történeti adatokat kell
   *             tárolni, alapértelmezetten `'machineHistory'`
   */
  async getAll(name: string = 'machineHistory'): Promise<void> {
    await this.waitForStorage();
    this._storage?.get(name).then((data) => {
      if (data) {
        this.list$.next(JSON.parse(data));
      } else {
        this.list$.next([]);
      }
    }).catch((err) => {
      console.error(err);  
    });
  }

  /**
   * A megadott történeti adatot beolvassa a tárhelyről.
   *
   * Ez a metódus a megadott történeti adatot beolvassa a tárhelyről, és a
   * {@link selected} tulajdonságban érhető el.
   *
   * A metódus visszatérési értéke egy {@link Promise} példánya, amely a
   * beolvasás eredményét tartalmazza.
   *
   * @param id a történeti adat azonosítója
   * @param name a tárhely kulcsa, amely alatt a történeti adatot kell
   *             tárolni, alapértelmezetten `'machineHistory'`
   */
  async get(id: number, name: string = 'machineHistory'): Promise<void> {
    await this.waitForStorage();
    this._storage?.get(name).then((data) => {
      if (data) {
        this.selected.next(JSON.parse(data).find(
          (d: HistoryData) => d.id === id)
        );
      } else {
        this.selected.next(null);
      }
    });
  }

  /**
   * A megadott történeti adatot hozzáadja a tárhelyen lévő listához.
   *
   * Ez a metódus a megadott történeti adatot hozzáadja a tárhelyen lévő listához,
   * majd frissíti a {@link list$} tulajdonságban lévő listát.
   *
   * A metódus visszatérési értéke egy {@link Promise} példánya, amely a
   * művelet eredményét tartalmazza.
   *
   * @param toAdd a hozzáadandó történeti adat
   * @param name a tárhely kulcsa, amely alatt a történeti adatot kell
   *             tárolni, alapértelmezetten `'machineHistory'`
   */
  async add(toAdd: HistoryData, name: string = 'machineHistory'): Promise<void> {
    await this.waitForStorage();

    const exist = this.list$.value.find(
      (d: HistoryData) => d.values['guid'] === toAdd.values['guid']
    );
    if (exist) {
      toAdd.id = exist.id;
      return await this.update(toAdd, name);
    }

    this._storage?.get(name).then( async (data) => {
      if (data) {
        const list = JSON.parse(data);
        const maxId = Math.max(...list.map((d: HistoryData) => d.id), 0);
        toAdd.id = maxId + 1;
        list.push(toAdd);
        await this._storage?.set(name, JSON.stringify(list));
        this.list$.next(list);
      } else {
        toAdd.id = 1;
        await this._storage?.set(name, JSON.stringify([toAdd]));
        this.list$.next([toAdd]);
      }
    });
  }

  /**
   * Frissíti a megadott történeti adatot a tárhelyen lévő listában.
   *
   * Ez a metódus a megadott történeti adatot frissíti a tárhelyen lévő listában,
   * majd frissíti a {@link list$} tulajdonságban lévő listát.
   *
   * A metódus visszatérési értéke egy {@link Promise} példánya, amely a
   * művelet eredményét tartalmazza.
   *
   * @param toUpdate a frissítendő történeti adat
   * @param name a tárhely kulcsa, amely alatt a történeti adatot kell
   *             tárolni, alapértelmezetten `'machineHistory'`
   */
  async update(toUpdate: HistoryData, name: string = 'machineHistory'): Promise<void> {
    await this.waitForStorage();
    this._storage?.get(name).then( async (data) => {
      if (data) {
        const list = JSON.parse(data).map(
          (d: HistoryData) => d.id === toUpdate.id ? toUpdate : d
        );
        await this._storage?.set(name, JSON.stringify(list));
        this.list$.next(list);
      }
    });
  }

  /**
   * Törli a megadott azonosítójú történeti adatot a tárhelyen lévő listából.
   *
   * Ez a metódus a megadott azonosítójú történeti adatot törli a tárhelyen lévő
   * listából, majd frissíti a {@link list$} tulajdonságban lévő listát.
   *
   * A metódus visszatérési értéke egy {@link Promise} példánya, amely a
   * művelet eredményét tartalmazza.
   *
   * @param id a törlendő történeti adat azonosítója
   * @param name a tárhely kulcsa, amely alatt a történeti adatot kell
   *             tárolni, alapértelmezetten `'machineHistory'`
   */
  async remove(id: number, name: string = 'machineHistory'): Promise<void> {
    await this.waitForStorage();
    this._storage?.get(name).then( async (data) => {
      if (data) {
        const list = JSON.parse(data).filter(
          (d: HistoryData) => d.id !== id
        );
        await this._storage?.set(name, JSON.stringify(list));
        this.list$.next(list);
      }
    });
  }
}
