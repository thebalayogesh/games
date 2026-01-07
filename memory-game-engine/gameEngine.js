export class MemoryGame {
    constructor() {
        this.cards = [];
        this.flippedCards = [];
        this.matched = [];
        this.moves = 0;
        this.locked = false;
        this.isGameFinished = false;
        this.turnResult = 'none';

        this._createCards();
    }

    _createCards() {
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
        this.cards = values.sort(() => Math.random() - 0.5);
    }

    handleCardClick(index) {
        if (this.locked) return;
        if (this.isGameFinished) return;
        if (this.flippedCards.includes(index)) return;
        if (this.matched.includes(index)) return;

        this.turnResult = 'none';
        this.flippedCards.push(index);

        if (this.flippedCards.length === 2) {
            this.moves++;
            const [first, second] = this.flippedCards;

            if (this.cards[first] === this.cards[second]) {
                this.matched.push(first, second);
                this.turnResult = 'match';

                if (this.matched.length === this.cards.length) {
                    this.isGameFinished = true;
                    this.locked = true;
                    this.turnResult = 'win';
                }
            } else {
                this.locked = true;
                this.turnResult = 'mismatch';
            }
        }
    }

    // 🔑 UI calls this AFTER delay or immediately on match
    resolveTurn() {
        this.flippedCards = [];
        this.locked = false;
        this.turnResult = 'none';
    }
}
