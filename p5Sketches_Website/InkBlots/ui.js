function ui() {
  textAlign(RIGHT);
  //textFont(mainFont);
  textSize(18);
  fill(255);
  noStroke();

  text("Press F to toggle fill/stroke", width - 50, 50);
  text("Spacebar to toggle spread", width - 50, 75);
  text("Press S to save", width - 50, 100);
}
