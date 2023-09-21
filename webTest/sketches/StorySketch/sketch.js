//Landing Page Graphic; Arjun, January 2022. 

let vc; 

var vcWidth = 400; 
var vcHeight = 400;

let squareWidth;
let squareHeight;

let imgSquares = [];
let tiles = [];

let img; 

let bg; 

let divisor = 10;

function preload(){
  img = loadImage ("/StorySketch/Cropped.jpg");
}

function setup() {

  var canvas2 = createCanvas(windowWidth, vcHeight); 
  
  canvas2.position(0, 80);
  //canvas2.style('z-index', '-1'); 
  
  angleMode (DEGREES);
    
  vc = createGraphics (vcWidth, vcHeight);
  
  bg = color (0);
  
  rectMode (CENTER);
  
  const horizontalSquareCount = int(vc.width/divisor);
const verticalSquareCount = int(vc.height/divisor);

  
  push();

  //DrawTheText
  vc.background (0);
  
  vc.image (img, 0, 0, vc.width, vc.height);

  squareWidth = vc.width / horizontalSquareCount;
  squareHeight = vc.height / verticalSquareCount;
  pop();

    for (var y = 0; y < vc.height; y += squareHeight) {
    for (var x = 0; x < vc.width; x += squareWidth) {
      imgSquares.push(vc.get(x, y, squareWidth, squareHeight));
    }
  }
  
  let squareX = 0;
  let squareY = 0;
  
  let centerX = width/2-vc.width/2; 
  let centerY = height/2-vc.height/2;
  
  for (const square of imgSquares) {
    // Draw this square.
    //image(square, squareX, squareY);
    tiles.push(new Tiles (square, squareX+centerX, squareY+centerY));

    // Draw the next square to the right of this square.
    squareX += squareWidth;
    // If the square went off the right edge, move down
    // one row and start over at the left edge.
    if (squareX >= vc.width) {
      squareX = 0;
      squareY += squareHeight;
    }
  }

}

function draw() {
  background(bg);
  for (let i = 0; i<tiles.length; i++){
   tiles[i].display();
    tiles[i].sizeChange();
  }

}

/*
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
*/