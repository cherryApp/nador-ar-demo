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
  ],
  providers: [ModalController],
})
export class DeviceModalComponent  implements OnInit {

  @Input() devices: {id: string, label: string}[] = [];

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  selectDevice(device: any) {
    return this.modalCtrl.dismiss(device, 'confirm');
  }

  ngOnInit() {}

}
