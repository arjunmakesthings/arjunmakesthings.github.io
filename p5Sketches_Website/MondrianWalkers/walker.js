class Walker {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.prob = 0;
    this.xSpeed = 2;
    this.ySpeed = 2;
    this.xHistory = [];
    this.yHistory = [];
    this.col = random(c);

    this.moving = false;
  }

  display() {
    fill(this.col);
    noStroke();

    rectMode(CENTER);

    rect(this.x, this.y, this.w, this.w);
  }

  move() {
    if (this.x < 0 || this.x > width) this.xSpeed *= -1;
    if (this.y < 0 || this.y > height) this.ySpeed *= -1;

    if (frameCount % 300 == 0) {
      this.prob = int(random(1, 5));
      this.moving = true;
    }

    if (this.prob == 1) {
      this.x += this.xSpeed;
    }

    if (this.prob == 2) {
      this.y += this.ySpeed;
    }

    if (this.prob == 3) {
      this.x -= this.xSpeed;
    }

    if (this.prob == 4) {
      this.y -= this.ySpeed;
    }
  }

  trail() {
    if (this.moving==true){
    this.xHistory.push(this.x);
    this.yHistory.push(this.y);

    if (this.xHistory.length > 500) {
      this.xHistory.splice(0, 1);
      this.yHistory.splice(0, 1);
    }

    for (var i = 0; i < this.xHistory.length; i++) {
      var posX = this.xHistory[i];
      var posY = this.yHistory[i];

      fill(40, 1);

      rect(posX, posY, this.w - 10, this.w - 10);
    }
    }
  }
}
