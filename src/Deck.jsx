// Work in progress

// Copied from richardl62.github.io\games\lib\tools\tools.js
function shuffleArray(array) {
    // From https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

class Deck {
  constructor() {
    this._cards = [];
    for (let i = 0; i < 52; ++i) {
      this._cards.push(i);
    }
  }

  addJokers(num = 2) {
    for (let i = 0; i < num; ++i) {
      this._cards.push('joker');
    }
  }

  shuffle() {
    shuffleArray(this._cards);
  }

  draw(num = 1) {
    return this._cards.splice(0, num);
  }
};

export default Deck;
