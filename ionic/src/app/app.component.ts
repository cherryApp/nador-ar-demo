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
} from 'ionicons/icons';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {
  public openDeviceModal: Subject<boolean> = new Subject<boolean>();
}

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

  public appPages = [
    { title: 'pages.home.title', url: '/', icon: 'home' },
    // { title: 'Mérőegységek', url: '/device', icon: 'briefcase' },
    { title: 'pages.history.title', url: '/history', icon: 'bar-chart' },
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
    });
  }

  openDeviceModal() {
    this.menuService.openDeviceModal.next(true);
  }

  get title(): string {
    const title = history.state?.title;
    console.log(history.state)
    return this.translocoService.translate(title || 'app_title');
  }
}
