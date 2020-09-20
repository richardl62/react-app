class CoreDeck {
  constructor() {
    this._cards = [];
  }

  add(...toAdd) {
    for (let item of toAdd) {
      if (Array.isArray(item)) {
        this._cards.push(...item);
      } else {
        this._cards.push(item);
      }
    }
  }

  shuffle() {
        // Copied from richardl62.github.io\games\lib\tools\tools.js
        // Origianally From https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        let array = this._cards;

        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }

  draw(num) {
    return this._cards.splice(0, num);
  }
};

export { CoreDeck } ;
