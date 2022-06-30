const victoryDescription = new fp.GestureDescription("victory");

// thumb:
victoryDescription.addDirection(
  fp.Finger.Thumb,
  fp.FingerDirection.VerticalUp,
  1.0
);
victoryDescription.addDirection(
  fp.Finger.Thumb,
  fp.FingerDirection.DiagonalUpLeft,
  1.0
);
victoryDescription.addDirection(
  fp.Finger.Thumb,
  fp.FingerDirection.DiagonalUpRight,
  1.0
);

// index:
victoryDescription.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
victoryDescription.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.VerticalUp,
  1.0
);
victoryDescription.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.DiagonalUpLeft,
  1.0
);
victoryDescription.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.DiagonalUpRight,
  1.0
);
victoryDescription.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.HorizontalLeft,
  1.0
);
victoryDescription.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.HorizontalRight,
  1.0
);

// middle:
victoryDescription.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
victoryDescription.addDirection(
  fp.Finger.Middle,
  fp.FingerDirection.VerticalUp,
  1.0
);
victoryDescription.addDirection(
  fp.Finger.Middle,
  fp.FingerDirection.DiagonalUpLeft,
  1.0
);
victoryDescription.addDirection(
  fp.Finger.Middle,
  fp.FingerDirection.DiagonalUpRight,
  1.0
);
victoryDescription.addDirection(
  fp.Finger.Middle,
  fp.FingerDirection.HorizontalLeft,
  1.0
);
victoryDescription.addDirection(
  fp.Finger.Middle,
  fp.FingerDirection.HorizontalRight,
  1.0
);

// ring:
victoryDescription.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
victoryDescription.addCurl(fp.Finger.Ring, fp.FingerCurl.HalfCurl, 0.9);

// pinky:
victoryDescription.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);
victoryDescription.addCurl(fp.Finger.Pinky, fp.FingerCurl.HalfCurl, 0.9);
