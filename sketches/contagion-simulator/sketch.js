let balls = [];  
let contagious; 
let touching; 

let headFont; 
let bodyFont; 

let infectedCounter = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i<500; i++){
    balls [i] = new Ball (width/2, height/2, 3, 255); 
  }
}

function mousePressed(){
  if (mousePressed){
  let contagious = new Ball (mouseX, mouseY, 5, color(204,0,0));  
    balls.push(contagious);
    infectedCounter++; 
  }
}

function draw() {
  let millisecond = millis(); 
  background(0);
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.update();
    b.display();
    b.checkBoundaryCollision();
    //contagious.checkCollision(); 
   
    for (let j = 0; j<balls.length; j++){
    balls[i].checkCollision(balls[j]);
    }
  }
  
  fill (255); 
  stroke (0); 
  textAlign (RIGHT); 
  textFont (headFont); 
  textSize (18); 
  text ('Contagion Simulation', width-100, 50); 
  
 let numb = balls.length; 
  
  textSize (12); 
  textFont (bodyFont); 
  fill (255, 200); 
  text ('Infected people = '+infectedCounter +'/'+numb, width-100, 70); 
  text ('Seconds passed = ' + int (millisecond/1000), width-100, 85); 
  
}

function preload() {
 headFont = loadFont ('SpaceGrotesk-SemiBold.ttf');
  bodyFont = loadFont ('SpaceGrotesk-Regular.ttf'); 
}