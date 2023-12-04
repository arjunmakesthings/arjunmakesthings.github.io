class Dots{
    constructor  (x, y, p){
      this.x = x; 
      this.y = y;
      this.c = p;
      this.r = 40;
      this.tS = 16;
    }
     
     display(){  
       fill (this.c);
       strokeWeight (1);
       stroke (0);
       
       ellipse  (this.x, this.y, this.r, this.r);
       
       strokeWeight (0.8);
       stroke (0);
       fill (255);
       
       textSize (this.tS);
       textAlign (CENTER);
       text ('r=' + this.c[0] + '; g=' + this.c [1] + '; b=' + this.c [2] , this.x, this.y+this.r + this.tS);
     }
   }