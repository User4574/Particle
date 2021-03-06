var ps = [];
var gravity;
var air_resistance = 0.4;
var wid = 800;
var hei = 600;

function setup() {
  createCanvas(wid, hei);
  colorMode(HSL);
  gravity = createVector(0, 5);
}

function draw() {
  background(0);

  stroke(0);
  fill(100);
  text("frames=" + round(frameRate()) + " particles=" + ps.length, 10, 20);

  for(var i = ps.length - 1; i >= 0; i--) {
    ps[i].applyForce(gravity);
    ps[i].applyDrag(air_resistance);
    ps[i].update();

    stroke(ps[i].colour);
    strokeWeight(ps[i].mass);
    ps[i].show();

    if (ps[i].online(0, 0.75*hei, 0.25*wid, hei)) {
      ps[i].reflect(createVector(0.25*wid, 0.25*hei), 5);
    } else if (ps[i].online(0.75*wid, hei, wid, 0.75*hei)) {
      ps[i].reflect(createVector(0.25*wid, -0.25*hei), 5);
    }

    for(var j = ps.length - 1; j >= 0; j--) {
      if(i != j && ps[i].collide(ps[j]))
        console.log("COLLIDE" + ps[i] + ps[j]);
    }

    if (ps[i].pos.y >= hei)
      ps.splice(i, 1);
  }

  if (mouseIsPressed) {
    var force = p5.Vector.fromAngle(random(PI, 2*PI));
    force.mult(random(250));
    var p = new Particle(
          mouseX, mouseY, random(2, 10),
          color(random(360), random(90, 100), random(50, 100))
        );
    p.applyForce(force);
    ps.push(p);
  }

  strokeWeight(0);
  fill(50);
  triangle(0, 0.75*hei, 0.25*wid, hei, 0, hei);
  triangle(0.75*wid, hei, wid, 0.75*hei, wid, hei);
}
