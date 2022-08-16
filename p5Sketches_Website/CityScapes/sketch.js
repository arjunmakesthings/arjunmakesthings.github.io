//Generative CityScapes by Arjun_2022.

let redrawToggle = false;

var t=0;
let xoff = 0.05;
let yoff =-2 ;

function setup() {
  createCanvas(980, 540);
  //background (10);
}

function draw() {

  t++;

  xoff = xoff + 0.008;
   yoff = yoff + 0.008;

  let x = noise(xoff) * width;
  let y= noise(yoff) *height-50;

  stroke (200);
  for (var i = 0; i<width; i++){
    translate (0,i);
  point(x,y);
  }

    if (redrawToggle==true){
   clear();
   //background (10)
   t=0;
   redrawToggle=false;
  }

  if (t>=540){
    redrawToggle=true;
  }

}

/*
function mousePressed(){
 if (mousePressed){
  redrawToggle=!redrawToggle;
 }
}
function mouseReleased(){
 redrawToggle=false;
}
*/

/*
function keyPressed(){
 if (key==='s'){
  save ('CityScapes.jpg');
 }
}
*/

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
