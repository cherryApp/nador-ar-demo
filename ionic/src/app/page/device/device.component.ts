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

  devices$ = this.deviceService.getAll();

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
