import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent  implements OnInit, AfterViewInit {

  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  
  @ViewChild('videoContainer') videoContainer!: ElementRef<HTMLDivElement>;

  constructor() {}

  ngOnInit() {
    setInterval(() => {
      this.setVideoSize();
    }, 500);
  }

  ngAfterViewInit(): void {
    this.startCamera();
  }

  setVideoSize(): void{
    if (!this.videoContainer || !this.video) {
      return;
    }

    const containerWidth = this.videoContainer.nativeElement.offsetWidth;
    const containerHeight = this.videoContainer.nativeElement.offsetHeight;
    const videoWidth = this.video.nativeElement.offsetWidth
    const videoHeight = this.video.nativeElement.offsetHeight;

    const left = (containerWidth - videoWidth) / 2;
    const top = (containerHeight - videoHeight) / 2;

    const portrait = containerHeight > containerWidth;

    if (portrait) {
      this.video.nativeElement.style.height = containerHeight + 'px';
      this.video.nativeElement.style.left = left + 'px';
    } else {
      this.video.nativeElement.style.width = containerWidth + 'px';
      this.video.nativeElement.style.top = top + 'px';
    }

  }

  startCamera(): void{

    // validate video element
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                this.video.nativeElement.srcObject = stream;
            })
            .catch(function(error) {
                console.log("Something went wrong!");
            });
    }
};

}
