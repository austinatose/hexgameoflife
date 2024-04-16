class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.active = false;
    this.cellSize = 40;
  }

  show() {
    if (this.active) fill(0);
    else fill(255);
    beginShape();
    for (let a = 0; a < TWO_PI; a += PI / 3) {
      const sx = this.x + cos(a) * this.cellSize;
      const sy = this.y + sin(a) * this.cellSize;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

  displayNum(a, b, c) {
    push();
    if (this.active) fill(255);
    else fill(0);
    textSize(8);
    text(a + ',' + b + ',' + c, this.x, this.y);
    pop();
  }
}
