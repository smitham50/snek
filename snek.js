//globals
let direction = 'right'

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

//direction handling
document.addEventListener('keydown', (event) => {
  console.log('event code: ', event.code, event.which)
  if( event.which === 37) {
    // console.log('moving left!')
    direction = 'left'
  } else if ( event.which === 39 ) {
    // console.log('moving right!')
    direction = 'right'
  } else if ( event.which === 38 ) {
    // console.log( 'moving up!')
    direction = 'up'
  } else if ( event.which === 40 ) {
    // console.log('moving down!')
    direction = 'down'
  }
})

function moveSnake() {
  console.log('direction: ', direction)
  let prev = active;
  if(direction === 'right') {
    prev = active
    active = document.querySelector(`[data-x='${parseInt(prev.dataset.x) + 1}'][data-y='${prev.dataset.y}']`)

    active.className = 'active';
    prev.className = 'cell';
  } else if(direction === 'left') {
      prev = active;

      active = document.querySelector(`[data-x='${parseInt(prev.dataset.x) - 1}'][data-y='${prev.dataset.y}']`)
      active.className = 'active';
      prev.className = 'cell';
  } else if(direction === 'up') {
      prev = active;

      active = document.querySelector(`[data-x='${prev.dataset.x}'][data-y='${parseInt(prev.dataset.y) - 1}']`)
      active.className = 'active';
      prev.className = 'cell';
  } else if(direction === 'down') {
      prev = active;

      active = document.querySelector(`[data-x='${prev.dataset.x}'][data-y='${parseInt(prev.dataset.y) + 1}']`)
      active.className = 'active';
      prev.className = 'cell';
  }

}

// setInterval(moveSnake(), 1000)
