import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicStorageModule } from "@ionic/storage-angular";
import { HistoryService } from "src/app/service/history.service";
import { HistoryData } from "src/app/model/history-data";
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

  ngOnInit() {
    this.historyService.getAll();
  }
}
