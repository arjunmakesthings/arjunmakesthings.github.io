class Tiles {
    constructor(val, x, y) {
      this.x = x;
      this.y = y;
  
      this.startingX = x;
      this.startingY = y;
  
      this.val = val;
  
      this.xSpeed = random(-0.5, 0.5);
      this.ySpeed = random(-0.5, 0.5);
    }
  
    display() {
      image(this.val, this.x, this.y);
    }
  
    move() {
      if (this.x < 0 || this.x > width) this.xSpeed *= -1;
      if (this.y < 0 || this.y > height) this.ySpeed *= -1;
      this.x += this.xSpeed;
      this.y += this.ySpeed;
    }
  
    getBack() {
      this.x = lerp(this.x, this.startingX, 0.09);
      this.y = lerp(this.y, this.startingY, 0.09);
    }
  }
  