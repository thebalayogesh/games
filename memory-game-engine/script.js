import { MemoryGame } from './gameEngine.js';

const board = document.getElementById('board');
const movesText = document.getElementById('moves');
const restartBtn = document.getElementById('restart');

let game = new MemoryGame();

function render() {
    board.innerHTML = '';

    game.cards.forEach((value, index) => {
        const card = document.createElement('div');
        card.className = 'card';

        if (game.flippedCards.includes(index) || game.matched.includes(index)) {
            card.classList.add('flipped');
            card.textContent = value;
        }

        if (game.matched.includes(index)) {
            card.classList.add('matched');
        }

        card.onclick = () => {
            game.handleCardClick(index);
            render();
            handleTurnResult();
        };

        board.appendChild(card);
    });

    movesText.textContent = `Moves: ${game.moves}`;

    if (game.turnResult === 'win') {
        movesText.textContent = `🎉 You won in ${game.moves} moves!`;
    }
}

function handleTurnResult() {
    if (game.turnResult === 'mismatch') {
        setTimeout(() => {
            game.resolveTurn();
            render();
        }, 800);
    }

    if (game.turnResult === 'match') {
        game.resolveTurn();
        render();
    }
}

restartBtn.onclick = () => {
    game = new MemoryGame();
    render();
};

render();
