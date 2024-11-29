function setup() {
let aspectRatio = [640, 480]; //width and breadth

let container = document.getElementById('canvas-container'); 
let containerWidth = container.offsetWidth; 
let containerHeight = ((containerWidth *aspectRatio[0]) / aspectRatio[1]); 

var canvas = createCanvas (containerWidth,containerHeight); 
canvas.parent('canvas-container'); 
}