//globals
let direction;
let start = document.querySelector('#start-button');
let food;
let interval;
let isPlaying = false;

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

//initialize snake
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
  if( event.which === 37) {
    // console.log('moving left!')
    if (direction === 'right') return;
    direction = 'left';
  } else if ( event.which === 39 ) {
    // console.log('moving right!')
    if (direction === 'left') return;
    direction = 'right';
  } else if ( event.which === 38 ) {
    // console.log( 'moving up!')
    if (direction === 'down') return;
    direction = 'up';
  } else if ( event.which === 40 ) {
    // console.log('moving down!')
    if (direction === 'up') return;
    direction = 'down';
  }
})

function moveSnake() {
  // console.log('direction: ', direction)
  isPlaying = true;
  let tailCoords = snake[0]
  let tail = document.querySelector(`[data-x='${tailCoords[0]}'][data-y='${tailCoords[1]}']`)
  let prevHead = head;

  if(direction === 'right') {
    head = document.querySelector(`[data-x='${parseInt(prevHead.dataset.x) + 1}'][data-y='${prevHead.dataset.y}']`)
    if (!head) return endGame();
    if (snake.find(coord => coord[0] === head.dataset.x && coord[1] === head.dataset.y) && isPlaying) return endGame();
    head.className = 'active';
    tail.className = 'cell';
  } else if(direction === 'left') {
      head = document.querySelector(`[data-x='${parseInt(prevHead.dataset.x) - 1}'][data-y='${prevHead.dataset.y}']`)
      if (!head) return endGame();
      if (snake.find(coord => coord[0] === head.dataset.x && coord[1] === head.dataset.y) && isPlaying) return endGame();
      head.className = 'active';
      tail.className = 'cell';
  } else if(direction === 'up') {
      head = document.querySelector(`[data-x='${prevHead.dataset.x}'][data-y='${parseInt(prevHead.dataset.y) - 1}']`)
      if (!head) return endGame();
      if (snake.find(coord => coord[0] === head.dataset.x && coord[1] === head.dataset.y) && isPlaying) return endGame();
      head.className = 'active';
      tail.className = 'cell';
  } else if(direction === 'down') {
      head = document.querySelector(`[data-x='${prevHead.dataset.x}'][data-y='${parseInt(prevHead.dataset.y) + 1}']`)
      if (!head) return endGame();
      if (snake.find(coord => coord[0] === head.dataset.x && coord[1] === head.dataset.y) && isPlaying) return endGame();
      head.className = 'active';
      tail.className = 'cell';
  }

  if (head.dataset.x === food.dataset.x && head.dataset.y === food.dataset.y) {
    eat();
  } else {
    snake.shift();
  }

  snake.push([head.dataset.x, head.dataset.y]);
}

//start button event listener
start.addEventListener('click', () => {
  let snakeCells = document.querySelectorAll('.active');
  clearInterval(interval);
  direction = 'right'
  snakeCells.forEach(cell => cell.className = '.cell');
  head = document.querySelector('#start');
  head.className = 'active';
  snake = [];
  startSnake();
  interval = setInterval(moveSnake, 150);
  dropPellet();
})



//food pellet randomizer
function dropPellet() {
  let x = Math.floor(Math.random() * 20)
  let y = Math.floor(Math.random() * 20)
  if (snake.find(coord => coord[0] === x.toString() && coord[1] === y.toString())) {
    console.log("RETRY")
    dropPellet();
  } else {
    food = document.querySelector(`[data-x='${x}'][data-y='${y}']`);
    food.className = 'active';
  }
}

function eat() {
  dropPellet();
}

startSnake();

//game end function
function endGame() {
  clearInterval(interval)
  isPlaying = false;
  alert("Game Over")
}
