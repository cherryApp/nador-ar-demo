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
 * @description
 * A MachinModelCompoent komponens a m űszaki adatokat tartalmazó modális ablakot
 * jeleníti meg.
 *
 * @example
 * <app-machine-modal [name]="machine.name" [guid]="machine.guid"></app-machine-modal>
 *
 * @see https://ionicframework.com/docs
 * @see https://angular.io/docs
 */
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
    TranslocoPipe,
  ],
  providers: [ModalController],
})
export class MachineModalComponent implements OnInit {

  @Input() name: string = '';

  @Input() guid: string = '';

  constructor(private modalCtrl: ModalController) {}

  /**
   * A cancel() metódus bezárja a modális ablakot.
   *
   * A metódus a ModalController-ben definiált dismiss() metódust hívja meg, 
   * melynek els  argumentuma a null érték, a második argumentuma pedig a 'cancel' 
   * sztring. A metódus a komponensben nincs használva, de a használata 
   * ajánlott, mivel a modális ablak lezárására emiatt nincs szükség a 
   * modalController.dismiss() metódus meghívására.
   */
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  /**
   * A confirm() metódus bezárja a modális ablakot és visszatér a gép nevével.
   *
   * A metódus a ModalController-ben definiált dismiss() metódust hívja meg, 
   * melynek els  argumentuma a gép neve, a második argumentuma pedig a 'confirm' 
   * sztring.
   */
  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

  ngOnInit() {}
}
