class Vehicle {
  
  constructor(width, height) {
    this.x = width/2;
    this.y = height/2;
    this.r = 16;
  }

  seek(targetX, targetY) {
    let subX = targetX - this.x;
    let subY = targetY - this.y;
  
    this.x = this.x + subX * 0.02;
    this.y = this.y + subY * 0.02;
  }

  show(targetX, targetY) {
    stroke(255);
    strokeWeight(2);
    fill(255);
    let angle = Math.atan2(targetY - this.y, targetX - this.x);
    translate(this.x, this.y);
    rotate(angle);
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
  }
}