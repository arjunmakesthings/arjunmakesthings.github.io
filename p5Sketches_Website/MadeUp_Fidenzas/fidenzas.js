class Fidenza{
  constructor(x, y, xOff, yOff){
    this.x = x
    this.y=y;
    this.offset = random(0,10);
    this.time = 0;
    this.pace = 0.0003;
    this.op = random(50, 120);
    this.xOff = random (0, width);
    this.yOff = random (0, height);

    this. Xhistory = [];
    this. Yhistory = [];

    this.strokeW = (random(0.5,2));

    this.col = color ('#33346f');

    var posX;
    var posY;
  }

  display(){
    stroke (this.col, this.op);
    strokeWeight (this.strokeW);
    point (this.x, this.y);
  }

  move(){

    this.x = map(noise(this.xOff), 0, 1, 0, width);
    this.y = map(noise(this.yOff), 0, 1, 0, height);
    //this.op=this.op-0.5;
    // if (this.x < 0 || this.x > width) this.pace *= -1;
 // if (this.y < 0 || this.y > height) this.pace *= -1;
  this.x+=this.pace;
    this.y+=this.pace;
      this.xOff+=0.01;
    this.yOff+=0.01;
    this.y=this.y-this.pace;
    }

}
