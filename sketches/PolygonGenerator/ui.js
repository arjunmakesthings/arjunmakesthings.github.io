function ui(){
    blendMode (BLEND);
    fill (0); 
    noStroke();
    rect (0, 0, width, 75);
     fill (255); 
    noStroke(); 
    textFont (font); 
    textSize (18);
    textAlign (RIGHT);
    text ('vertices = '+n, width-50, 50);
    
    textSize (12);
    text ('CLICK TO ADD FOUR VERTICES | S TO TOGGLE STROKE | SPACEBAR TO SAVE', width-50, height-50);
  }