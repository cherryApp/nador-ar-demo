const REFRESH_INTERVAL = 1000;
let lastCodeData = '';
const sheet = document.querySelector('#data-sheet');

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
    const txt = `Code: ${code.data}\n\nName: cartoon packager\n\nWeight: 2350kg\n\nWidth: 3000mm\n\nName: cartoon packager\n\nWeight: 2350kg\n\nWidth: 3000mm`;
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
    const markerRotation = marker.object3D.rotation;

    // const box = document.querySelector('#data-box');
    // if (box) {
    //   box.setAttribute('rotation', {
    //     x: markerRotation.x * 3,
    //     y: markerRotation.y * 3,
    //     z: markerRotation.z * 3,
    //   });
    //   console.log( box.getAttribute('rotation') );

    //   box.setAttribute('position', markerPosition);
    // }

    
    if (sheet) {
      if (lastCodeData) {
        sheet.querySelector('pre').innerHTML = lastCodeData;
        if (!sheet.classList.contains('show')) {
          sheet.classList.add('show');
        }
      }
      // let text = sheet.getAttribute('text');
      // if (lastCodeData) {
      //   console.log(lastCodeData)
      //   text.value = lastCodeData;
      //   sheet.setAttribute('text', text);
      //   sheet.setAttribute('position', markerPosition);
      // }
      

      // this.el.setAttribute("animation", {
      //   property: 'position',
      //   from: `${sheetPosition.x} ${sheetPosition.y} ${sheetPosition.z}`,
      //   to: `${markerPosition.x} ${markerPosition.y} ${markerPosition.z}`,
      //   dur: "1000",
      //   easing: 'linear',
      // })
      // sheet.play()
    }
  }

});