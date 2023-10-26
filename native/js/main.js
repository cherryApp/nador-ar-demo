const REFRESH_INTERVAL = 1000;
let lastCodeData = '';

const getImage = () => {

  const video = document.querySelector('video#arjs-video');

  if (!video) {
    return;
  }

  const canvas = document.createElement('canvas');

  canvas.width = video.clientWidth;
  canvas.height = video.clientHeight;

  let ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var code = jsQR(imageData.data, imageData.width, imageData.height, {
    inversionAttempts: "dontInvert",
  });

  if (code && code.data) {
    const txt = `Code: ${code.data}\nName: cartoon packager`;
    lastCodeData = txt;
  }
};

setInterval( getImage, REFRESH_INTERVAL );

AFRAME.registerComponent('code-check', {
  lastTick: 0,
  tick: function() {
    const currentTick = new Date().getTime();
    if (currentTick - this.lastTick < REFRESH_INTERVAL) {
      return;
    }

    this.lastTick = currentTick;

    this.checkMarker();
  },
  checkMarker: function() {
    const marker = document.querySelector('a-marker[markerhandler]');
    if (!marker) {
      return;
    }

    const markerPosition = new THREE.Vector3();
    marker.object3D.getWorldPosition(markerPosition);

    const sheet = document.querySelector('#data-sheet');
    if (sheet) {
      let text = sheet.getAttribute('text');
      if (lastCodeData) {
        text.value = lastCodeData;
        sheet.setAttribute('text', text);
      }

      const sheetPosition = new THREE.Vector3();
      sheet.object3D.getWorldPosition(sheetPosition);

      // this.el.setAttribute("animation", {
      //   property: 'position',
      //   from: `${sheetPosition.x} ${sheetPosition.y} ${sheetPosition.z}`,
      //   to: `${markerPosition.x} ${markerPosition.y} ${markerPosition.z}`,
      //   dur: "1000",
      //   easing: 'linear',
      // })
      sheet.setAttribute('position', markerPosition);
      // sheet.play()
    }
  }

});