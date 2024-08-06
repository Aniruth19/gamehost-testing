const board = document.getElementById('board');
const restartButton = document.getElementById('restart-button');

let cards = [];
let cardValues = [];
let flippedCards = [];
let matchedPairs = 0;
const cardValuesArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function initializeGame() {
    cards = [];
    cardValues = [];
    flippedCards = [];
    matchedPairs = 0;

    // Generate pairs of card values
    let values = [...cardValuesArray, ...cardValuesArray];
    values = shuffle(values);

    // Create card elements
    board.innerHTML = '';
    values.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', value);
        card.setAttribute('data-index', index);
        card.addEventListener('click', handleCardClick);
        board.appendChild(card);
        cards.push(card);
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function handleCardClick(event) {
    const card = event.target;
    if (card.classList.contains('flipped') || flippedCards.length === 2) {
        return;
    }

    card.classList.add('flipped');
    card.textContent = card.getAttribute('data-value');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.getAttribute('data-value') === card2.getAttribute('data-value')) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        if (matchedPairs === cardValuesArray.length) {
            setTimeout(() => alert('Congratulations! You won!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
        }, 1000);
    }
    flippedCards = [];
}

restartButton.addEventListener('click', initializeGame);

initializeGame(); // Initialize the game when the page loads
