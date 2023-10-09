//Automatically Shifting Type; December, 2022. Canvas size for Instagram post. 

let pixel = [];

let frames = 0;

let button1; 

function setup() {
  createCanvas(1080, 566);
  
  //Creating buttons
  button1 = createButton ('Order!');
  button1.position (438, height - 100);
  button1.mousePressed(goBack); 
  

  //Declare pixel values of the starting positions, coordinates from center of pixel.
  
  //Letter S
  //Row 1
  pixel[0] = new Pixel(139.44, 202.89);
  pixel[1] = new Pixel(99.38, 202.89);
  //ROW 2
  pixel[2] = new Pixel(59.33, 242.94);
  //ROW 3
  pixel[3] = new Pixel(59.33, 283);
  pixel[4] = new Pixel(99.38, 283);
  pixel[5] = new Pixel(139.44, 283);
  pixel[6] = new Pixel(139.44, 323.06);
  //ROW 4
  pixel[7] = new Pixel(99.38, 363.11);
  pixel[8] = new Pixel(59.33, 363.11);
  
  //Letter H
  //STEM
  pixel [9] = new Pixel (259.61, 202.89);
  pixel [10] = new Pixel (259.61, 242.94);
  pixel [11] = new Pixel (259.61, 283);
  pixel [12] = new Pixel (259.61, 323.06);
  pixel [13] = new Pixel (259.61, 363.11); 
  //RIGHT
  pixel [14] = new Pixel (299.66, 283);
  pixel [15] = new Pixel (339.72, 283);
  //DOWN
  pixel [16] = new Pixel (379.78, 323.06);
  pixel [17] = new Pixel (379.78, 363.11);
  
  //Letter I
  //TITTLE
  pixel [18] = new Pixel (499.94, 202.89);
  //STEM
  pixel [19] = new Pixel (499.94, 283);
  pixel [20] = new Pixel (499.94, 323.06);
  pixel [21] = new Pixel (540, 363.11);
  
  //Letter F
  pixel [22] = new Pixel (780.34, 202.89);
  pixel [23] = new Pixel (740.28, 202.89);
  pixel [24] = new Pixel (700.22, 242.94);
  pixel [25] = new Pixel (660.17, 283);
  pixel [26] = new Pixel (700.22, 283);
  pixel [27] = new Pixel (740.28, 283);
  pixel [28] = new Pixel (700.22, 323.06);
  pixel [29] = new Pixel (700.22, 363.11);
  
  //Letter T
  pixel[30] = new Pixel (940.56, 202.89);
  
  pixel[31] = new Pixel (900.5, 242.94);
  pixel[32] = new Pixel (940.56, 242.94);
  pixel[33] = new Pixel (980.62, 242.94);
  
  pixel[34] = new Pixel (940.56, 283);
  pixel[35] = new Pixel (940.56, 323.06);
  pixel[36] = new Pixel (980.62, 363.11);
  pixel[37] = new Pixel (1020.67, 363.11);
  
  
}

function draw() {
  background('#4b56b7');

  //Calculating Time
  frames++;
  
  //print(secondsPassed);

  //Drawing Pixels
  for (let i = 0; i < pixel.length; i++) {
    pixel[i].display();
    pixel[i].move();
  }

  
  //Frames % x numbers means x number/60 is going to be seconds. 

  if (frames % 30 == 0) {
      pixel[int(random(0, pixel.length))].prob = int(random(0, 9));
  }

}

function goBack(){
    frames=0;
   for (let i = 0; i<pixel.length; i++){
    pixel[i].prob=5;
   }
}

function keyPressed(){
  if (key ===' '){
 //button1.hide(); 
    save ('ShiftType.jpg');
  } 
}

function keyReleased(){
 // button1.show(); 
}
