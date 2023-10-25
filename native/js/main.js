const getImage = () => {

  const video = document.querySelector('video#arjs-video');
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
    const sheet = document.querySelector('#data-sheet');
    sheet.setAttribute('value', txt);
  }
};

setInterval( getImage, 1000 );