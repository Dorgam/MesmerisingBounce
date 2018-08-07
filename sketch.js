var particles = []; // Creating particles array
var gravity;
var gravityStrength = 0.05; // How fast to go down

var particlesCount = 1000; // Number to control particles on screen

function setup() {
  // Creating a canvas
  createCanvas(640, 480);
  
  // Creating n particles with random starting locations
  for(i = 0; i < particlesCount; i++) {
    var particle = new Particle(random(8, width - 8), random(8, height - 200), 1, 1);
    particles.push(particle);
  }

  // Setting gravity values
  gravity = createVector(0, gravityStrength);
}

function draw() {
  background(255, 0, 255);

  for (i = 0; i < particles.length; i++) {
    particles[i].addForce(gravity); // Adding gravity to each particle
    particles[i].update(); // Updating each particle
    particles[i].display(); // Displaying each particle
  }
}