import { Component, OnInit } from '@angular/core';

/**
 * A ProfileComponent egy Angular osztály, amely a felhasználói profil oldalt
 * jeleníti meg.
 *
 * Ez a komponens a kezd lapon egy külön lapon jelenik meg, és a felhasználói
 * adatokat jeleníti meg.
 *
 * A ProfileComponentnek nincsenek input paraméterei, és nincsenek output
 * eseményei sem.
 *
 * A ProfileComponent a kezd lapon való megjelenítéséhez szükséges stílusokat
 * a `profile.component.scss` fájlban határozza meg.
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
})
export class ProfileComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
