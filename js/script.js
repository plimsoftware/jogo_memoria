const cards = document.querySelectorAll('.card');
const endGame = document.querySelector('.endGame');
const novoJogo = document.querySelector('.novoJogo');
const optionsWrapper = document.querySelector('.options-wrapper');
const options = document.querySelector('.options');
const buttonTheme = document.querySelectorAll('.b2');
const pawPatrolThemeGame = document.getElementById('pawpatrolthemeGame');
const marioThemeGame = document.getElementById('mariothemeGame');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let totalCards = 12;
let gameTheme = 'mariotheme';

// Options
optionsWrapper.addEventListener('click', clickOptionsWrapper);
options.addEventListener('click', clickOptions);

buttonTheme.forEach((button) => {
    button.addEventListener('click', changeTheme);
})

function clickOptionsWrapper() {
    optionsWrapper.style.display = 'none';
}

function clickOptions(event) {
    event.stopPropagation();;
}

function changeTheme(event) {
    gameTheme = event.currentTarget.id;

    if (gameTheme === 'mariotheme') {
        marioThemeGame.style.display = 'flex';
        pawPatrolThemeGame.style.display = 'none';
    } else {
        marioThemeGame.style.display = 'none';
        pawPatrolThemeGame.style.display = 'flex';
    }
    optionsWrapper.style.display = 'none';


}

function flipCard() {
    if(lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if(!hasFlippedCard) {
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
            endGame.style.display = 'flex';
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

function unflipCards () {
    lockBoard = true;

    setTimeout(()=> {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1100);

}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

cards.forEach((card) => {
    card.addEventListener('click', flipCard);
})

novoJogo.addEventListener('click', () => location.reload());

