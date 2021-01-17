const gameContainer = document.querySelector('.game-container');
const wonBox = document.querySelector('.won-box');
const btn = document.querySelector('.btn');
const message = document.querySelector('#message');
const score = document.querySelector('.score');
const timerEl = document.querySelector('#timer');

btn.addEventListener('click', () => {
    wonBox.classList.remove('active');
    window.location.reload();
});

const options = [
    {
        'name': 'bird',
        'img': './images/bird.jpg'
    },
    {
        'name': 'bird',
        'img': './images/bird.jpg'
    },
    {
        'name': 'bubble',
        'img': './images/bubble.jpg'
    },
    {
        'name': 'bubble',
        'img': './images/bubble.jpg'
    },
    {
        'name': 'night',
        'img': './images/night.jpg'
    },
    {
        'name': 'night',
        'img': './images/night.jpg'
    },
    {
        'name': 'trees',
        'img': './images/trees.jpg'
    },
    {
        'name': 'trees',
        'img': './images/trees.jpg'
    },
    {
        'name': 'turtle',
        'img': './images/turtle.jpg'
    },
    {
        'name': 'turtle',
        'img': './images/turtle.jpg'
    },
    {
        'name': 'wolf',
        'img': './images/wolf.jpg'
    },
    {
        'name': 'wolf',
        'img': './images/wolf.jpg'
    },
];

options.sort(() => Math.random() - 0.5);

const defaultImg = './images/question.svg';

let chosenCard = [];
let chosenCardId = [];
let cardsWon = [];

let won = false;

createGameTable();

function createGameTable() {
    for(let i = 0; i < options.length; i++) {
        let card = document.createElement('img');
        card.src = defaultImg;
        card.id = i;

        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    }

    countdown();
}

function flipCard() {
    let cardId = this.id;
    chosenCard.push(options[cardId].name);
    chosenCardId.push(cardId);

    this.src = options[cardId].img;

    if(chosenCard.length === 2) {
        setTimeout(checkMatch, 350);
    }
}

function checkMatch() {
    const imgs = document.querySelectorAll('img');
    let firstChoice = chosenCard[0];
    let secondChoice = chosenCard[1];
    let firstChoiceId = chosenCardId[0];
    let secondChoiceId = chosenCardId[1];
    if(firstChoice === secondChoice) {
        cardsWon.push(chosenCard);
        score.innerHTML = `Score: ${cardsWon.length}`;
    } else {
        imgs[firstChoiceId].src = defaultImg;
        imgs[secondChoiceId].src = defaultImg;
    }

    if(cardsWon.length === options.length / 2) {
        won = true;
        message.innerText = 'Congratulations! You won!';
        btn.innerText = 'Play Again';
        wonBox.classList.add('active');
    }

    chosenCard = [];
    chosenCardId = [];
}

function countdown() {
    let seconds = +timerEl.innerText;

    const timer = setInterval(() => {

        seconds--;

        if(seconds < 10 && seconds >= 0) {
            seconds = `0${seconds}`;
        }

        if(seconds <= 0) {
            clearInterval(timer);
            
            message.innerText = 'You ran out of time!';
            btn.innerText = 'Try Again';
            wonBox.classList.add('active'); 
        }

        if(won) {
            clearInterval(timer);
        }

        timerEl.innerText = seconds;

    }, 1000);
}