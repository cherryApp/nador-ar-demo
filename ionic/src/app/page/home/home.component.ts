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
import { HistoryService } from "src/app/service/history.service";
import { HistoryData } from "src/app/model/history-data";

/**
 * QR kód olvasását segítő könyvtár.
 */
declare var jsQR: any;

/**
 * Ez a komponens a kezd lapot jeleníti meg.
 *
 * Ez a komponens a kezd lapot jeleníti meg. A lapon egy QR-kódolvasó
 * található, amely a kamerát használja a QR-kódok beolvasásához.
 *
 * A QR-kódokat a {@link lastKnownQRData} tulajdonságban tárolja, és ha
 * új QR-kódot olvas be, akkor az új adatokat tárolja el a tulajdonságban.
 *
 * Ha a felhasználó a QR-kódolvasóban megnyitja a kamerát, akkor a
 * {@link isModalOpen} tulajdonság igazságértékét állítja true-ra. Ha a
 * felhasználó bezárja a kamerát, akkor a {@link isModalOpen} tulajdonság
 * igazságértékét állítja false-ra.
 *
 * A komponensben a {@link HistoryService} szolgáltatás is használható, amely a
 * történeti adatok kezeléséért felelős.
 *
 * A komponensben a {@link MenuService} szolgáltatás is használható, amely a
 * menü kezeléséért felelős.
 *
 * A komponensben a {@link ModalController} szolgáltatás is használható, amely a
 * modál ablakok kezeléséért felelős.
 */
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

  historyService = inject(HistoryService);

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

  /**
   * Egy modal ablakot nyit meg, amelyben a felhasználó a kamerát válthatja.
   *
   * A metódus a {@link ModalController} osztályt használja.
   */
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

  /**
   * A videó méretét állítja be a tartalmazó eleme alapján.
   *
   * A metódus a {@link videoContainer} és a {@link video} tulajdonságokat
   * használja. A {@link videoContainer} tulajdonságban a videó tartalmazó
   * eleme található, a {@link video} tulajdonságban pedig a videó eleme
   * található.
   *
   * A metódus a videó méretét a tartalmazó elem méretéhez igazítja, és a
   * videót a tartalmazó elem közepére helyezi.
   *
   * A metódus a {@link AfterViewInit} életciklus eseményben hívódik meg.
   */
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

  /**
   * A kamerát elindítja.
   *
   * A metódus a {@link MediaDevices.getUserMedia} metódust használja a
   * kamera elindításához. A metódus visszatérési értéke egy
   * {@link Promise} példánya, amely a kamera elindításának eredményét
   * tartalmazza.
   *
   * @param deviceId a kamera azonosítója
   */
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

  /**
   * Lekéri a kamera aktuális képét.
   *
   * A metódus létrehoz egy új {@link HTMLCanvasElement} objektumot, amelynek
   * szélessége és magassága megegyezik a kamera szélességével és
   * magasságával. A metódus ezután a kamera aktuális képét átmásolja a
   * {@link HTMLCanvasElement} objektumba, és a {@link image$} tulajdonságban
   * érhet el.
   *
   * A metódus visszatérési értéke egy {@link Promise} példánya, amely a
   * kép letöltésének eredményét tartalmazza.
   */
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

  /**
   * Megnyitja a MachineModalComponent komponenst.
   *
   * Ez a metódus a MachineModalComponent komponenst nyitja meg, amelyben
   * a felhasználó a méréshez tartozó gépet választhatja ki. A metódus a
   * MachineModalComponent komponenst a ModalController osztállyal nyitja meg,
   * és a gép nevét és azonosítóját adja át a komponensnek.
   *
   * A metódus visszatérési értéke egy Promise példánya, amely a modal ablak
   * bezárásának eredményét tartalmazza.
   */
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: MachineModalComponent,
      componentProps: {
        name: this.lastKnownQRData?.["name"],
        guid: this.lastKnownQRData?.["guid"],
      }
    });
    modal.present();

    this.historyService.add({ 
      ...new HistoryData(),
      values: this.lastKnownQRData || {},
    });

    const { data, role } = await modal.onWillDismiss();

    this.lastKnownQRData = null;

    if (role === 'confirm') {
      // this.message = `Hello, ${data}!`;
    }
  }

  /**
   * Megnyitja a DeviceModalComponent komponenst.
   *
   * Ez a metódus a DeviceModalComponent komponenst nyitja meg, amelyben
   * a felhasználó a méréshez tartozó eszközöket választhatja ki.
   *
   * A metódus visszatérési értéke a DeviceModalComponent értéke egy Promise.
   */
  async openDeviceModal() {
    const modal = await this.modalCtrl.create({
      component: DeviceModalComponent,
      componentProps: {
        devices: await this.getDevices(),
      }
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    
    if (data?.deviceId) {
      this.startCamera(data?.deviceId);
    }
  }

  ngOnDestroy(): void {
    this.stopSubscriptions.next(true);
  }
}
