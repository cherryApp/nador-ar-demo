import { Component, OnInit } from '@angular/core';

/**
 * A LoginComponent osztály egy Angular osztály, amely a bejelentkezési oldalt
 * jeleníti meg.
 *
 * Ez a komponens a kezd lapon egy külön lapon jelenik meg, és a bejelentkezési
 * felületet jeleníti meg.
 *
 * A LoginComponentnek nincsenek input paraméterei, és nincsenek output
 * eseményei sem.
 *
 * A LoginComponent a kezd lapon való megjelenítéséhez szükséges stílusokat
 * a `login.component.scss` fájlban határozza meg.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
})
export class LoginComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
