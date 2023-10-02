let points = []; 

let strokeTog = false;

let n = 4;

let font; 

function preload(){
  font = loadFont ("/fonts/VictorMono/VictorMono-Regular.otf"); 
}

function setup() {

  var canvas = createCanvas(800, 800);
  canvas.parent = ("sketch-holder");


      for (let i =0; i<n; i++){
   points[i] = new Vertices (int(random (0+100, width-100)), int (random(0+100, height-100)));  
  }

  
}

function draw() {
  background(0);
  
  blendMode (DIFFERENCE);
  
  if (strokeTog == true){
    noFill();
  }else {
    fill (190);
  }
  beginShape();
  
  for (let i=0; i<points.length; i=i+4){
   vertex (points[i].x, points[i].y); 
    vertex (points[i+1].x, points[i+1].y);
    vertex (points[i+2].x, points[i+2].y);
    vertex (points[i+3].x, points[i+3].y);
    vertex (points[i].x, points [i].y);
  }
  endShape();
  
  for (let i =0; i<points.length; i++){
   points[i].display(); 
    points[i].move(); 
  }
  
  
  push();
  ui();
  blendMode (BLEND); 
  pop();
}

function keyPressed(){
  if (key==='s'){
   strokeTog =!strokeTog; 
  }
  
  if (key === ' '){
   save ('wow.jpeg');  
  }
}


function mouseClicked() {
  if (mouseClicked) {
    for ( let i = 0; i<4; i++){
    points.push(new Vertices(int(random (0+100, width-100)), int (random(0+100, height-100))));
    }
    
    n = n+4;
  }
}