// Eye tracking with posenet

let video;
let poseNet;
let poses = [];

var d = 0;
var tSize = 16;

let bold;

let italic;

let regular;

let headSize = 60;
let subSize = 36;
let bodSize = 14;

let newHeadSize = headSize;
let newSubSize = subSize;
let newBodSize = bodSize;

let min = 70;

let max = 170;

let tY = 0;

let quote = "“This is why tyrants of all stripes, infernal servants, have such deep-seated hatred for the nomads - this is why they persecute the Gypsies and the Jews, and why they force all free peoples to settle, assigning the addresses that serve as our sentences. What they want is to create a frozen order, to falsify time's passage. They want for the days to repeat themselves, unchanging, they want to build a big machine where every creature will be forced to take its place and carry out false actions. Institutions and offices, stamps,newsletters, a hierarchy, and ranks, degrees, applications and rejections, passports, numbers, cards, elections results, sales and amassing points, collecting, exchanging some things for others."; 

function preload() {
  bold = loadFont("Rubik-SemiBold.ttf");
  italic = loadFont("Rubik-LightItalic.ttf");
  regular = loadFont("Rubik-Regular.ttf");
}

function setup() {
  createCanvas(595, windowHeight);
  
  tY = 100;
  video = createCapture(VIDEO);
  video.size(640, 480);

  textWrap(WORD);

  textAlign(LEFT, TOP);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on("pose", function (results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function draw() {
  background(255);

  image(video, 0, 0, 640/6, 480/6);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  //drawSkeleton();

  fill(0);

  textFont(regular);
  textSize(bodSize);
  text(quote,75,tY , width-75*2);

  tChange();
  
  ui();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    {
      let x = pose.leftEye.x;
      let y = pose.leftEye.y;
      fill ('rgb(231,17,137)');
      ellipse(x / 6, y / 6, 5, 5);
    }
    {
      let x = pose.rightEye.x;
      let y = pose.rightEye.y;
      fill ('rgb(231,17,137)');
      ellipse(x / 6, y / 6, 5, 5);
    }

    d = int(
      dist(pose.leftEye.x, pose.leftEye.y, pose.rightEye.x, pose.rightEye.y)
    );
  }
}

function tChange() {
  
  bodSize = lerp (bodSize, newBodSize, 0.05);
  
  if (d<min&d!=0){
   newBodSize = 56;  
  }
  
    if (d>min&d<max){
   newBodSize = 16;  
  }
  
      if (d>max){
   newBodSize = 8;  
  }

}

function ui(){
 push();
  textAlign (RIGHT);
  textSize (16); 
  fill ('rgb(231,17,137)');
  text('distance = ' +d +", textSize = " + int(bodSize), width-20, 20);
  //text();
  pop();
}
