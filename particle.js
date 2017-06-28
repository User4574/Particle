function Particle(x, y, m, c) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.colour = c;
  this.mass = m;

  this.applyForce = function(force) {
    this.acc.add(p5.Vector.div(force, this.mass));
  }

  this.applyDrag = function(drag_coeff) {
    var rev_vel = createVector().sub(this.vel);
    var drag = rev_vel.mult(drag_coeff);
    this.applyForce(drag);
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

  this.reflect = function(surface_vector, elastic_coeff) {
    var normal = surface_vector
                  .copy()
                  .normalize()
                  .rotate(PI/2);
    this.vel = this.vel.sub(p5.Vector.mult(normal, 2 * this.vel.dot(normal))).mult(elastic_coeff);
  }

  this.online = function(x1, y1, x2, y2) {
    var dist = function(x1, y1, x2, y2) {
      return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };

    return Math.abs(
        dist(x1, y1, this.pos.x, this.pos.y) +
        dist(this.pos.x, this.pos.y, x2, y2) -
        dist(x1, y1, x2, y2)
      ) < 1;
  }
}
