//Landing Page Graphic; Arjun, January 2022.

let vc;

var vcWidth = 262;
var vcHeight = 141;

let headFont;

let squareWidth;
let squareHeight;

let imgSquares = [];
let tiles = [];

let toggle = false;

let mouseXhistory = [];
let mouseYhistory = [];

var canvas; 

var centerX; 
var centerY;

function preload() {
  headFont = loadFont("fonts/Piazzolla/Piazzolla-SemiBoldItalic.ttf");
}

function setup() {
  
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1'); 

  const horizontalSquareCount = int(vcWidth / 10);
  const verticalSquareCount = int(vcHeight / 10);

  vc = createGraphics(vcWidth, vcHeight);
  
  centerX = windowWidth / 2 - vc.width / 2;
  centerY = windowHeight / 2 - vc.height / 2;

  //DrawTheText
  vc.textFont(headFont);
  vc.textSize(84.17);
  vc.fill(255);
  vc.noStroke();
  vc.textAlign(CENTER, CENTER);
  vc.text("arjun's", vc.width / 2, vc.height / 2);

  squareWidth = vc.width / horizontalSquareCount;
  squareHeight = vc.height / verticalSquareCount;
  
  for (var y = 0; y < vc.height; y += squareHeight) {
    for (var x = 0; x < vc.width; x += squareWidth) {
      imgSquares.push(vc.get(x, y, squareWidth, squareHeight));
    }
  }

  let squareX = 0;
  let squareY = 0;

  for (const square of imgSquares) {
    // Draw this square.
    //image(square, squareX, squareY);
    tiles.push(new Tiles(square, squareX + centerX, squareY + centerY));

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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centerX = windowWidth / 2 - vc.width / 2;
  centerY = windowHeight / 2 - vc.height / 2;
}

window.onresize = function() {
  // assigns new values for width and height variables
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;  
  canvas.size(windowWidth,windowHeight);
}

function draw() {
  background(0);

  for (let i = 0; i < tiles.length; i++) {
    tiles[i].display();

    if (toggle == true) {
      tiles[i].move();
    } else {
      tiles[i].getBack();
    }
  }

  trackMouseMovement();
}

//1 second if (frameCount % 60); change to 30 for half a second. 
function trackMouseMovement() {
  if (frameCount % 60 == 0) {
    mouseXhistory.push(mouseX);
    mouseYhistory.push(mouseY);
  }

  if (mouseXhistory.length > 6) {
    mouseXhistory.splice(0, 1);
    mouseYhistory.splice(0, 1);
  }

  if (mouseX == mouseXhistory[0] && mouseY == mouseYhistory[0]) {
    toggle = true;
  } else {
    toggle = false;
  }
}