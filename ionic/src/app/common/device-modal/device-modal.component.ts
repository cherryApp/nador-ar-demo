import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import {
  IonAvatar,
  IonContent,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonModal,
  ModalController,
  IonHeader,
  IonToolbar,
  IonButton,
  IonButtons,
  IonTitle,
} from "@ionic/angular/standalone";
import { TranslocoPipe } from "@ngneat/transloco";

/**
 * A DeviceModalComponent komponens egy módosító ablakot jelenít meg, amelyben a
 * felhasználó választhat az elérhető eszközök közül.
 *
 * @example
 * <app-device-modal [devices]="devices"></app-device-modal>
 *
 * @see https://ionicframework.com/docs
 * @see https://angular.io/docs
 */
@Component({
  selector: 'app-device-modal',
  templateUrl: './device-modal.component.html',
  styleUrls: ['./device-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonAvatar,
    IonContent,
    IonImg,
    IonItem,
    IonLabel,
    IonList,
    IonSearchbar,
    IonModal,
    IonHeader,
    IonToolbar,
    IonButton,
    IonButtons,
    IonTitle,
    TranslocoPipe,
  ],
  providers: [ModalController],
})
export class DeviceModalComponent  implements OnInit {

  @Input() devices: {id: string, label: string}[] = [];

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  /**
   * A selectDevice metódus a felhasználó által kiválasztott eszközt
   * adja vissza a komponens szülőjének.
   *
   * @param device A kiválasztott eszköz adatai.
   * @returns A felhasználó által kiválasztott eszköz adatai.
   */
  selectDevice(device: any) {
    return this.modalCtrl.dismiss(device, 'confirm');
  }

  ngOnInit() {}

}
