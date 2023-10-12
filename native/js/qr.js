class Qr {
  constructor(readerID = 'divQrReader') {
    this.readerID = readerID;

    this.html5QrCode = new Html5Qrcode(/* element id */ readerID);
  }

  getQrCode() {
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
    });
  }
}
