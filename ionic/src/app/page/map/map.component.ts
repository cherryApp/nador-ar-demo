import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapMarker, MapAdvancedMarker, MapInfoWindow } from '@angular/google-maps';
import { IonContent, IonGrid, IonRow } from '@ionic/angular/standalone';

export interface IPoi {
  poi: google.maps.LatLngLiteral;
  title: string;
  id: string;
  img: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [
    GoogleMapsModule,
    GoogleMap,
    MapMarker,
    MapAdvancedMarker,
    MapInfoWindow,
    IonContent,
    IonGrid,
    IonRow,
  ],
})
export class MapComponent implements OnInit {

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  mapOptions = {
    center: { lat: 47.09274595263446, lng: 17.904808187997900 },
    zoom: 7,
  };

  infoTitle = '';

  infoID = '';

  infoImg = '';

  getMarker(settings: any, googleMap: any) {
    return new google.maps.Marker({
      position: new google.maps.LatLng(settings.latitude, settings.longitude),
      map: googleMap,
      visible: true,
      icon: {
        url: settings.icon,
        strokeColor: settings.markerColor,
        fillColor: settings.markerColor,
        fillOpacity: 1.0,
        scale: 3
      },
    });
  }

  getIcon() {
    return {
      url: '/assets/svg/cog.svg',
      scaledSize: { width: 30, height: 30, equals: () => true },
      fillColor: 'red',
      strokeColor: 'red',
    };
  }

  setInfoContent(point: IPoi) {
    this.infoTitle = point.title;
    this.infoID = point.id;
    this.infoImg = point.img;
  }

  pois: IPoi[] = [
    {
      poi: { lat: 47.09274595263446, lng: 17.904808187997400 },
      title: 'Nádor gép',
      id: '3344332nador',
      img: '/assets/img/machine-001.jpg',
    },
    { 
      poi: { lat: 46.89660094535991, lng: 19.66919601800715 },
      title: 'GAMF gép',
      id: '3344333nador',
      img: '/assets/img/machine-003.jpg',
    },
  ];

  constructor() { }

  ngOnInit() {
    this.addMarkers();
  }


  center: google.maps.LatLngLiteral = { lat: 47.09274595263446, lng: 17.904808187997400 };
  zoom = 2;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: '/assets/svg/cog.svg',
      scaledSize: { width: 30, height: 30, equals: () => true },
      fillColor: 'red',
      strokeColor: 'red',
    },
  };
  markerPositions: google.maps.LatLngLiteral[] = [];

  addMarkers() {
    this.markerPositions.push(this.center);
  }

  openInfoWindow(marker: MapMarker, point: IPoi) {
    this.setInfoContent(point);
    this.infoWindow.open(marker);
  }

}
