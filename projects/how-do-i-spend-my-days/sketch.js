//AugustData, Trial 1; Jan, 2023.

//Used Shiffman + Matter.JS library. Trial for the "How I Spend My Time" project. 

let start = false;

// module aliases
var Engine = Matter.Engine,
    //Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies; 
var engine; 
var world; 

let boxes = []; 
let container = [];
let ground;

let margin= 100; 

let drawingWidth; 
let drawingHeight; 

let containerWidth; 
let containerHeight; 

let particleSize = 30; 
//function Container(floorX, floorY, containWidth, containHeight, defHeight, options){

let xPos = [];

//Fonts
let mono; 
let cursive; 

//Data for Aug 2022
let work = 23; 
let teaching = 22; 
let creativePractice = 14; 
let people = 25; 
let health = 10; 
let archiving = 15; 

let headSize = 80; 
let tSize = 16; 

function preload(){
  mono = loadFont ("VictorMono-Regular.otf");
  cursive = loadFont ("VictorMono-LightItalic.otf");
}

function setup(){
  var canvas = createCanvas(windowWidth,windowHeight/1.3);
 
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder-hispmd');
  
  if (windowWidth<600){
    headSize = 56; 
    let tSize = 8; 
  }else{
   headSize = 80; 
   let tSize = 16; 
  }
  
  //Calculations to make it responsive
  drawingWidth = width-margin*2; 
  drawingHeight = height-margin; 
  
  containerWidth = drawingWidth/7; 
  
  particleSize = windowWidth/40; 
  
  //Matter Loading
  engine = Engine.create();
  world = engine.world; 
  Engine.run(engine);
  
  //Containers
    for (let x = margin+containerWidth/2; x<drawingWidth-containerWidth/2; x+=containerWidth){
   container.push (new Container(x+containerWidth/2, height-100, containerWidth, (height-200)+200, 10)); 
      
      xPos.push(x+containerWidth/2);
  }
  
  //Work Particles
  //function Box(x, y, w, h){
  
  for (let i = 0; i<work; i++){
   boxes.push(new Box(xPos[0]+random(-5,5),random(0,700-200), random(particleSize/4,particleSize), random(particleSize/4,particleSize), color('#f1c21b'))); 
  }
  
    for (let i = 0; i<teaching; i++){
  boxes.push(new Box(xPos[1]+random(-5,5),random(0,700-200), random(particleSize/4,particleSize), random(particleSize/4,particleSize), color('#fa4d56'))); 
  }
  
      for (let i = 0; i<creativePractice; i++){
   boxes.push(new Box(xPos[2]+random(-5,5),random(0,700-200), random(particleSize/4,particleSize), random(particleSize/4,particleSize), color('#ff832b'))); 
  }
  
        for (let i = 0; i<people; i++){
   boxes.push(new Box(xPos[3]+random(-5,5),random(0,700-200), random(particleSize/4,particleSize), random(particleSize/4,particleSize), color('#ff7eb6'))); 
  }
  
          for (let i = 0; i<health; i++){
   boxes.push(new Box(xPos[4]+random(-5,5),random(0,700-200), random(particleSize/4,particleSize), random(particleSize/4,particleSize), color('#33b1ff'))); 
  }
  
            for (let i = 0; i<archiving; i++){
   boxes.push(new Box(xPos[5]+random(-5,5),random(0,700-200), random(particleSize/4,particleSize), random(particleSize/4,particleSize), color('#8a3ffc'))); 
  }
  
  ground = Bodies.rectangle(width/2, height-50, width, 10, {isStatic:true, friction: 0});
  World.add(world, ground);
  
}

function draw(){
  background ('rgb(20, 20, 20)');
  ui();
  
  for (let i = 0; i<boxes.length; i++){
  boxes[i].display();
  }
  
    for (let i = 0; i<container.length; i++){
     container[i].display();
  } 
}

function ui(){
  textAlign (CENTER, CENTER);
  fill ('rgb(215, 215, 215)');
  noStroke();
  
  //textBelow Containers; 
  textSize (tSize);
textWrap (WORD); 
  push();
  textFont (mono);
  var gap = 10;
  text ('Work', xPos[0], container[0].y+gap, container[0].w/2, 100);
  text ('Teaching', xPos[1], container[0].y+gap,container[0].w/2, 100);
  text ('Creative Practice', xPos[2], container[0].y+gap,container[0].w/2, 100);
  text ('People', xPos[3], container[0].y+gap,container[0].w/2, 100);
  text ('Health', xPos[4], container[0].y+gap,container[0].w/2, 100);
  text ('Archiving', xPos[5], container[0].y+gap,container[0].w/2, 100);
  
    textSize (tSize-2);
  text (+work, xPos[0], container[0].y+gap*4);
  text (+teaching, xPos[1], container[0].y+gap*4);
  text (+creativePractice, xPos[2], container[0].y+gap*4);
  text (+people, xPos[3], container[0].y+gap*4);
  text (+health, xPos[4], container[0].y+gap*4);
  text (+archiving, xPos[5], container[0].y+gap*4);
}