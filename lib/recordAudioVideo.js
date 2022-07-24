let audio = document.getElementById("audio");
const stop = document.getElementsByClassName("stop");
const record = document.getElementsByClassName("record");
let mediaDest = Howler.ctx.createMediaStreamDestination();
Howler.masterGain.connect(mediaDest);
let recorder;
let blob = [];
let videoStream;

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  videoStream = stream;
  let video = stream.getTracks()[0];
  mediaDest.stream.addTrack(video);
  recorder = new MediaRecorder(mediaDest.stream, { mimeType: "video/webm" });

  recorder.addEventListener("dataavailable", function (e) {
    blob.push(e.data);
  });
  recorder.addEventListener("stop", function () {
    let video_local = URL.createObjectURL(
      new Blob(blob, { type: "video/webm" })
    );
    let a = document.createElement("a");
    a.href = video_local;
    a.setAttribute("download", "video");
    a.click();
  });
});

record[0].addEventListener("click", function () {
  recorder.start();
  // audio.srcObject = videoStream; // debugging
  audio.play();
});

stop[0].addEventListener("click", function () {
  recorder.stop();
});
