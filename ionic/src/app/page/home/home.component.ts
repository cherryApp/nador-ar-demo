import {
  Component,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  inject,
} from "@angular/core";
import {
  IonContent,
  ModalController,
} from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { cameraReverseOutline} from 'ionicons/icons';
import { TranslocoPipe } from "@ngneat/transloco";
import { Subject, interval, takeUntil } from "rxjs";
import { DeviceModalComponent } from "src/app/common/device-modal/device-modal.component";
import { MachineModalComponent } from "src/app/common/machine-modal/machine-modal.component";
import { isMobile } from "src/app/common/utils";
import { IonButton, IonIcon } from "@ionic/angular/standalone";
import { MenuService } from "src/app/app.component";

declare var jsQR: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  standalone: true,
  imports: [
    IonContent,
    TranslocoPipe,
    IonButton,
    IonIcon,
  ],
  providers: [
    ModalController,
  ],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  modalCtrl = inject(ModalController);

  menuService = inject(MenuService);

  @ViewChild("video") video!: ElementRef<HTMLVideoElement>;

  @ViewChild("videoContainer") videoContainer!: ElementRef<HTMLDivElement>;

  stopSubscriptions: Subject<boolean> = new Subject<boolean>();

  lastKnownQRData: { [key: string]: any } | null = null;

  isModalOpen: boolean = false;

  constructor() {
    addIcons({
      cameraReverseOutline,
    });
  }

  async canDismiss(data?: any, role?: string): Promise<boolean> {
    return role !== 'gesture';
  }

  ngOnInit() {
    interval(500)
      .pipe(takeUntil(this.stopSubscriptions))
      .subscribe(() => {
        this.setVideoSize();
        this.getImage();
      });

    this.menuService.openDeviceModal.subscribe(() => {
      this.openDeviceModal();
    });
  }

  ngAfterViewInit(): void {
    this.startCamera('');
  }

  setVideoSize(): void {
    if (!this.videoContainer || !this.video) {
      return;
    }

    const containerWidth = this.videoContainer.nativeElement.offsetWidth;
    const containerHeight = this.videoContainer.nativeElement.offsetHeight;
    const videoWidth = this.video.nativeElement.offsetWidth;
    const videoHeight = this.video.nativeElement.offsetHeight;

    const left = (containerWidth - videoWidth) / 2;
    const top = (containerHeight - videoHeight) / 2;

    const portrait = containerHeight > containerWidth;

    if (portrait) {
      this.video.nativeElement.style.height = containerHeight + "px";
      this.video.nativeElement.style.left = left + "px";
    } else {
      this.video.nativeElement.style.width = containerWidth + "px";
      this.video.nativeElement.style.top = top + "px";
    }

    if (isMobile()) {
      this.video.nativeElement.style.width = "100%";
      this.video.nativeElement.style.left = "0px";
      return;
    }

  }

  async getDevices(): Promise<MediaDeviceInfo[]> {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter( (device) => device.kind === "videoinput" );
  }

  async startCamera(deviceId: string): Promise<void> {
    // validate video element
    if (navigator.mediaDevices.getUserMedia) {
      const devices = await this.getDevices();

      console.log(devices[0].label);


      navigator.mediaDevices
        .getUserMedia({video: {
          deviceId: deviceId || devices[0].deviceId,
        }})
        .then((stream) => {
          this.video.nativeElement.srcObject = stream;
        })
        .catch(function (error) {
          console.log("Something went wrong!");
          console.log(error);
        });
    }
  }

  async getImage(): Promise<void> {
    if (!this.video) {
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = this.video.nativeElement.clientWidth;
    canvas.height = this.video.nativeElement.clientHeight;

    let ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    ctx.drawImage(this.video.nativeElement, 0, 0, canvas.width, canvas.height);

    if (canvas.width === 0 || canvas.height === 0) {
      return;
    }

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });

    if (code && code.data) {
      code = JSON.parse(code.data);

      if (code.guid === this.lastKnownQRData?.["guid"]) {
        return;
      }

      this.lastKnownQRData = code;

      await this.openModal();
    }
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: MachineModalComponent,
      componentProps: {
        name: this.lastKnownQRData?.["name"],
        guid: this.lastKnownQRData?.["guid"],
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    this.lastKnownQRData = null;

    if (role === 'confirm') {
      // this.message = `Hello, ${data}!`;
    }
  }

  async openDeviceModal() {
    const modal = await this.modalCtrl.create({
      component: DeviceModalComponent,
      componentProps: {
        devices: await this.getDevices(),
      }
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    
    this.startCamera(data?.deviceId);
  }

  ngOnDestroy(): void {
    this.stopSubscriptions.next(true);
  }
}
