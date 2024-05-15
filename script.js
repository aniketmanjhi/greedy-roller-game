'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // another way to select id using getElementById
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const name0El = document.getElementById('name--0');
const bame1El = document.getElementById('name--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const btnInfo = document.querySelector('.instruction');
const model = document.querySelector('.model');
const mainGame = document.querySelector('.mainGame');
// Starting Conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate randome dice number
    const randomDice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./src/dice-${randomDice}.png`;

    // 3. Check for reload 1
    if (randomDice !== 1) {
      // Add dice to current score
      currentScore += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Holding score funtionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to current player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    // Finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      // Declare Winner/Loser
      document.querySelector(`#name--${activePlayer}`).textContent = 'Winner';
      activePlayer = activePlayer === 0 ? 1 : 0;
      document.querySelector(`#name--${activePlayer}`).textContent = 'Loser';
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Reseting functionality

btnNew.addEventListener('click', function () {
  init();
});

// Instruction window

btnInfo.addEventListener('click', function () {
  model.classList.toggle('hide');
  mainGame.classList.toggle('hide');
});
