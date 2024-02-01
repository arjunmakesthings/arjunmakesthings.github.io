
function Container(floorX, floorY, containWidth, containHeight, defHeight){
  
  var option2 = {
    isStatic:true, 
    restitution: 0, 
    friction: 0
  }
  this.plat = Bodies.rectangle(floorX, floorY, containWidth, defHeight*3, option2);
  this.left = Bodies.rectangle(floorX-(containWidth/2), floorY-(containHeight/2), defHeight, containHeight, option2);
  this.right = Bodies.rectangle(floorX+(containWidth/2), floorY-(containHeight/2), defHeight, containHeight, option2);

    World.add(world, this.plat);
  World.add(world, this.left);
  World.add(world, this.right);
  
  this.x = floorX; 
  this.y = floorY; 
  this.w = containWidth; 
  this.h = containHeight; 
  this.stat = defHeight; 

this.display = function(){
  rectMode (CENTER);
  noStroke();
noFill();
  rect (floorX, floorY, containWidth, defHeight); 
  rect (floorX-(containWidth/2), floorY-(containHeight/2), defHeight, containHeight); 
  rect (floorX+(containWidth/2), floorY-(containHeight/2), defHeight, containHeight); 
}
  
}