let main = document.getElementsByClassName("main")[0];
let video_container = document.querySelector(".video_container");
let output_canvas = document.querySelector(".output_canvas");

//initializer
main.style.height = (1707 * main.offsetWidth) / 3840 + "px";
video_container.style.height = main.offsetHeight * 0.5 + "px";
video_container.style.width = main.offsetWidth * 0.58 + "px";
output_canvas.style.height = main.offsetHeight * 0.5 + "px";
output_canvas.style.width = main.offsetWidth * 0.58 + "px";

//addeventListener
window.addEventListener("resize", function () {
  main.style.height = (1707 * main.offsetWidth) / 3840 + "px";
  video_container.style.height = main.offsetHeight * 0.5 + "px";
  video_container.style.width = main.offsetWidth * 0.58 + "px";
  camera.h.height = video_container.style.height + "px";
  camera.h.width = video_container.style.width + "px";

  output_canvas.style.height = main.offsetHeight * 0.5 + "px";
  output_canvas.style.width = main.offsetWidth * 0.58 + "px";
});
function s() {
  console.log("width", main.offsetWidth);
  console.log("height", main.offsetHeight);
}
// setInterval(s, 1000); //debugging
