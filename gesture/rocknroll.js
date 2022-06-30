const rockNRollDescription = new fp.GestureDescription("rock_n_roll");

rockNRollDescription.addCurl(fp.Finger.index, fp.FingerCurl.NoCurl, 1.0);
rockNRollDescription.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);
rockNRollDescription.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
rockNRollDescription.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.VerticalUp,
  1.0
);
rockNRollDescription.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.DiagonalUpLeft,
  0.9
);
rockNRollDescription.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.DiagonalUpRight,
  0.9
);
rockNRollDescription.addDirection(
  fp.Finger.Pinky,
  fp.FingerDirection.VerticalUp,
  1.0
);
rockNRollDescription.addDirection(
  fp.Finger.Pinky,
  fp.FingerDirection.DiagonalUpLeft,
  0.9
);
rockNRollDescription.addDirection(
  fp.Finger.Pinky,
  fp.FingerDirection.DiagonalUpRight,
  0.9
);
rockNRollDescription.addDirection(
  fp.Finger.Thumb,
  fp.FingerDirection.DiagonalUpLeft,
  0.9
);
rockNRollDescription.addDirection(
  fp.Finger.Thumb,
  fp.FingerDirection.DiagonalUpRight,
  0.9
);

// all other fingers:
// - curled (best)
// - half curled (acceptable)
// - pointing down is NOT acceptable
for (let finger of [fp.Finger.Middle, fp.Finger.Ring]) {
  rockNRollDescription.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  rockNRollDescription.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
}
