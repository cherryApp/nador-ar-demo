import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Device } from '../model/device';
import { Observable, of } from 'rxjs';

/**
 * A DeviceService osztály felel s a készülékek kezeléséért.
 *
 * Ez az osztály a {@link BaseService} osztályt bővíti, és a készülékek
 * kezeléséhez szükséges metódusokat szolgáltatja.
 *
 * @example
 * // A készülékek listázása
 * this.deviceService.getAll().subscribe(devices => {
 *   console.log(devices);
 * });
 *
 * @example
 * // A kiválasztott készülék lekérdezése
 * this.deviceService.get(1).subscribe(device => {
 *   console.log(device);
 * });
 *
 * @example
 * // A kiválasztott készülék módosítása
 * const device: Device = {
 *   id: 1,
 *   name: 'Device 1',
 *   code: 'D1',
 *   active: true,
 *   company: 'Company 1'
 * };
 * this.deviceService.update(device).subscribe(() => {
 *   console.log('A m d s t sa sikeres volt!');
 * });
 *
 * @example
 * // A kiválasztott készülék hozzáadása
 * const device: Device = {
 *   name: 'Device 9',
 *   code: 'D9',
 *   active: true,
 *   company: 'Company 9'
 * };
 * this.deviceService.create(device).subscribe(() => {
 *   console.log('A hozzáadás sikeres volt!');
 * });
 */
@Injectable({
  providedIn: 'root'
})
export class DeviceService extends BaseService<Device> {

  constructor() {
    super();
    this.entityName = 'devices';
  }

  /**
   * Visszaadja az összes készülék listáját.
   *
   * <p>FIGYELEM! Ez a metódus csak a tesztelés során van használatban, a
   * production környezetben más megoldást kell használni!</p>
   */
  override getAll(): Observable<Device[]> {
    return of(
      [
        { id: 1, name: 'Device 1', code: 'D1', active: true, company: 'Company 1' },
        { id: 2, name: 'Device 2', code: 'D2', active: false, company: 'Company 2' },
        { id: 3, name: 'Device 3', code: 'D3', active: true, company: 'Company 3' },
        { id: 4, name: 'Device 4', code: 'D4', active: true, company: 'Company 4' },
        { id: 5, name: 'Device 5', code: 'D5', active: false, company: 'Company 5' },
        { id: 6, name: 'Device 6', code: 'D6', active: true, company: 'Company 6' },
        { id: 7, name: 'Device 7', code: 'D7', active: true, company: 'Company 7' },
        { id: 8, name: 'Device 8', code: 'D8', active: true, company: 'Company 8' },
        { id: 9, name: 'Device 9', code: 'D9', active: true, company: 'Company 9' },

      ]);
  }
}
