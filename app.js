import html2canvas from 'html2canvas';
import './styles.sass';


html2canvas(document.querySelector("#capture")).then(canvas => {
  
  const preloader = document.querySelector('.preloader');

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

  const imgGauntlet = document.querySelector('img');

  
  
  newData.forEach( (imagedata, i) => {
    let clonedCanvas = canvas.cloneNode();
    clonedCanvas.style.transition = 'all 1.5s ease-in-out';
    document.body.appendChild(clonedCanvas);
    clonedCanvas.getContext('2d').putImageData(imagedata, 0, 0);
  });

  setTimeout(() => {
    preloader.classList.add('has-been-loaded');
  }, 1500);

  
  imgGauntlet.addEventListener('click', function() {
    const canvases = document.querySelectorAll('canvas');

    const audio = document.querySelector('audio');
    audio.play();

    canvases.forEach((el) => {
      setTimeout(() => {
        let angle = (Math.random() - 0.5) * 2 * Math.PI;
        el.style.transform = 'translate('+ 60 * Math.cos(angle) +'px, '+ 60 * Math.sin(angle) +'px)'; 
        el.style.opacity = '0'; 
      });
    });
  });

});