let img;
let particles = [];

function preload() {
  img = loadImage("images/IMG_3663.JPG");
}

function setup() {
  createCanvas(400, 600);
  img.resize(150, 150);
  noSmooth();
  frameRate(60);

  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let pixelIndex = (y * img.width + x) * 4;
      let r = img.pixels[pixelIndex];
      let g = img.pixels[pixelIndex + 1];
      let b = img.pixels[pixelIndex + 2];
      let particle = new Particle(x, y, r, g, b);
      particles.push(particle);
    }
  }
  img.updatePixels();
}

function draw() {
  background(255);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }
}

class Particle {
  constructor(x, y, r, g, b) {
    this.x = x;
    this.y = y;
    this.targetX = random(width);
    this.targetY = random(height);
    this.color = color(r, g, b);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maxSpeed = 5;
    this.maxForce = 0.1;
  }

  update() {
    let target = createVector(this.targetX, this.targetY);
    let desired = p5.Vector.sub(target, createVector(this.x, this.y));
    let d = desired.mag();
    if (d > 0) {
      desired.setMag(this.maxSpeed);
      let steering = p5.Vector.sub(desired, this.velocity);
      steering.limit(this.maxForce);
      this.acceleration.add(steering);
    }

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.acceleration.mult(0);
  }

  display() {
    stroke(this.color);
    strokeWeight(2);
    point(this.x, this.y);
  }
}
