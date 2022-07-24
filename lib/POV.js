const dog = document.getElementById("dog");
function pov(idxFinger) {
  let x = idxFinger.x * FRAME_WIDTH;
  let divider = FRAME_WIDTH / 12;
  let mok = Math.ceil(x / divider);
  if (mok > 0 && mok < 13) {
    dog.src = "img/dog/" + mok + ".png";
  }
}
