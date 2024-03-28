import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonRow } from '@ionic/angular/standalone';
import { TranslocoPipe } from '@ngneat/transloco';
import { addIcons } from 'ionicons';
import { cameraReverseOutline, qrCode, map } from 'ionicons/icons';

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

  constructor() {
    addIcons({
      cameraReverseOutline,
      qrCode,
      map,
    });
  }

  ngOnInit() {}

}
