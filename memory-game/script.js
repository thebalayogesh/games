const board = document.getElementById('board');
const movesText = document.getElementById('moves');
const restartBtn = document.getElementById('restartBtn');
const winText = document.createElement('h2');

const state = {
    cards: [],
    flippedCards: [],
    matched: [],
    moves: 0,
    locked: false,
    isGameFinished: false,
};

// console.log(state);

function createCards() {
    const values = [
        'A',
        'A',
        'B',
        'B',
        'C',
        'C',
        'D',
        'D',
        'E',
        'E',
        'F',
        'F',
        'G',
        'G',
        'H',
        'H',
    ];
    state.cards = values.sort(() => Math.random() - 0.5);
}

function renderBoard() {
    board.innerHTML = '';
    winText.innerHTML = '';

    state.cards.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');

        if (
            state.flippedCards.includes(index) ||
            state.matched.includes(index)
        ) {
            card.classList.add('flipped');
            card.textContent = value;
        }

        if (state.matched.includes(index)) {
            card.classList.add('matched');
        }

        card.addEventListener('click', () => onCardClick(index));
        board.appendChild(card);
    });

    movesText.textContent = `Moves: ${state.moves}`;

    if (state.isGameFinished) {
        winText.innerHTML = `you win with ${state.moves} moves.`;
        board.appendChild(winText);
    }
}

function onCardClick(index) {
    if (state.locked) return;
    if (state.flippedCards.includes(index)) return;
    if (state.matched.includes(index)) return;
    if (state.isGameFinished) return;

    state.flippedCards.push(index);

    if (state.flippedCards.length === 2) {
        state.moves++;
        checkMatch();
    }

    renderBoard();
    console.table(state);
}

function checkMatch() {
    const [first, second] = state.flippedCards;

    if (state.cards[first] === state.cards[second]) {
        state.matched.push(first, second);

        if (state.matched.length === state.cards.length) {
            console.log(`you win with ${state.moves} moves.`);
            state.isGameFinished = true;
            state.locked = true;
        }

        state.flippedCards = [];
    } else {
        state.locked = true;

        setTimeout(() => {
            if (state.isGameFinished) return;

            state.flippedCards = [];
            state.locked = false;
            renderBoard();
        }, 800);
    }
}

restartBtn.addEventListener('click', () => {
    state.cards = [];
    state.flippedCards = [];
    state.matched = [];
    state.moves = 0;
    state.locked = false;

    console.log('Hello');

    createCards();
    renderBoard();
});
