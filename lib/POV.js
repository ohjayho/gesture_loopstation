const dog = document.getElementById("dog");
function pov(idxFinger) {
  let width = output_canvas.offsetWidth;
  let x = idxFinger.x * width;
  let divider = width / 12;
  let mok = Math.ceil(x / divider);
  if (mok > 0 && mok < 13) {
    dog.src = "img/dog/" + mok + ".png";
  }
}
