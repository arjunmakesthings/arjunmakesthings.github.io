function setup() {
  let aspectRatio = [1080, 1920]; //width and breadth

  let container = document.getElementById("canvas-container");
  let containerWidth = container.offsetWidth;
  let containerHeight = (containerWidth * aspectRatio[0]) / aspectRatio[1];

  var canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent("canvas-container");

  background (100);
}
