let left_top = document.querySelector("#left_top");
let left_bottom = document.querySelector("#left_bottom");
let right_top = document.querySelector("#right_top");
let right_bottom = document.querySelector("#right_bottom");

let selected_samples = [];

let sound1 = new Howl({
  src: ["music/Bass.wav"],
  loop: true,
  mute: true
});
let sound2 = new Howl({
  src: ["music/Piano.wav"],
  loop: true,
  mute: true
});
let sound3 = new Howl({
  src: ["music/Drum.wav"],
  loop: true,
  mute: true
});

let sound4 = new Howl({
  src: ["music/Vocal.wav"],
  loop: true,
  mute: true
});

sound1.play();
sound2.play();
sound3.play();
sound4.play();

const samples = {
  left_top: sound1,
  left_bottom: sound2,
  right_top: sound3,
  right_bottom: sound4
};

let startBtn = 0;
let startMusic;
let q = []; // queue for waiting samples. it's used when first sample is playing.

function rotateImg() {
  sound1.on("play", function () {
    if (!sound1.mute()) {
      left_top.style.animation = "rotate 2s linear infinite";
    }
  });
  sound2.on("play", function () {
    if (!sound2.mute()) {
      left_bottom.style.animation = "rotate 2s linear infinite";
    }
  });
  sound3.on("play", function () {
    if (!sound3.mute()) {
      right_top.style.animation = "rotate 2s linear infinite";
    }
  });
  sound4.on("play", function () {
    if (!sound4.mute()) {
      right_bottom.style.animation = "rotate 2s linear infinite";
    }
  });
  sound1.on("mute", function () {
    left_top.style.animation = "";
  });
  sound2.on("mute", function () {
    left_bottom.style.animation = "";
  });
  sound3.on("mute", function () {
    right_top.style.animation = "";
  });
  sound4.on("mute", function () {
    right_bottom.style.animation = "";
  });
  sound1.on("stop", function () {
    left_top.style.animation = "";
  });
  sound2.on("stop", function () {
    left_bottom.style.animation = "";
  });
  sound3.on("stop", function () {
    right_top.style.animation = "";
  });
  sound4.on("stop", function () {
    right_bottom.style.animation = "";
  });
}
rotateImg();
// sound1.on("play", allQPlay);
// sound2.on("play", allQPlay);
// sound3.on("play", allQPlay);

// function allQPlay() {
//   // play all samples of the queue
//   // to prevent delay, this should be independent function.
//   // don't make function in Howler's 'on' method.
//   console.log("bravo");
//   if (q) {
//     for (i = 0; i < q.length; i++) {
//       q[i].play();
//     }
//     q = [];
//   }
// }

// // when button is pressed, each sample will be played or added to queue
// function playOrQue(key) {
//   if (!startBtn) {
//     // none of samples is playing.
//     startBtn = 1;
//     startMusic = samples[key];
//     samples[key].play();
//     samples[key].on("end", function () {
//       samples[key].play();
//     });
//   } else {
//     // if one sample is playing,
//     if (q.indexOf(samples[key]) == -1) {
//       // to prevent add same song again.
//       q.push(samples[key]);
//     }
//   }
// }

// function muteQue(key) {
//   console.log(key, samples[key]);
//   if (selected_samples.indexOf(key) > -1) {
//     // if it's playing, and already selected, deselect (make it out of the queue)
//     if (!samples[key].mute()) {
//       // it's hard to replay the song that is muted and is out of the queue,
//       // so only remove the songs that's not muted.
//       let index = selected_samples.indexOf(key);
//       console.log("index", index);
//       // sound 변수로는 같은 howl 객체라 구분이 안되니까 key를 넣어줘야한다.
//       selected_samples.splice(index, 1);
//     }
//   } else {
//     // if it's playing and not selected yet, insert it inside the queue
//     selected_samples.push(key);
//   }
// }
