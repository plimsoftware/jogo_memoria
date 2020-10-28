import * as serviceWorker from '../serviceWorker';

const cards = document.querySelectorAll('.card');
const endGame = document.querySelector('.endGame');
const novoJogo = document.querySelector('.novoJogo');
const optionsWrapper = document.querySelector('.options-wrapper');
const options = document.querySelector('.options');
const optionButton = document.querySelector('.optionButton');
const buttonTheme = document.querySelectorAll('.b2');
const pawPatrolThemeGame = document.getElementById('pawpatrolthemeGame');
const marioThemeGame = document.getElementById('mariothemeGame');

let hasFlippedCard = false;
let firstCard;
let secondCard;
let lockBoard = false;
let totalCards = 12;
let gameTheme = 'mariotheme';

function restartGame() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
  totalCards = 12;

  cards.forEach((card) => {
    card.classList.remove('flip');
    card.removeEventListener('click', flipCard);
    shuffle();
  });

  cards.forEach((card) => {
    card.addEventListener('click', flipCard);
  });
}

// ===== Options =====
function clickOptionsWrapper() {
  optionsWrapper.style.display = 'none';
}

function optionMenu() {
  optionsWrapper.style.display = 'flex';
}

function clickOptions(event) {
  event.stopPropagation();
}

function changeTheme(event) {
  gameTheme = event.currentTarget.id;

  if (gameTheme === 'mariotheme') {
    marioThemeGame.style.display = 'flex';
    pawPatrolThemeGame.style.display = 'none';
    document.body.style.backgroundImage = "url('./img/background.jpg')";
  } else {
    marioThemeGame.style.display = 'none';
    pawPatrolThemeGame.style.display = 'flex';
    document.body.style.backgroundImage = "url('./img/backgroundPaw.jpg')";
  }

  optionsWrapper.style.display = 'none';
  restartGame();
}

optionsWrapper.addEventListener('click', clickOptionsWrapper);
options.addEventListener('click', clickOptions);
optionButton.addEventListener('click', optionMenu);

buttonTheme.forEach((button) => {
  button.addEventListener('click', changeTheme);
});
// =========== End Options ==================

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  hasFlippedCard = false;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    disableCards();
    totalCards -= 2;
    console.log(totalCards);
    if (totalCards === 0) {
      setTimeout(() => {
        endGame.style.display = 'flex';
      }, 1100);
    }

    return;
  }

  unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1100);
}

function shuffle() {
  cards.forEach((card) => {
    const randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

shuffle();

cards.forEach((card) => {
  card.addEventListener('click', flipCard);
});

novoJogo.addEventListener('click', () => {
  restartGame();
  endGame.style.display = 'none';
});

serviceWorker.register();
