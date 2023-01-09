
// Description: Procedural squares
var DEBUG = true
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  var deb = new Debugger()

  // frameRate(1);
  confetti = new Confetti(5000, color(0, 0, 255));
  recte = new Rectangle(200, 200, 50, color(0, 0, 255));
}

function draw() {
  background(0);


  // Test rotating square
  // noFill();
  // stroke(255);
  // strokeWeight(2);
  // translate(width / 2, height / 2);
  // rotate(frameCount / 100);
  // for (var i = 0; i < 100; i++) {
  //   rect(0, 0, i * 10, i * 10);
  // }

  confetti.render()
  recte.render()

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

