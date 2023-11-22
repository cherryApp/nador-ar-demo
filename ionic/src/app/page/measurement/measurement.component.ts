import { Component, OnInit, inject } from '@angular/core';
import { MeasurementService } from 'src/app/service/measurement.service';
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
import { AsyncPipe } from '@angular/common';

import { addIcons } from 'ionicons';
import {
  listCircle,
  listCircleOutline,
  listCircleSharp,
  homeOutline,
  homeSharp,
} from 'ionicons/icons';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.scss'],
  standalone: true,
  imports: [
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
    AsyncPipe,
  ],
  providers: [MeasurementService],
})
export class MeasurementComponent implements OnInit {

  measurementService = inject(MeasurementService);

  measurements$ = this.measurementService.getAll();

  constructor() {
    addIcons({
      listCircle,
      listCircleOutline,
      listCircleSharp,
      homeOutline,
      homeSharp,
    });
  }

  getValueKeys(values: { [key: string]: number }) {
    return Object.keys(values);
  }

  ngOnInit() {
    console.log(this.measurements$);
  }

}
