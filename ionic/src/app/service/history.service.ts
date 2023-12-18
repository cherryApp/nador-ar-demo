import { Injectable, inject } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { HistoryData } from "../model/history-data";
import { BehaviorSubject, filter, firstValueFrom } from "rxjs";

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

  async initStorage() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.hasStorage.next(true);
  }

  private waitForStorage(): Promise<boolean> {
    if (this.hasStorage.value === true) {
      return Promise.resolve(true);
    }

    return firstValueFrom(this.hasStorage.pipe(
      filter((hasStorage) => hasStorage === true),
    ));
  }

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
