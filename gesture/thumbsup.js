// describe thumbs up gesture 👍
const thumbsUpDescription = new fp.GestureDescription("thumbs_up");

// thumb:
// - curl: none (must)
// - direction vertical up (best)
// - direction diagonal up left / right (acceptable)
thumbsUpDescription.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
thumbsUpDescription.addDirection(
  fp.Finger.Thumb,
  fp.FingerDirection.VerticalUp,
  1.0
);

// all other fingers:
// - curled (best)
// - half curled (acceptable)
// - pointing down is NOT acceptable
for (let finger of [
  fp.Finger.Index,
  fp.Finger.Middle,
  fp.Finger.Ring,
  fp.Finger.Pinky
]) {
  thumbsUpDescription.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  thumbsUpDescription.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
}

// require the index finger to be somewhat left or right pointing
// but NOT down and NOT fully up
thumbsUpDescription.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.DiagonalUpLeft,
  1.0
);
thumbsUpDescription.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.HorizontalLeft,
  1.0
);
thumbsUpDescription.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.HorizontalRight,
  1.0
);
thumbsUpDescription.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.DiagonalUpRight,
  1.0
);
