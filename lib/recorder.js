/*
this script should be labeled as Module
because Howler could be loaded slow? maybe?
*/
// var sound4 = new Howl({
//   src: ["music/4.mp3"],
//   loop: true,
//   preload: true

// });
var recorder;
const stop = document.getElementsByClassName("stop");
const record = document.getElementsByClassName("record");
let mediaDest = Howler.ctx.createMediaStreamDestination();
// Howler.masterGain.connect(mediaDest);

//마스터게인은 너무 말단인데....
function onRecordingReady(e) {
  // 'e' has 'blob event'
  //var audio = document.getElementById("audio");
  audioBlob = e.data; // e.data has blob.
  //audio.src = URL.createObjectURL(e.data);
}

let audioBlob;
let audioURL = "";

navigator.mediaDevices
  .getUserMedia({
    audio: true
  })
  .then((stream) => {
    let userMic = Howler.ctx.createMediaStreamSource(stream);
    // userMic.connect(mediaDest);
    // Howler.masterGain.connect(mediaDest);
    recorder = new MediaRecorder(mediaDest.stream);
    recorder.addEventListener("dataavailable", onRecordingReady);
    recorder.addEventListener("stop", function () {
      W3Module.convertWebmToMP3(audioBlob).then((mp3blob) => {
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(mp3blob);
        downloadLink.setAttribute("download", "audio");
        //downloadLink.click();
        var audio = document.getElementById("audio");
        audio.src = URL.createObjectURL(mp3blob);
        console.log(mp3blob);
      });
    });
  });

record[0].addEventListener("click", function () {
  recorder.start();
});

stop[0].addEventListener("click", function () {
  recorder.stop();
});
