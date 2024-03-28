import { Component, OnInit } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapMarker } from '@angular/google-maps';
import { IonContent, IonGrid, IonRow } from '@ionic/angular/standalone';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [
    GoogleMapsModule,
    GoogleMap,
    MapMarker,
    IonContent,
    IonGrid,
    IonRow,
  ],
})
export class MapComponent  implements OnInit {

  mapOptions = {
    center: { lat: 47.09274595263446, lng: 17.904808187997900 },
  };

  constructor() { }

  ngOnInit() {
    this.addMarker();
  }

  center: google.maps.LatLngLiteral = { lat: 47.09274595263446, lng: 17.904808187997400};
  zoom = 4;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  addMarker() {
    this.markerPositions.push(this.center);
  }

}
