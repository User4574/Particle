function Particle(x, y, m, c) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.colour = c;
  this.mass = m;

  this.applyForce = function(force) {
    this.acc.add(p5.Vector.div(force, this.mass));
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.pos.x <= 0 || this.pos.x >= wid)
      this.vel.x = -this.vel.x;
    if (this.pos.y <= 0)
      this.vel.y = -this.vel.y;
  }

  this.show = function() {
    point(this.pos.x, this.pos.y);
  }

  this.gone = function() {
    return this.pos.y >= hei;
  }
}
