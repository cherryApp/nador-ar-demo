import { AsyncPipe, SlicePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonContent,
  IonItem,
  IonList,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  barChartOutline,
  barChartSharp,
  briefcaseOutline,
  briefcaseSharp,
} from 'ionicons/icons';
import { DeviceService } from 'src/app/service/device.service';

/**
 * A DeviceComponent osztály a mérések listázásáért felelős.
 * 
 * Ez a komponens a kezdőlapon elhelyezett tartalmat jeleníti meg.
 * 
 * @example
 * <app-device></app-device>
 * 
 * @see https://ionicframework.com/docs
 * @see https://angular.io/docs
 */
@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    AsyncPipe,
    SlicePipe,
  ],
  providers: [
    DeviceService,
  ],
})
export class DeviceComponent implements OnInit {

  deviceService = inject(DeviceService);

  /**
   * A devices$ változó a készülékek listáját tartalmazza.
   *
   * Ez a változó a {@link DeviceService} osztályban definiált
   * {@link DeviceService.getAll} metódus eredményét tartalmazza.
   */
  devices$ = this.deviceService.getAll();

  /**
   * A DeviceComponent példányosításáért felelős konstruktor.
   * 
   * Ebben a konstruktorban kerülnek beállításra a mérések listázásához
   * szükséges ikonok.
   */
  constructor() {
    addIcons({
      barChartOutline,
      barChartSharp,
      briefcaseOutline,
      briefcaseSharp,
    });
  }

  ngOnInit() {}
}
