const fist = new fp.GestureDescription("fist");
for (let finger of [
  fp.Finger.Thumb,
  fp.Finger.Index,
  fp.Finger.Middle,
  fp.Finger.Ring,
  fp.Finger.Pinky
]) {
  fist.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  fist.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
}
