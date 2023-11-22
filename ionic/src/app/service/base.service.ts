import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends {id?: number}> {

  http = inject(HttpClient);

  apiUrl = environment.apiUrl;

  entityName = '';

  get url() {
    return `${this.apiUrl}${this.entityName}`;
  }

  constructor() { }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url);
  }
}
