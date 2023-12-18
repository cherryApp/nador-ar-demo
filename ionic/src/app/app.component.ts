import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
} from 'ionicons/icons';

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
    IonMenuButton,
  ],
  providers: [
    TranslocoService,
    TranslocoPipe,
  ]
})
export class AppComponent {

  router = inject(Router);

  translocoService = inject(TranslocoService);

  public appPages = [
    { title: 'Home', url: '/', icon: 'home' },
    // { title: 'Mérőegységek', url: '/device', icon: 'briefcase' },
    { title: 'Gépek', url: '/history', icon: 'bar-chart' },
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
    });
  }

  get title(): string {
    // console.log( history.state );
    const title = history.state?.title;
    if (title && title !== 'Home') {
      return this.translocoService.translate('title');
      // return title;
    }
    return 'NadorMF';
  }
}
