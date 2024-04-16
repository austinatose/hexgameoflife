let grid = []
let test = new Cell(0, 0)
let play = false
let mouseStateIsHighlighted = false
let delay = 20 // frames
let keyPressFrame = 0
let debug = false // edit this to show cell indices and active neighbor count

function setup() {
  createCanvas(800, 800);
  makeGrid();
  // console.log(grid);
  let playButton = createButton('Play/Pause', 'play');
  playButton.size(100, 50);
  playButton.mousePressed(togglePlay);
}

function draw() {
  background(220);
  test.show();
  drawGrid();
  if (play) {
    if ((frameCount - keyPressFrame) % delay == 0) {
      updateGrid();
    }
  }
}

function makeGrid() {
  count = 0;
  for(i = 0; i < height; i += 80 / 2.3) { // arbitrary number
    grid.push([]);
    for(j = 0; j < width; j += 80 * 1.5) { // x axis offset, this is a nicer number
      cell = new Cell(j + 80 * (count % 2==0) * 0.75, i);
      grid[grid.length-1].push(cell);
    }
    count++
  }
}

function drawGrid() {
  for (i = 0; i < grid.length; i++) {
    for (j = 0; j < grid[i].length; j++) {
      grid[i][j].show();
      if (!play && debug) grid[i][j].displayNum(i, j, countActiveNeighbors(i, j)); // debug
      if (!play && mouseIsPressed && dist(grid[i][j].x, grid[i][j].y, mouseX, mouseY) < 40 && mouseStateIsHighlighted == false) {
        grid[i][j].active = !grid[i][j].active;
        mouseStateIsHighlighted = !mouseStateIsHighlighted; // this workaround is required to prevent the mouse from constantly toggling the cell
      }
    }
  }
}

function countActiveNeighbors(x, y) {
  let count = 0
  if (x % 2 == 0) { // due to the hexagonal grid, the neighbor indexes are different depending on even or odd rows
    if (x > 0 && grid[x - 1][y].active) count++;
    if (x < 24 && grid[x + 1][y].active) count++;
    if (x > 1 && grid[x - 2][y].active) count++;
    if (x < 22 && grid[x + 2][y].active) count++;
    if (x > 0 && y < 6 && grid[x - 1][y + 1].active) count++;
    if (x < 24 && y < 6 && grid[x + 1][y + 1].active) count++;
  } else if (x % 2 == 1) {
    if (x > 0 && grid[x - 1][y].active) count++;
    if (x < 23 && grid[x + 1][y].active) count++;
    if (x > 1 && grid[x - 2][y].active) count++;
    if (x < 22 && grid[x + 2][y].active) count++;
    if (x > 0 && y > 0 && grid[x - 1][y - 1].active) count++;
    if (x < 23 && y > 0 && grid[x + 1][y - 1].active) count++;
  }
  return count;
}

function updateGrid() {
  // let gridCopy = structuredClone(grid); // i tried this to duplicate the grid but it didn't work
  let gridCopy = [];
  // console.log(grid);
  for (i = 0; i < grid.length; i++) {
    gridCopy.push([]);
    for (j = 0; j < grid[i].length; j++) {
      // rules are implemented below
      if (grid[i][j].active) {
        if (countActiveNeighbors(i, j) < 3 || countActiveNeighbors(i, j) > 4) {
          gridCopy[i].push(false);
        } else {
          gridCopy[i].push(true);
        }
      } else {
        if (countActiveNeighbors(i, j) == 3 || countActiveNeighbors(i, j) == 4) {
          gridCopy[i].push(true);
        } else {
          gridCopy[i].push(false);
        }
      }
    }
  }
  for (i = 0; i < grid.length; i++) {
    for (j = 0; j < grid[i].length; j++) {
      grid[i][j].active = gridCopy[i][j];
    }
  }
  // console.log(grid);
  // console.log(gridCopy);
}

function mouseReleased() {
  mouseStateIsHighlighted = false;
}

function keyPressed() {
  if (keyCode == 32) {
    togglePlay();
  }
}

function togglePlay() {
  play = !play;
  keyPressFrame = frameCount;
}