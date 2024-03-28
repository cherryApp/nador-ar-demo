import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

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
