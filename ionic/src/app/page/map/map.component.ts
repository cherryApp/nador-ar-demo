import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [
    GoogleMapsModule,
  ],
})
export class MapComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
