const sunglasses = new Image();
sunglasses.src = "img/sun.png";
const chain = new Image();
chain.src = "img/chain.png";
const hat = new Image();
hat.src = "img/snapback.png";

function facefilter(results) {
  if (results.multiFaceLandmarks) {
    if (results.multiFaceLandmarks[0]) {
      console.log(results.multiFaceLandmarks[0][46].z, sunglasses.width * 0.4);
      // let img = new Image();
      // img.src =
      //   "https://github.com/njpietrow/Filter.io/blob/main/assets/nose.png?raw=true";
      // // console.log(results.multiFaceLandmarks[0][1].x);
      // let z_coord = results.multiFaceLandmarks[0][1].z;
      // if (z_coord < 0) {
      //   z_coord *= -1;
      // } else {
      //   z_coord = 1 / z_coord;
      // }

      // console.log(z_coord);
      // canvasCtx.drawImage(
      //   img,
      //   // the reason why add '1-' is because flipped camera
      //   (1 - results.multiFaceLandmarks[0][1].x) * canvasElement.width,
      //   results.multiFaceLandmarks[0][1].y * canvasElement.height,
      //   img.width * z_coord * 5,
      //   img.height * z_coord * 5
      // );
      canvasCtx.drawImage(
        sunglasses,
        (1 - results.multiFaceLandmarks[0][46].x) * canvasElement.width - 210,
        results.multiFaceLandmarks[0][46].y * canvasElement.height,
        sunglasses.width * 0.4,
        sunglasses.height * 0.4
      );
      canvasCtx.drawImage(
        chain,
        (1 - results.multiFaceLandmarks[0][46].x) * canvasElement.width,
        results.multiFaceLandmarks[0][46].y * canvasElement.height
      );
      canvasCtx.drawImage(
        hat,
        (1 - results.multiFaceLandmarks[0][150].x) * canvasElement.width,
        results.multiFaceLandmarks[0][150].y * canvasElement.height
      );
    }
  }
}
