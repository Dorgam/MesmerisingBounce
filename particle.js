// Particle Class Definition
function Particle(x, y, m = 1, b = 1) {
    // Aesthetic Properties
    this.color = createVector(random(255), random(255), random(255)); // Using a vector to store three related values
    this.stepR = 0;
    this.stepG = 100;
    this.stepB = 200;

    // Physics Properties
    this.mass = m;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.bounciness = constrain(b, 0.5, 1); // A value between 0.5 and 1 that determines how "bouncy" a ball is.
                                            // 0.5 => Full stop on hit (Energy Lost), 1 => Full bounce on hit (Energy is conserved)

    this.addForce = function (force) {
        // Newton's Second Law: Force = Mass * Acceleration
        // => Acceleration = Force / Mass
        // Since this function adds forces we are going to increment acceleration instead of setting it.
        this.acceleration.add(p5.Vector.div(force, this.mass));
    }

    this.update = function () {
        // Make sure you are not passing scene walls
        this.checkWalls();

        // Update velocity
        this.velocity.add(this.acceleration);

        // Limit the precession of velocity to stop rounding errors when "bouncing"
        this.velocity.x = parseFloat((this.velocity.x).toPrecision(4));
        this.velocity.y = parseFloat((this.velocity.y).toPrecision(4));

        // Update position 
        this.position.add(this.velocity);

        // Reset acceleration to recalculate it.
        this.acceleration.setMag(0);
    }

    // Drawing the particle
    this.display = function () {
        fill(this.color.x, this.color.y, this.color.z);
        ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
    }

    this.checkWalls = function () {
        if (this.position.y + (this.mass * 8) > height) { // Check bottom wall
            this.position.y = height - (this.mass * 8);   // Simulates collision (Prevents from going overboard)
            this.addForce(this.getBounceForce());         // Add Bounce force
            this.changeColor();                           // Change color on bounce
        } else if(this.position.y - (this.mass * 8) < 0) { // Check top wall
            this.position.y = this.mass * 8;
            this.addForce(this.getBounceForce());
            this.changeColor();
        } else if(this.position.x + (this.mass * 8) > width) { // Check  right wall
            this.position.x = width - (this.mass * 8);
            this.addForce(this.getBounceForce());
            this.changeColor();
        } else if(this.position.x - (this.mass * 8) < 0) {  // Check left wall
            this.position.x = this.mass * 8;
            this.addForce(this.getBounceForce());
            this.changeColor();
        }
    }

    // Bounce force is calculated by inverting the current velocity in the opposite
    // direction and modifying it by how "bouncy" the ball is
    this.getBounceForce = function() {
        var bounceForce = p5.Vector.mult(this.velocity, -2 * this.bounciness);
        return bounceForce;
    }

    // Change color on collision with Perlin noise
    this.changeColor = function() {
        // Updating noise steps
        this.stepR += 1;
        this.stepG += 1;
        this.stepB += 1;

        // Setting the new color
        this.color = createVector(noise(this.stepR)*255, noise(this.stepG)*255, noise(this.stepB)*255);
    }
}