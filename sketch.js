var ps = [];
var gravity;
var wid = 800;
var hei = 600;

function setup() {
  createCanvas(wid, hei);
  colorMode(HSL);
  gravity = createVector(0, 5);
}

function draw() {
  background(0);

  for(var i = ps.length - 1; i >= 0; i--) {
    ps[i].applyForce(gravity);
    ps[i].update();

    stroke(ps[i].colour);
    strokeWeight(ps[i].mass);
    ps[i].show();

    if (ps[i].gone()) {
     ps.splice(i, 1);
    }
  }

  if (mouseIsPressed) {
    var p = new Particle(
          mouseX, mouseY, random(2, 8),
          color(random(0, 360), random(90, 100), random(50, 100))
        );
    p.applyForce(createVector(random(-40, 40), random(-150, 0)));
    ps.push(p);
  }
}
