class Qr {
  constructor(readerID = 'divQrReader', inputID = 'inputQrReader') {
    this.readerID = readerID;
    this.inputID = inputID;

    this.html5QrCode = new Html5Qrcode(/* element id */ readerID);
    this.fileinput = document.querySelector(`#${inputID}`);

    this.scanScreenButton = document.querySelector('#scanScreen');

    this.init();
  }

  init() {
    // File based scanning
    this.fileinput.addEventListener('change', e => {
      if (e.target.files.length == 0) {
        // No file selected, ignore 
        return;
      }

      // Use the first item in the list
      const imageFile = e.target.files[0];
      this.html5QrCode.scanFile(imageFile, /* showImage= */true)
        .then(qrCodeMessage => {
          // success, use qrCodeMessage
          console.log(qrCodeMessage);
        })
        .catch(err => {
          // failure, handle it.
          console.log(`Error scanning file. Reason: ${err}`)
        });
    });

    this.scanScreenButton.addEventListener('click', this.getWindowPicture);
  }

  getWindowPicture() {
    const screenshotTarget = document.body;

    html2canvas(screenshotTarget).then((canvas) => {
      const base64image = canvas.toDataURL("image/png");
      window.location.href = base64image;
    });
  }
}

const qrReader = new Qr();



