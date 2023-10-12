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

    this.scanScreenButton.addEventListener('click', this.getWindowPicture.bind(this));
  }

  processBlob(blob) {
    // const imageFile = createImageBitmap(blob);
    const imageFile = new File([blob], "name");

    this.html5QrCode.scanFile(imageFile, /* showImage= */false)
      .then(qrCodeMessage => {
        // success, use qrCodeMessage
        console.log(qrCodeMessage);
      })
      .catch(err => {
        // failure, handle it.
        console.log(`Error scanning file. Reason: ${err}`)
      });
  }

  getWindowPicture() {
    const screenshotTarget = document.body;

    html2canvas(screenshotTarget).then((canvas) => {
      canvas.toBlob(blob => {
        const imageFile = new File([blob], "name");

        this.html5QrCode.scanFile(imageFile, /* showImage= */false)
          .then(qrCodeMessage => {
            // success, use qrCodeMessage
            console.log(qrCodeMessage);
          })
          .catch(err => {
            // failure, handle it.
            console.log(`Error scanning file. Reason: ${err}`)
          });
      });
      // const base64image = canvas.toDataURL("image/png");
      // const base64image = canvas.toBlob()
      // createImageBitmap(base64image)
      // window.location.href = base64image;
    });
  }
}

const qrReader = new Qr();



