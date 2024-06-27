class Vehicle {
  constructor(width, height) {
    this.x = width / 2;
    this.y = height / 2;
    this.vx = random(-5, 5);
    this.vy = random(-5, 5);
  }

  //ajusta a posiçao do Seeker em direção ao alvo
  seek(targetX, targetY) {
    const subX = targetX - this.x;
    const subY = targetY - this.y;
  
    this.x += subX * 0.04;
    this.y += subY * 0.04;
  }

  //ajusta a posiçao do Seeker aleatoriamente
  runRandomly(width, height) {
    this.x += this.vx + 0.1 * sin(frameCount * 0.1);
    this.y += this.vy + 0.1 * sin(frameCount * 0.1);
    
    //verifica os limites da tela
    if (this.x > width || this.x < 0) {
      this.vx = -this.vx;
    }
    
    if (this.y > height || this.y < 0) {
      this.vy = -this.vy;
    }
  }

  //funçao que desenha o Seeker
  show(targetX, targetY, rangeOfVision) {
    //desenha a area de visão
    fill(0, 255, 0, 10);
    ellipse(this.x, this.y, rangeOfVision * 2, rangeOfVision * 2);
    
    //calcula a distancia para o alvo
    const d = dist(this.x, this.y, targetX, targetY);

    push();
    translate(this.x, this.y);

    //calcula o angulo de rotaçao
    const angle = (d < rangeOfVision) ? atan2(targetY - this.y, targetX - this.x) : atan2(this.vy, this.vx);
    rotate(angle);

    //desenha o vehicle
    fill(255,255,255);
    triangle(-16, -8, -16, 8, 16, 0);

    pop();
  }
}

class Target {
  constructor(width, height) {
    this.x = random(width);
    this.y = random(height);
  }

  //funçao que muda a posiçao do alvo
  changePlace(width, height) {
    this.x = random(width);
    this.y = random(height);
  }

  //funçao que desenha o alvo
  show() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, 10, 10);
  }
}
