const vision = 70;
let target, seeker;
let foodCounter = 0;

function setup() {
  createCanvas(500, 500);
  target = new Target(width, height);
  seeker = new Vehicle(width, height);
}

function draw() {
  background(0);
  noStroke();
  
  target.show();
  defaultBehavior();
  searchCounter();
  
  seeker.show(target.x, target.y, vision);
}

//funçao que lida com o comportamento do Vehicle
function defaultBehavior() {
  const d = dist(seeker.x, seeker.y, target.x, target.y);
  
  if (d < vision) {
    seeker.seek(target.x, target.y);
  } else {
    seeker.runRandomly(width, height);
  }
  
  if (d < 10) {
    target.changePlace(width, height);
    foodCounter ++;
  }
}

//funçao que exibe o numero de targets alcançados
function searchCounter() {
  fill(10,215,0);
  text("Comidas Coletadas: " + foodCounter, 20, 30);
}
