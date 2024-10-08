import { Injectable } from '@angular/core';
import { Measurement } from '../model/measurement';
import { BaseService } from './base.service';
import { Observable, of } from 'rxjs';

/**
 * Az mérési adatokkal foglalkoz  szolgáltatás.
 *
 * Ez a szolgáltatás a {@link BaseService} osztályt bővíti, és a mérési adatokat kezeli.
 *
 * @example
 * // Az összes mérési adat lekérdezése
 * this.measurementService.getAll().subscribe(measurements => {
 *   console.log(measurements);
 * });
 *
 * @example
 * // Egy mérési adat lekérdezése
 * this.measurementService.get(1).subscribe(measurement => {
 *   console.log(measurement);
 * });
 *
 * @example
 * // Egy mérési adat módosítása
 * const measurement: Measurement = {
 *   id: 1,
 *   location: 'Location 1',
 *   device: 'Device 1',
 *   user: 'User 1',
 *   time: '2020-01-01 10:00:00',
 *   arrived: '2020-01-01 10:10:00',
 *   values: {
 *     temperature: 25,
 *     humidity: 50
 *   }
 * };
 * this.measurementService.update(measurement).subscribe(() => {
 *   console.log('M d s t sa sikeres volt!');
 * });
 *
 * @example
 * // Egy mérési adat hozz ad sa
 * const measurement: Measurement = {
 *   location: 'Location 1',
 *   device: 'Device 1',
 *   user: 'User 1',
 *   time: '2020-01-01 10:00:00',
 *   arrived: '2020-01-01 10:10:00',
 *   values: {
 *     temperature: 25,
 *     humidity: 50
 *   }
 * };
 * this.measurementService.create(measurement).subscribe(() => {
 *   console.log('Hozz ad sa sikeres volt!');
 * });
 *
 * @example
 * // Egy mérési adat törlése
 * this.measurementService.delete(1).subscribe(() => {
 *   console.log('T r l s sikeres volt!');
 * });
 */
@Injectable({
  providedIn: 'root'
})
export class MeasurementService extends BaseService<Measurement> {

  constructor() {
    super();
  }

  override getAll(): Observable<Measurement[]> {
      return of([
        {
          id: 1,
          location: 'Location 1',
          device: 'Device 1',
          user: 'User 1',
          time: 'Time 1',
          arrived: 'Arrived 1',
          values: {
            'Value 1': 1,
            'Value 2': 2,
            'Value 3': 3,
            'Value 4': 4,
            'Value 5': 5,
            'Value 6': 6,
            'Value 7': 7,
            'Value 8': 8,
            'Value 9': 9,
            'Value 10': 10,
          },
        },
        {
          id: 2,
          location: 'Location 2',
          device: 'Device 2',
          user: 'User 2',
          time: 'Time 2',
          arrived: 'Arrived 2',
          values: {
            'Value 1': 1,
            'Value 2': 2,
            'Value 3': 3,
            'Value 4': 4,
            'Value 5': 5,
            'Value 6': 6,
            'Value 7': 7,
            'Value 8': 8,
            'Value 9': 9,
            'Value 10': 10,
          },
        },
        {
          id: 3,
          location: 'Location 3',
          device: 'Device 3',
          user: 'User 3',
          time: 'Time 3',
          arrived: 'Arrived 3',
          values: {
            'Value 1': 1,
            'Value 2': 2,
            'Value 3': 3,
            'Value 4': 4,
            'Value 5': 5,
            'Value 6': 6,
            'Value 7': 7,
            'Value 8': 8,
            'Value 9': 9,
            'Value 10': 10,
          },
        }
      ])
  }
}
