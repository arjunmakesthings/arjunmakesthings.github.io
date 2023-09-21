
class Tiles{
  constructor(val, x, y){
    this.x = x; 
    this.y = y; 
    
    this.startingX = x;
    this.startingY = y; 
    
    this.val = val;
    
  this.xSpeed = random(-0.75, 0.75);
  this.ySpeed = random(-0.75, 0.75);
    this.s = squareWidth*2; 
    
    this.xOff = 0; 
       this.xoffInc = random(0.01, 0.001);
    
    this.a = 0;
    
  }
  
  display(){
    strokeWeight (2);
    stroke (150);
    //rect (this.x, this.y, this.s,this.s);
    push();
    translate (this.x, this.y);
    rotate (this.a);
    image (this.val, 0, 0, this.s, this.s);
    pop();
  }
  
    sizeChange(){
      this.a+=0.3;
      
          this.xOff+=this.xoffInc;
       this.s=map(noise(this.xOff), 0, 1, squareWidth,squareWidth*5);

    }
}