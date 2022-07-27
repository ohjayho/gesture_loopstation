let left_top = document.querySelector("#left_top");
let left_bottom = document.querySelector("#left_bottom");
let right_top = document.querySelector("#right_top");
let right_bottom = document.querySelector("#right_bottom");

let selected_samples = [];

let sound1 = new Howl({
  src: ["music/stilldre.mp3"],
  loop: true,
  preload: true
});
let sound2 = new Howl({ src: ["music/5.wav"], loop: true, preload: true });
let sound3 = new Howl({ src: ["music/3.wav"], loop: true, preload: true });

const samples = { left_top: sound1, left_bottom: sound2, right_bottom: sound3 };

let startBtn = 0;
let startMusic;
let q = []; // queue for waiting samples. it's used when first sample is playing.

rotateImg();

function rotateImg() {
  sound1.on("play", function () {
    if (!sound1.mute()) {
      left_top.style.animation = "rotate 4s linear infinite";
    }
  });
  sound2.on("play", function () {
    if (!sound2.mute()) {
      left_bottom.style.animation = "rotate 4s linear infinite";
    }
  });
  sound3.on("play", function () {
    if (!sound3.mute()) {
      right_bottom.style.animation = "rotate 4s linear infinite";
    }
  });
  sound1.on("mute", function () {
    left_top.style.animation = "";
  });
  sound2.on("mute", function () {
    left_bottom.style.animation = "";
  });
  sound3.on("mute", function () {
    right_bottom.style.animation = "";
  });
  sound1.on("stop", function () {
    left_top.style.animation = "";
  });
  sound2.on("stop", function () {
    left_bottom.style.animation = "";
  });
  sound3.on("stop", function () {
    right_bottom.style.animation = "";
  });
}

sound1.on("play", allQPlay);
sound2.on("play", allQPlay);
sound3.on("play", allQPlay);

function allQPlay() {
  // play all samples of the queue
  // to prevent delay, this should be independent function.
  // don't make function in Howler's 'on' method.
  console.log("bravo");
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
    startMusic = samples[key];
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
