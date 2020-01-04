//globals
let direction = 'right'
let start = document.querySelector('#start-button')

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

//snake array
let snake = [];

function startSnake() {
  snake.unshift([head.dataset.x, head.dataset.y]);
  for (let i = 1; i < 4; i++) {
    let cell = document.querySelector(`[data-x='${parseInt(head.dataset.x) - i}'][data-y='${head.dataset.y}']`);
    snake.unshift([cell.dataset.x, cell.dataset.y]);
    cell.className = 'active';
  }
}

//movement function
let head = document.querySelector('#start');
head.className = 'active';

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
  // console.log('direction: ', direction)
  let tailCoords = snake.shift();
  let tail = document.querySelector(`[data-x='${tailCoords[0]}'][data-y='${tailCoords[1]}']`)
  let prevHead = head;
  if(direction === 'right') {
    prevHead = head
    head = document.querySelector(`[data-x='${parseInt(prevHead.dataset.x) + 1}'][data-y='${prevHead.dataset.y}']`)
  
    head.className = 'active';
    tail.className = 'cell';
  } else if(direction === 'left') {
      prevHead = head;

      head = document.querySelector(`[data-x='${parseInt(prevHead.dataset.x) - 1}'][data-y='${prevHead.dataset.y}']`)
      head.className = 'active';
      tail.className = 'cell';
  } else if(direction === 'up') {
      prevHead = head;

      head = document.querySelector(`[data-x='${prevHead.dataset.x}'][data-y='${parseInt(prevHead.dataset.y) - 1}']`)
      head.className = 'active';
      tail.className = 'cell';
  } else if(direction === 'down') {
      prevHead = head;

      head = document.querySelector(`[data-x='${prevHead.dataset.x}'][data-y='${parseInt(prevHead.dataset.y) + 1}']`)
      head.className = 'active';
      tail.className = 'cell';
  }

  snake.push([head.dataset.x, head.dataset.y]);

}


//start button event listener
start.addEventListener('click', () => {
  startSnake();
  setInterval(moveSnake, 1000);
})

//food pellet randomizer
function dropPellet() {

}


