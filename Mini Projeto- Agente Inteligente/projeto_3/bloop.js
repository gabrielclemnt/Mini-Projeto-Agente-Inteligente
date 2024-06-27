// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Evolution EcoSystem

// Creature class

// Create a "bloop" creature
class Bloop {
  constructor(l, dna_) {
    this.position = l.copy();
    this.health = 150;
    this.xoff = random(1000);
    this.yoff = random(1000);
    this.dna = dna_;
    this.r = map(this.dna.genes[0], 0, 1, 0, 50);
    this.vision = map(this.dna.genes[1], 0, 1, this.r, 100);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = map(this.dna.genes[0], 0, 1, 15, 0);
    this.maxForce = this.maxspeed / 32;
  }

  run(f) {
    const food = f.getFood();
    const foodLoc = this.findFood(food);
    
    if (foodLoc) {
      this.seekFood(foodLoc);
    } else {
      this.wander();
    }
    
    this.updateVelocityAndPosition();
    this.handleBorders();
    this.display();
  }

  findFood(food) {
    for (let i = food.length - 1; i >= 0; i--) {
      const foodLocation = food[i];
      const distance = p5.Vector.dist(this.position, foodLocation);
      if (distance < this.vision / 2 + 8) {
        return foodLocation;
      }
    }
    return null;
  }

  seekFood(target) {
    const force = p5.Vector.sub(target, this.position);
    force.setMag(this.maxspeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  updateVelocityAndPosition() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.position.add(this.vel);
    this.acc.set(0, 0);
  }

  eat(f) {
    const food = f.getFood();
    for (let i = food.length - 1; i >= 0; i--) {
      const foodLocation = food[i];
      const distance = p5.Vector.dist(this.position, foodLocation);
      if (distance < this.r / 2) {
        this.health += 100;
        food.splice(i, 1);
      }
    }
  }

  reproduce(otherBloops) {
    if (random(1) < 0.001) {
      for (const partiner of otherBloops) {
        if (partiner === this) continue;
        const distance = p5.Vector.dist(this.position, partiner.position);
        if (distance < this.vision) {
          const childGenes = [this.dna.genes[0], partiner.dna.genes[1]];
          const childDNA = new DNA(childGenes);
          childDNA.mutate(0.01);
          return new Bloop(this.position, childDNA);
        }
      }
    }
    return null;
  }

  wander() {
    const vx = map(noise(this.xoff), 0, 1, -this.maxspeed, this.maxspeed);
    const vy = map(noise(this.yoff), 0, 1, -this.maxspeed, this.maxspeed);
    const velocity = createVector(vx, vy);
    this.xoff += 0.01;
    this.yoff += 0.01;
    this.position.add(velocity);
    this.health -= 0.2;
  }

  handleBorders() {
    if (this.position.x < -this.r / 2) this.position.x = width + this.r / 2;
    if (this.position.y < -this.r / 2) this.position.y = height + this.r / 2;
    if (this.position.x > width + this.r / 2) this.position.x = -this.r / 2;
    if (this.position.y > height + this.r / 2) this.position.y = -this.r / 2;
  }

  display() {
    ellipseMode(CENTER);
    stroke(0, this.health);
    fill(255, 255, 0, this.health);
    ellipse(this.position.x, this.position.y, this.r, this.r);
    fill(255, 255, 255, 70);
    circle(this.position.x, this.position.y, this.vision);
  }

  dead() {
    if (this.health < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}
