import html2canvas from 'html2canvas';
import './styles.sass';


html2canvas(document.querySelector("#capture")).then(canvas => {
  // document.body.appendChild(canvas);
  
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext('2d');

  const imgData = ctx.getImageData(0, 0, width, height);
  const newData = [];

  for(let i = 0; i < 36; i++) {
    newData.push(ctx.createImageData(width, height));
  }

  for(let f = 0; f < width; f++) {
    for(let k = 0; k < height; k++) {
      for(let l = 0; l < 2; l++) {
        let n = 4*(k * width + f);
        let m = Math.floor(36 * Math.random());
        for(let p = 0; p < 4; p++) {
          newData[m].data[n + p] = imgData.data[n + p];
        }
      }
    }
  }

  newData.forEach( (imagedata, i) => {
    let clonedCanvas = canvas.cloneNode();

    clonedCanvas.style.transition = 'all 1.5s ease-in-out';

    setTimeout(() => {
      let angle = (Math.random() - 0.5) * 2 * Math.PI;
      clonedCanvas.style.transform = 'translate('+ 60 * Math.cos(angle) +'px, '+ 60 * Math.sin(angle) +'px)'; 
      clonedCanvas.style.opacity = '0'; 
    });



    document.body.appendChild(clonedCanvas);
    clonedCanvas.getContext('2d').putImageData(imagedata, 0, 0);
  });
});