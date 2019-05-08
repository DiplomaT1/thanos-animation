import html2canvas from 'html2canvas';
import './styles.sass';


html2canvas(document.querySelector("#capture")).then(canvas => {
  // document.body.appendChild(canvas);
  
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext('2d');

  const imgData = ctx.getImageData(0, 0, width, height);

  const newData = [];

  for(let i=0; i<36; i++) {
    newData.push(ctx.createImageData(width, height));
  }

  // for(let f = 0; f < width; f++) {
  //   for(let k = 0; k < width; k++) {
  //     // console.log('test');
  //   }
  // }

  newData.forEach( imagedata => {
    let clonedCanvas = canvas.cloneNode();
    document.body.appendChild(clonedCanvas);
    clonedCanvas.getContext('2d').putImageData(imagedata, 0, 0);
    // console.log(imagedata);
  });
  // console.log(newData);
});