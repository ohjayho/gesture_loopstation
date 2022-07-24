window.onload = function () {
  const canvas1 = document.getElementById("canvas1");
  const canvas2 = document.getElementById("canvas2");
  canvas1.width = window.innerWidth;
  canvas1.height = window.innerHeight;
  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight;
  const ctx1 = canvas1.getContext("2d");
  const ctx2 = canvas2.getContext("2d");

  const analyser = Howler.ctx.createAnalyser();
  Howler.masterGain.connect(analyser);
  analyser.fftSize = 8192;

  const bufferLength = analyser.frequencyBinCount;

  const dataArray = new Uint8Array(bufferLength);
  console.log("DATA-ARRAY: ", dataArray);

  const WIDTH = canvas1.width;
  const HEIGHT = canvas1.height;
  console.log("WIDTH: ", WIDTH, "HEIGHT: ", HEIGHT);

  const barWidth = (WIDTH / bufferLength) * 13;
  console.log("BARWIDTH: ", barWidth);

  console.log("TOTAL WIDTH: ", 117 * 10 + 118 * barWidth);

  let barHeight;
  let x = 0;

  function renderFrame() {
    requestAnimationFrame(renderFrame);
    x = 0;

    analyser.getByteFrequencyData(dataArray);

    ctx1.fillStyle = "rgba(0,0,0,0.2)";
    ctx1.fillRect(0, 0, WIDTH, HEIGHT);
    ctx2.fillStyle = "rgba(0,0,0,0.2)";
    ctx2.fillRect(0, 0, WIDTH, HEIGHT);

    let r, g, b;
    let bars = 118;

    for (let i = 0; i < bars; i++) {
      barHeight = dataArray[i] * 2.5;

      if (dataArray[i] > 210) {
        // pink
        r = 250;
        g = 0;
        b = 255;
      } else if (dataArray[i] > 200) {
        // yellow
        r = 250;
        g = 255;
        b = 0;
      } else if (dataArray[i] > 190) {
        // yellow/green
        r = 204;
        g = 255;
        b = 0;
      } else if (dataArray[i] > 180) {
        // blue/green
        r = 0;
        g = 219;
        b = 131;
      } else {
        // light blue
        r = 0;
        g = 199;
        b = 255;
      }

      ctx1.fillStyle = `rgb(${r},${g},${b})`;
      ctx1.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
      ctx2.fillStyle = `rgb(${r},${g},${b})`;
      ctx2.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 10;
    }
  }
  renderFrame();
};
