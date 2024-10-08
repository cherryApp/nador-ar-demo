import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * Az alapértelmezett szolgáltatás osztálya, amely az alapvető műveleteket
 * biztosítja a modell osztályokhoz.
 *
 * A szolgáltatás a {@link HttpClient} osztályt használja a kérések
 * elküldéséhez.
 *
 * A szolgáltatásban megvalósított műveletek:
 * - {@link getAll}, amely visszaadja az összes entitás listáját.
 *
 * A szolgáltatásban használt tulajdonságok:
 * - {@link url}, amely a szolgáltatás által használt url-t adja vissza.
 */
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
