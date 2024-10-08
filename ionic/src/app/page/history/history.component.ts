import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicStorageModule } from "@ionic/storage-angular";
import { HistoryService } from "src/app/service/history.service";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/angular/standalone";
import { TranslocoPipe } from "@ngneat/transloco";

/**
 * A HistoryComponent osztály egy Angular komponens, amely a felhasználó
 * korábbi méréseit jeleníti meg.
 *
 * A korábbi méréseket a {@link HistoryService} osztály biztosítja.
 */
@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.scss"],
  standalone: true,
  imports: [
    IonicStorageModule,
    CommonModule,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonList,
    IonItem,
    IonLabel,
    TranslocoPipe,
  ],
})
export class HistoryComponent implements OnInit {
  historyService = inject(HistoryService);

  list$ = this.historyService.list$;

  constructor() {}

  /**
   * A komponens inicializálásakor lefutó metódus.
   *
   * A metódus a {@link HistoryService#getAll} metódust hívja meg, hogy a
   * korábbi mérések listáját beolvassa a helyi tárolóból.
   */
  ngOnInit() {
    this.historyService.getAll();
  }
}
