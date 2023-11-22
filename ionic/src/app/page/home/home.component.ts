import {
  Component,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from "@angular/core";
import { Subject, interval, takeUntil } from "rxjs";

declare var jsQR: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("video") video!: ElementRef<HTMLVideoElement>;

  @ViewChild("videoContainer") videoContainer!: ElementRef<HTMLDivElement>;

  stopSubscriptions: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  ngOnInit() {
    interval(500).pipe(
      takeUntil(this.stopSubscriptions),
    ).subscribe(() => {
      this.setVideoSize();
      this.getImage();
    });
  }

  ngAfterViewInit(): void {
    this.startCamera();
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
  }

  startCamera(): void {
    // validate video element
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          this.video.nativeElement.srcObject = stream;
        })
        .catch(function (error) {
          console.log("Something went wrong!");
        });
    }
  }

  async getImage(): Promise<void> {

    if (!this.video) {
      return;
    }
  
    const canvas = document.createElement('canvas');
  
    canvas.width = this.video.nativeElement.clientWidth;
    canvas.height = this.video.nativeElement.clientHeight;
  
    let ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    ctx.drawImage(this.video.nativeElement, 0, 0, canvas.width, canvas.height);
  
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });
  
    
    if (code && code.data) {
      console.log(code)
      console.log(code.data)
    }
  };

  ngOnDestroy(): void {
    this.stopSubscriptions.next(true);
  }
}
