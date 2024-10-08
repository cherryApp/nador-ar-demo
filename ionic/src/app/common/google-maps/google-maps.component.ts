import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

/**
 * Ez a komponens a Google Maps térképét jeleníti meg.
 *
 * A komponens a Google Maps API-t használja a térkép megjelenítéséhez.
 *
 * @example
 * A komponens használata a sablonban:
 * <app-google-maps></app-google-maps>
 *
 * @example
 * A komponens használata a modulban:
 * import { GoogleMapsModule } from './google-maps/google-maps.module';
 *
 * @module GoogleMapsComponent
 */
@Component({
  selector: 'app-google-maps',
  standalone: true,
  imports: [
    GoogleMapsModule,
    GoogleMapsComponent,
  ],
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  

}
