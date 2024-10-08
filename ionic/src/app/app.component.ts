import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injectable, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, ActivatedRoute, RouterState } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonButton,
} from '@ionic/angular/standalone';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  homeSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  heartOutline,
  heartSharp,
  archiveOutline,
  archiveSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  bookmarkOutline,
  bookmarkSharp,
  logInOutline,
  logInSharp,
  personOutline,
  personSharp,
  barChartOutline,
  barChartSharp,
  briefcaseOutline,
  briefcaseSharp,
  cameraReverseOutline,
  mapOutline,
  mapSharp,
  qrCodeOutline,
  qrCodeSharp,
} from 'ionicons/icons';
import { Subject } from 'rxjs';

/**
 * A MenuService osztály a men űkhöz kapcsolatos szolgáltatásokat nyújtja.
 *
 * Ez az osztály egy Subject-et biztosít az eszköz modal megjelenítéséhez.
 * A {@link openDeviceModal} mezőn át lehet értesíteni a menüt arról, hogy
 * meg kell nyitni az eszköz modalját.
 *
 * @see https://ionicframework.com/docs
 * @see https://angular.io/docs
 */
@Injectable({ providedIn: 'root' })
export class MenuService {
  public openDeviceModal: Subject<boolean> = new Subject<boolean>();
}

/**
 * Az alkalmazás fő  komponense.
 *
 * Ez a komponens tartalmazza az alkalmazás fő részeit, mint például a menüt,
 * a címsort, és a tartalmi részt. A komponens a {@link MenuService} osztályt
 * használja a menükhöz kapcsolatos szolgáltatásokhoz.
 *
 * @see https://ionicframework.com/docs
 * @see https://angular.io/docs
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonMenuButton,
    TranslocoPipe,
  ],
  providers: [
    TranslocoService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  router = inject(Router);

  translocoService = inject(TranslocoService);

  menuService = inject(MenuService);

  lastTitle = 'app_title';

  /**
   * A menüpontokat tartalmazó tömb.
   *
   * Ez a változó tartalmazza az alkalmazás menüpontjait. Minden objektum
   * tartalmazza a menüpont címét, URL-jét, és ikonját.
   */
  public appPages = [
    { title: 'pages.home.title', url: '/', icon: 'home' },
    { title: 'pages.qr.title', url: '/qr', icon: 'qr-code' },
    // { title: 'Mérőegységek', url: '/device', icon: 'briefcase' },
    { title: 'pages.history.title', url: '/history', icon: 'bar-chart' },
    { title: 'pages.map.title', url: '/map', icon: 'map' },
    // { title: 'Profil', url: '/profile', icon: 'person' },
    // { title: 'Belépés', url: '/login', icon: 'log-in' },
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor() {
    addIcons({
      mailOutline,
      mailSharp,
      paperPlaneOutline,
      paperPlaneSharp,
      heartOutline,
      heartSharp,
      archiveOutline,
      archiveSharp,
      trashOutline,
      trashSharp,
      warningOutline,
      warningSharp,
      bookmarkOutline,
      bookmarkSharp,
      homeOutline,
      homeSharp,
      logInOutline,
      logInSharp,
      personOutline,
      personSharp,
      barChartOutline,
      barChartSharp,
      briefcaseOutline,
      briefcaseSharp,
      cameraReverseOutline,
      mapOutline,
      mapSharp,
      qrCodeOutline,
      qrCodeSharp,
    });
  }

  /**
   * Egy metódus, ami megnyitja a DeviceModalComponent-et.
   * 
   * Ezzel a metódussal a DeviceModalComponent-et nyithatjuk meg, amelyben
   * a felhasználó a méréshez tartozó eszközöket választhatja ki.
   * 
   * A metódus nem tér vissza semmilyen értékkel, csak megnyitja a modal-t.
   */
  openDeviceModal() {
    this.menuService.openDeviceModal.next(true);
  }

  /**
   * Egy property, ami a jelenlegi oldal címét adja vissza.
   * A címek fordítását a `transloco` könyvtár végzi.
   * A `history.state`-ből veszi a címeket, ha az nincs megadva, akkor a
   * korábban megadott címeket használja.
   * 
   * @returns A jelenlegi oldal címe.
   */
  get title(): string {
    const title = history.state?.title || this.lastTitle;

    this.lastTitle = title;
    return this.translocoService.translate(title);
  }
}
