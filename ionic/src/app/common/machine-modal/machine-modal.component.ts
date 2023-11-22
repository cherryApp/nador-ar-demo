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
  selector: "app-machine-modal",
  templateUrl: "./machine-modal.component.html",
  styleUrls: ["./machine-modal.component.scss"],
  standalone: true,
  imports: [
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
export class MachineModalComponent implements OnInit {
  @Input() name: string = '';

  @Input() guid: string = '';

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

  ngOnInit() {}
}
