import { fullPack, makeJoker } from './core_card';

class CoreDeck {
  constructor() {
    this._nextJoker = 0;
    this._cards = [...fullPack];
  }

  addJokers(num = 2) {
    for (let i = 0; i < num; ++i) {
      this._cards.push(makeJoker(this._nextJoker));
      ++this._nextJoker;
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

  draw(num = 1) {
    return this._cards.splice(0, num);
  }
};

export { CoreDeck } ;
