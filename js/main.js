const $gameStart = document.querySelector('#startGame');
const $gameMenu = document.querySelector('.game__menu');
const $gameFieldWrapper = document.querySelector('.game__field-wrapper');
const $gameField = document.querySelector('.game__field');
const $gameCounter = document.querySelector('.game__counter');
const $gameSetTime = document.querySelector('#time');
const $timeLeft = document.querySelector('#timeleft');
const $gameStop = document.querySelector('.game__stop');
const $difficulty = document.querySelector('#difficulty');
const $lastResult = document.querySelector('#last-result');
const $bestResult = document.querySelector('#best-result');

let counter;
let time;
let elSize;
let best = '';

$difficulty.addEventListener('change', changeSize);
$gameStart.addEventListener('click', startGame);
$gameStop.addEventListener('click', stopGame);
$gameField.addEventListener('click', e => e.target.dataset.el && clickEl());

if (localStorage.getItem('bestResult')) {
  $bestResult.textContent = localStorage.getItem('bestResult');
}

function startGame() {
  $gameMenu.classList.add('hidden');
  $gameFieldWrapper.classList.remove('hidden');
  counter = 0;
  time = $gameSetTime.value;
  $timeLeft.textContent = time;
  $gameCounter.textContent = counter;
  changeSize();
  createEl();
  timer();
}

function changeSize() {
  switch ($difficulty.value) {
    case '1':
      elSize = '50px';
      break;
    case '2':
      elSize = '30px';
      break;
    case '3':
      elSize = '10px';
      break;

    default:
      elSize = '50px';
      break;
  }
}

function timer() {
  const timeLeftTimer = setInterval(() => {
    time = time - 0.1;
    $timeLeft.textContent = time.toFixed(1);
    if (time <= 0) {
      stopGame();
      clearInterval(timeLeftTimer);
    }
  }, 100);
  $gameStop.addEventListener('click', () => {
    stopGame();
    clearInterval(timeLeftTimer);
  });
}

function stopGame() {
  $gameMenu.classList.remove('hidden');
  $gameFieldWrapper.classList.add('hidden');
  lastResult(counter);
  time = $gameSetTime.value;
  $timeLeft.textContent = time;
}

function clickEl() {
  counter++;
  $gameCounter.textContent = counter;
  createEl();
}

function createEl() {
  const circle = document.createElement('div');

  $gameField.innerHTML = '';

  circle.setAttribute('data-el', true);
  circle.classList.add('game__el');
  circle.style.top = random(0, 100) + '%';
  circle.style.left = random(0, 100) + '%';
  circle.style.width = circle.style.height = elSize;

  $gameField.insertAdjacentElement('afterbegin', circle);
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function lastResult(res) {
  $lastResult.textContent = (res / $gameSetTime.value).toFixed(4);
  bestResult(res);
}

function bestResult(res) {
  if (
    best === '' ||
    (res / $gameSetTime.value).toFixed(4) >= localStorage.getItem('bestResult')
  ) {
    best = (res / $gameSetTime.value).toFixed(4);
  }
  $bestResult.textContent = best;
  localStorage.setItem('bestResult', best);
}
