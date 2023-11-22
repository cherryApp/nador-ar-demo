import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Device } from '../model/device';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService extends BaseService<Device> {

  constructor() {
    super();
    this.entityName = 'devices';
  }

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
