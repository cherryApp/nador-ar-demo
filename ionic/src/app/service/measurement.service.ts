import { Injectable } from '@angular/core';
import { Measurement } from '../model/measurement';
import { BaseService } from './base.service';
import { Observable, of } from 'rxjs';

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
