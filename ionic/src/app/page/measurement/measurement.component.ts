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

/**
 * A MeasurementComponent osztály a mérések listázásáért felelős.
 *
 * Ez a komponens a kezdőlapon elhelyezett tartalmat jeleníti meg.
 * 
 */
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

  /**
   * A MeasurementComponent osztály konstruktora.
   *
   * Ez a metódus a MeasurementComponent osztály példányosításakor kerül
   * meghívásra. A metódusban a használt ikonok kerülnek regisztrálásra.
   */
  constructor() {
    addIcons({
      listCircle,
      listCircleOutline,
      listCircleSharp,
      homeOutline,
      homeSharp,
    });
  }

  /**
   * Egy mérési adatban szereplő  kulcsokat adja vissza.
   *
   * Ez a metódus a mérési adatban szereplő  kulcsokat adja vissza. A kulcsok
   * azok a nevek, amelyekkel a mérési adatban szerepl  értékek azonosíthatók.
   *
   * @param values a mérési adat, amelynek a kulcsait vissza kell adni.
   * @returns a mérési adatban szereplő  kulcsok.
   */
  getValueKeys(values: { [key: string]: number }) {
    return Object.keys(values);
  }

  /**
   * Egy mérési adatban szerepl  kulcsokat adja vissza.
   *
   * Ez a metódus a mérési adatban szerepl  kulcsokat adja vissza. A kulcsok
   * azok a nevek, amelyekkel a mérési adatban szerepl  értékek azonosíthatók.
   *
   * @example
   * const values = {
   *   temperature: 25,
   *   humidity: 50
   * };
   * const keys = this.getValueKeys(values);
   * console.log(keys); // ['temperature', 'humidity']
   *
   * @param values a mérési adat, amelynek a kulcsait vissza kell adni.
   * @returns a mérési adatban szerepl  kulcsok.
   */
  ngOnInit() {
    console.log(this.measurements$);
  }

}
