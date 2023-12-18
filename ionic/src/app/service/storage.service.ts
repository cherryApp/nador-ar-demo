import { Injectable, inject } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage = inject(Storage);

  private _storage: Storage | null = null;

  constructor() {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public getValue(key: string): Promise<string> {
    return this._storage?.get(key) || Promise.resolve('');
  }

  public async getJSON(key: string): Promise<any> {
    const value = await this._storage?.get(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return null;
    }
  }
  
}