//Fidenzas are too complicated; Arjun 2021.

let f = [];
let t =0;

let toggle = false;

function setup() {
  createCanvas(800, 800);
          background('#dedfd3');

  resetSketch();
}

function draw() {

  //print (t, toggle);
  autoTog();
  t++;

  if (toggle==true){
    t = 0;
    for (let i =0; i<f.length; i++){
     f.splice (0, i);
    }
   background('#dedfd3');
  }

  for (let i = 0; i<f.length; i++){
  f[i].display();
  f[i].move();
    //f[i].trail();
  }

  f.push(new Fidenza (width/2, height/2, random (0,100), random(0,100)));
}


function mousePressed(){
 if (mousePressed){
   toggle = !toggle;
   t= 0;
 }
}

function mouseReleased(){
toggle=false;
}

function resetSketch(){
   for (let i = 0; i<500; i++){
  f[i] = new Fidenza (width/2, height/2, random (0,100), random(0,100));
  }
}

function keyPressed(){
 if (key==='s'){
  save ('fidenza.jpg');
 }
}

function autoTog (){
 if  (t>=600){
  toggle = true;
 }

  if (t == 0){
    toggle = false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
