//selector for grid cells
let cells = document.querySelectorAll('.cell');

//create coordinate matrix
let coords = [];
for (let i = 0; i < 20; i++) {
  for (let j = 0; j < 20; j++) {
    coords.push([i, j]);    
  }
}

//set dataset ids for cell divs
cells.forEach(cell => {
  let cellCoords = coords.shift();
  cell.dataset.y = cellCoords[0];
  cell.dataset.x = cellCoords[1];
})

//movement function
let active = document.querySelector('#start');
active.className = 'active';

function moveSnake() {
  let prev = active;
  active = document.querySelector(`[data-x='${parseInt(prev.dataset.x) + 1}'][data-y='${prev.dataset.y}']`)
  
  active.className = 'active';
  prev.className = 'cell';
}

// setInterval(moveSnake(), 1000)
