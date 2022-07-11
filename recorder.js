var recorder;

const stop = document.getElementsByClassName("stop");
const record = document.getElementsByClassName("record");

function onRecordingReady(e) {
  var audio = document.getElementById("audio");
  audio.src = URL.createObjectURL(e.data);
  chunk.push(e);
}

let mediaDest = Howler.ctx.createMediaStreamDestination();
Howler.masterGain.connect(mediaDest);

let chunk = [];
let audioURL = "";

navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
  let userMic = Howler.ctx.createMediaStreamSource(stream);
  userMic.connect(mediaDest);
  // recorder = new MediaRecorder(mediaDest.stream, {
  //   mimeType: "audio/webm;codecs=opus"
  // });
  // recorder.addEventListener("dataavailable", onRecordingReady);
  // recorder.addEventListener("stop", function () {
  //   const blob = new Blob(chunk, { type: "audio/webm" });
  //   chunk = [];
  //   audioURL = window.URL.createObjectURL(blob);
  //   const downloadLink = document.createElement("a");
  //   downloadLink.href = audioURL;
  //   downloadLink.setAttribute("download", "audio");
  //   downloadLink.click();
  // });
});

record[0].addEventListener("click", function () {
  recorder.start();
});

stop[0].addEventListener("click", function () {
  recorder.stop();
});
