class Brush {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.ded = false;

    this.addR = random(0.05, 2); //Spread controlled by a random variable

    colorMode(HSB); //Declare HSB colourMode to alter saturation

    this.h = 210;
    this.s = random(50, 255);
    this.b = 255;

  }

  display() {
    this.col = color(this.h, this.s, this.b);

    if (fillToggle == false) {
      stroke(this.col);
      strokeWeight(0.5);
      noFill();
    }

    if (fillToggle == true) {
      noStroke();
      fill(this.col);
    }

    ellipse(this.x, this.y, this.r, this.r);
  }

  spread() {
    this.r = this.r + this.addR;
    if (this.b > 0) { //Fade out using brightness.
      this.b--;
    }
  }

  death() {
    if (this.b <= 0) {
      this.ded = true;
    } else {
      this.ded = false;
    }
  }
}
