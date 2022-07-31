const videoElement = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasCtx = canvasElement.getContext("2d");
const btns = document.getElementsByClassName("btn");
const btn_container = document.querySelector(".btn_container");

//Gestures are from each javascript.
const knownGestures = [
  fist,
  rockNRollDescription,
  thumbsUpDescription,
  victoryDescription
];
const GE = new fp.GestureEstimator(knownGestures);

for (i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    console.log("helo");
  });
}

//gesture recognition (function in colorHands)
function gestureControl(landmarks) {
  let flandmark = landmarks.map((landmark) => [
    landmark.x,
    landmark.y,
    landmark.z
  ]);
  est = GE.estimate(flandmark, 9.5);
  //console.log(est);
  if (est["gestures"].length > 0) {
    // when the gesture is recognized,
    gesture = est["gestures"][0].name;
    console.log(gesture);
    if (gesture == "rock_n_roll") {
      facefilter(face);
    }
    // if (selected_samples.length > 0) {
    // when selected sample is existed
    if (gesture == "fist") {
      // for (i = 0; i < selected_samples.length; i++) {
      //   samples[selected_samples[i]].mute(true);
      // }
      sound1.mute(true);
      sound2.mute(true);
      sound3.mute(true);
      sound4.mute(true);
    } else if (gesture == "victory") {
      // if (samples[selected_samples[0]].mute()) {
      // the seletecd sample is already muted, unmute
      // for (let i = 0; i < selected_samples.length; i++) {
      //   samples[selected_samples[i]].mute(false);
      // }
      // unmute, and empty the queue
      // selected_samples = [];
      sound1.mute(false);
      sound2.mute(false);
      sound3.mute(false);
      sound4.mute(false);
      // }
    }
    // }
  }
}

function colorHands(results) {
  //Color Left Hand, Right Hand
  if (results.multiHandLandmarks && results.multiHandedness) {
    for (let index = 0; index < results.multiHandLandmarks.length; index++) {
      const classification = results.multiHandedness[index];
      const isRighthand = classification.label === "Right";
      const landmarks = results.multiHandLandmarks[index];
      gestureControl(landmarks);
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

// get hands landmarks
function gotHands(results) {
  //console.log(results);
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );
  canvasCtx.restore();
  colorHands(results);

  if (results.multiHandLandmarks[0]) {
    clickBtn(results.multiHandLandmarks[0][8]);
    pov(results.multiHandLandmarks[0][8]);
  }
}

//get Face landmarks
let face = "";
function gotFace(results) {
  face = results;
  // facefilter(results);
}

const Z_PRESS = -90;

function clickBtn(coords) {
  let FRAME_WIDTH = parseFloat(output_canvas.style.width);
  let FRAME_HEIGHT = parseFloat(output_canvas.style.height);
  let margin = parseInt(window.getComputedStyle(btns[0]).marginLeft);
  let marginUp =
    left_top.getBoundingClientRect().y -
    btn_container.getBoundingClientRect().y;
  // console.log("마진", margin, "마진업", marginUp);
  let btn_coords = {
    left_top: { x: margin, y: marginUp },
    right_top: { x: FRAME_WIDTH - margin - left_top.offsetWidth, y: marginUp },
    left_bottom: { x: margin, y: FRAME_HEIGHT / 2 + marginUp },
    right_bottom: {
      x: FRAME_WIDTH - margin - left_top.offsetWidth,
      y: FRAME_HEIGHT / 2 + marginUp
    }
  };
  // the range of x,y,z is 0 to 1. so each one is multiplied by frame length
  let x = coords.x * FRAME_WIDTH;
  let y = coords.y * FRAME_HEIGHT;
  let z = coords.z * FRAME_WIDTH;
  // console.log(btn_coords["right_bottom"]);
  console.log("x:", x, "y:", y, "z:", z);
  // console.log(FRAME_HEIGHT, FRAME_WIDTH);
  // console.log("width:", btns[0].offsetWidth, "height:", btns[0].offsetHeight);
  // the way of iterating dictionary array.
  for (let [key, value] of Object.entries(btn_coords)) {
    if (
      value.x <= x &&
      x <= value.x + btns[0].offsetWidth &&
      value.y <= y &&
      y <= value.y + btns[0].offsetHeight
    ) {
      // btns[key].focus();
      if (z < Z_PRESS) {
        // btns[key].focus();
        btns[key].classList.add("clicked");
      } else {
        //fires when button releases
        if (btns[key].classList.contains("clicked")) {
          btns[key].classList.remove("clicked");
          if (samples[key].mute()) {
            // when it's not plyaing
            samples[key].mute(false);
          } else {
            // when it's playing
            // selected_samples.push(key);
            samples[key].mute(true);
            // muteQue(key);
          }
        }
      }
    }
  }
}

// Hands settings
const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  }
});
hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.8,
  minTrackingConfidence: 0.5,
  selfieMode: true
});
hands.onResults(gotHands);

// Face settings
const faceMesh = new FaceMesh({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
  }
});
faceMesh.setOptions({
  maxNumFaces: 1,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
faceMesh.onResults(gotFace);

// get information from camera images (landmarks)
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement }),
      await faceMesh.send({ image: videoElement });
  },
  width: 1920,
  height: 1280
});

camera.start();
