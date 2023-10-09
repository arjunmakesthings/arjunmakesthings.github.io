class Pixel {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 40.0559; //Size of pixel.
    this.startingX = x;
    this.startingY = y;

    this.col = '#e7eacc';
    this.prob = 0;
    
    this.newX = x;
    this.newY = y;
  }
  display() {
    noStroke();
    fill(this.col);

    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.w); //Main Pixel
    
    //Bounding Rectangle properties
  
    noFill();
    stroke (200);
    strokeWeight (1);
    rect(this.startingX, this.startingY, this.w * 3); //Bounding Rectangle
  
  }

  move() {
    
    this.x = lerp (this.x, this.newX, 0.2);
    this.y = lerp (this.y, this.newY, 0.2);
    
    if (this.prob==1){
      this.newX = this.startingX - this.w;
      this.newY = this.startingY - this.w;
    }
    
        if (this.prob==2){
      this.newX = this.startingX; 
      this.newY = this.startingY - this.w;
    }
    
        if (this.prob==3){
      this.newX = this.startingX + this.w;
      this.newY = this.startingY - this.w;
    }
    
        if (this.prob==4){
      this.newX = this.startingX - this.w;
      this.newY = this.startingY;
    }
    
        if (this.prob==5){
      this.newX = this.startingX;
      this.newY = this.startingY;
    }
    
        if (this.prob==6){
      this.newX = this.startingX - this.w;
      this.newY = this.startingY + this.w;
    }
    
        if (this.prob==7){
      this.newX = this.startingX ;
      this.newY = this.startingY + this.w;
    }
    
        if (this.prob==8){
      this.newX = this.startingX + this.w;
      this.newY = this.startingY + this.w;
    }
    
  }
}
