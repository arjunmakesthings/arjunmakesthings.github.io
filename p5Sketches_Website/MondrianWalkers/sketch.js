//Mondrian Walkers; Arjun - May 2022.

let walker = [];
let c = [3];
let font;

function setup() {
  createCanvas(windowWidth, windowHeight);

  c[0] = color(250, 201, 1);
  c[1] = color(34, 80, 149);
  c[2] = color(221, 1, 0);
}

/*
function preload() {
  font = loadFont("SpaceGrotesk-Bold.ttf");
}
*/

function draw() {
  background(245);

  for (let i = 0; i < walker.length; i++) {
    walker[i].move();
    walker[i].trail();
    walker[i].display();
  }
  //ui();
}

function mouseClicked() {
  if (mouseClicked) {
    walker.push(new Walker(mouseX, mouseY, random(40, 60)));
  }
}

function keyPressed() {
  if ((key === "s") | (key === " S")) {
    save("still.jpg");
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
