const videoElement = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasCtx = canvasElement.getContext("2d");
const btns = document.getElementsByClassName("btn");
const left_top = document.getElementById("left_top");
const video_container = document.getElementsByClassName("video_container");

for (i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    console.log("helo");
  });
  btns[i].addEventListener("mouseup", function () {
    console.log("mouseup");
    console.log(btns[i]);
  });
}

btns.left_top.click();

const audio = new Audio("sample.mp3");
const Z_PRESS = -400;
const FRAME_WIDTH = 1280;
const FRAME_HEIGHT = 720;
const BTN_WIDTH = 300;
const BTN_HEIGHT = 300;

const btn_coords = {
  left_top: { x: 0, y: 0 },
  right_top: { x: 980, y: 0 },
  left_bottom: { x: 0, y: 420 },
  right_bottom: { x: 980, y: 420 }
};

function colorHands(results) {
  //Color Left Hand, Right Hand
  if (results.multiHandLandmarks && results.multiHandedness) {
    for (let index = 0; index < results.multiHandLandmarks.length; index++) {
      const classification = results.multiHandedness[index];
      const isRighthand = classification.label === "Right";
      const landmarks = results.multiHandLandmarks[index];
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
        color: isRighthand ? "#ffffff" : "#056df5",
        lineWidth: 5
      });
      drawLandmarks(canvasCtx, landmarks, {
        color: isRighthand ? "#ffffff" : "#056df5",
        fillColor: isRighthand ? "#056df5" : "#ffffff",
        lineWidth: 2
      });
    }
  }
}

//Draw Hands
function gotHands(results) {
  /*
  if (results.multiHandedness.length > 0) {
    if (results.multiHandedness[0].label === "Right") {
      if (!audio.paused) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  }
  */

  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );
  if (results.multiHandLandmarks[0]) {
    clickBtn(results.multiHandLandmarks[0][8]);
  }

  colorHands(results);

  canvasCtx.restore();
}

function clickBtn(coords) {
  // x,y,z 의 범위는 0부터 1까지 이므로 그대로 프레임의 길이를 곱하면 된다.
  let x = coords.x * FRAME_WIDTH;
  let y = coords.y * FRAME_HEIGHT;
  let z = coords.z * FRAME_WIDTH;
  // 아래 반복문은 파이썬처럼 딕셔너리를 iterate 하는 방법.
  for (let [key, value] of Object.entries(btn_coords)) {
    if (
      value.x <= x &&
      x <= value.x + BTN_WIDTH &&
      value.y <= y &&
      y <= value.y + BTN_HEIGHT &&
      z < Z_PRESS
    ) {
      //btns[key].click();
      //btns[key].focus();
      btns[key].classList.add("clicked");
      //console.log("val", value.x, value.y);
    } else {
      if (btns[key].classList.contains("clicked")) {
        btns[key].classList.remove("clicked");
        if (!audio.paused) {
          audio.pause();
        } else {
          audio.play();
        }
      }
    }
  }
  //console.log("xy", x, y, z);
}

const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  }
});
hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 0,
  minDetectionConfidence: 0.8,
  minTrackingConfidence: 0.5,
  selfieMode: true
});
hands.onResults(gotHands);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 1280,
  height: 720
});
camera.start();
