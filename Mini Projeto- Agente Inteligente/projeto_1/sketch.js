let targetX;
let targetY;
let count = 0;

function setup() {
  createCanvas(500, 500);
  targetX = random(width);
  targetY = random(height);
  vehicle = new Vehicle(100, 100);
}

function draw() {
  background(0);
  fill(255, 0, 0);
  noStroke();
  ellipse(targetX, targetY, 10, 10);
  vehicle.seek(targetX, targetY);
  
  //detecta colisão
  let blocoMoral = dist(vehicle.x, vehicle.y, targetX, targetY);
  if (blocoMoral < 14) {
    targetX = random(width);
    targetY = random(height);
    count++;
  }
  
  fill(10,215,0);
  text("Comidas Coletadas: " + count, 20, 30);
  vehicle.show(targetX, targetY);
  
}