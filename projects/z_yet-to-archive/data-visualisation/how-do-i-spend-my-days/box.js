function Box(x, y, w, h, col){
  var options = {
    friction: 0.2, 
    restitution: 0.2
  }
    this.body = Bodies.rectangle (x, y, w, h, options);
    this.w = w; 
    this.h = h;
    World.add(world, this.body);
  
  this.col = col; 
  

this.display = function(){
  var pos = this.body.position;
  var angle = this.body.angle; 
  
  push();
  translate (pos.x, pos.y); 
  rotate (angle);
  rectMode (CENTER);
  
  fill (this.col);
  stroke (0);
  strokeWeight (1);
  rect(0, 0, this.w, this.h);
  pop();
}
}