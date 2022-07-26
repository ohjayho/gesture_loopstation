const videoElement = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasCtx = canvasElement.getContext("2d");
const btns = document.getElementsByClassName("btn");

var sound1 = new Howl({
  src: ["music/stilldre.mp3"],
  loop: true,
  preload: true
});
var sound2 = new Howl({ src: ["music/5.wav"], loop: true, preload: true });
var sound3 = new Howl({ src: ["music/3.wav"], loop: true, preload: true });

const samples = { left_top: sound1, left_bottom: sound2, right_bottom: sound3 };

//Gestures are from each javascript.
const knownGestures = [
  fist,
  rockNRollDescription,
  thumbsUpDescription,
  victoryDescription
];
const GE = new fp.GestureEstimator(knownGestures);
let selected_samples = [];

for (i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    console.log("helo");
  });
}

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
    // gesture가 인식 되었을 때,
    gesture = est["gestures"][0].name;
    console.log(gesture);
    if (gesture == "rock_n_roll") {
      facefilter(face);
    }
    if (selected_samples.length > 0) {
      // 선택된 샘플이 존재할 때면,
      if (gesture == "fist") {
        console.log("mute");
        if (!samples[selected_samples[0]].mute()) {
          // 뮤트하지 않은 상태라면 뮤트해준다.
          for (i = 0; i < selected_samples.length; i++) {
            samples[selected_samples[i]].mute(true);
          }
        }
      } else if (gesture == "thumbs_up") {
        if (samples[selected_samples[0]].mute()) {
          // 이미 선택된게 뮤트되었다면 뮤트 해제
          for (let i = 0; i < selected_samples.length; i++) {
            samples[selected_samples[i]].mute(false);
          }
          // 뮤트 해제 후 대기열 비워주기
          selected_samples = [];
        }
      }
    }
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
  facefilter(results);
}

function clickBtn(coords) {
  // the range of x,y,z is 0 to 1. so each one is multiplied by frame length
  let x = coords.x * FRAME_WIDTH;
  let y = coords.y * FRAME_HEIGHT;
  let z = coords.z * FRAME_WIDTH;
  // the way of iterating dictionary array.
  for (let [key, value] of Object.entries(btn_coords)) {
    if (
      value.x <= x &&
      x <= value.x + BTN_WIDTH &&
      value.y <= y &&
      y <= value.y + BTN_HEIGHT &&
      z < Z_PRESS
    ) {
      btns[key].focus();
      btns[key].classList.add("clicked");
    } else {
      //fires when button releases
      if (btns[key].classList.contains("clicked")) {
        btns[key].classList.remove("clicked");
        if (!samples[key].playing()) {
          // when it's not plyaing
          playOrQue(key);
        } else {
          // when it's playing
          muteQue(key);
        }
      }
    }
  }
}

let startBtn = 0;
let startMusic = 0;
let q = []; // queue for waiting samples. it's used when first sample is playing.

function allQPlay() {
  // play all samples of the queue
  // to prevent delay, this should be independent function.
  // don't make function in Howler's 'on' method.
  for (i = 0; i < q.length; i++) {
    q[i].play();
  }
  q = [];
}

// when button is pressed, each sample will be played or added to queue
function playOrQue(key) {
  if (!startBtn) {
    // none of samples is playing.
    startBtn = 1;
    samples[key].on("play", allQPlay);
    samples[key].play();
  } else {
    // if one sample is playing,
    if (q.indexOf(samples[key]) == -1) {
      // to prevent add same song again.
      q.push(samples[key]);
    }
  }
}

function muteQue(key) {
  console.log(key, samples[key]);
  if (selected_samples.indexOf(key) > -1) {
    // 재생중이고, 이미 선택된 샘플이라면 선택을 해제한다. (큐에서 뺀다)
    if (!samples[key].mute()) {
      // 뮤트 된 상태로 큐에서 빼버리면 다시 재생하기 어려우니
      // 뮤트되지 않은것만 해제해준다.
      let index = selected_samples.indexOf(key);
      console.log("index", index);
      // sound 변수로는 같은 howl 객체라 구분이 안되니까 key를 넣어줘야한다.
      selected_samples.splice(index, 1);
    }
  } else {
    // 재생중이지만, 선택되지 않은 샘플이라면, 선택된 샘플 대기열에 넣어준다.
    selected_samples.push(key);
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
  minDetectionConfidence: 0.5,
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
