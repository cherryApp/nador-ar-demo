import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonRow } from '@ionic/angular/standalone';
import { TranslocoPipe } from '@ngneat/transloco';
import { addIcons } from 'ionicons';
import { cameraReverseOutline, qrCode, map } from 'ionicons/icons';

/**
 * A WelcomeComponent egy Angular osztály, amely a kezd lapon elhelyezett
 * tartalmat jeleníti meg.
 *
 * Ez a komponens a kezdőlap alapértelmezett komponense.
 */
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    TranslocoPipe,
    RouterModule,
  ],
})
export class WelcomeComponent  implements OnInit {

  /**
   * A WelcomeComponent konstruktora, amely beállítja az ikonokat.
   *
   * Ez a konstruktor a kezdőlapon használt ikonokat állítja be.
   */
  constructor() {
    addIcons({
      cameraReverseOutline,
      qrCode,
      map,
    });
  }

  ngOnInit() {}

}
