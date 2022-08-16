//Water brush; Arjun, May 2022.

let brush = [];
let toggle = true;
let fillToggle = true;
let mainFont;

/*
function preload(){
 mainFont = loadFont (' SpaceGrotesk-SemiBold.ttf');
}
*/

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  for (let i =0; i<brush.length; i++){
  brush[i].display();
    brush[i].death();

    if (toggle==true){
     brush[i].spread();
    }

    if (brush[i].ded==true){
      brush.splice (i, 1);
    }
    console.log (brush.length);

  }

  ui();
}

function mouseDragged(){
   brush.push (new Brush (mouseX, mouseY, 10)); //Drawing action
}

function keyPressed(){
 if (key === ' '){
toggle = !toggle;
 }

  if (key === 'f' | key==='F'){
   fillToggle = !fillToggle;
  }

    if (key === 's' | key==='S'){
   save('picture.jpg');
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
