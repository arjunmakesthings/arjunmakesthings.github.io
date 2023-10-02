class Vertices {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.xSpeed = 1;
      this.ySpeed = 1;
      this.prob = int(random(1, 5));
      
    }
  
    display() {
      strokeWeight (5);
      stroke (255);
    
      point(this.x, this.y);
      
    }
  
    move() { 
      
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
      
      /*
            this.x += this.xSpeed;
        this.y += this.ySpeed;
        */
      
      if (this.x < 0+100 || this.x > width-100) this.xSpeed *= -1;
      if (this.y < 0+100 || this.y > height-100) this.ySpeed *= -1; 
    }
  
  }
  