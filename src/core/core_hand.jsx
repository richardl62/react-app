class CoreCardSet {
    constructor(cards) {
        this._cards = cards ? cards : [];
        this._showBacks = false;
        Object.seal(this);
    }

    get cards() {return this._cards;}

    get showBacks() {return this._showBacks;}
    set showBacks(show) {this._showBacks = show;}
    
    add(...toAdd) {
        for (let item of toAdd) {
            if (Array.isArray(item)) {
                this._cards.push(...item);
            } else {
                this._cards.push(item);
            }
        }
    }

    removeAt(index) {
        this._cards.splice(index, 1);
    }

    addAt(index, coreCard) {
        this._cards.splice(index, 0, coreCard);
    }

    draw(num) {
        return this._cards.splice(0, num);
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

    // Make an independent copy of this class
    copy() {
        let cp = new CoreCardSet(this._cards.map(c => c.copy()));
        cp.showBacks = this.showBacks;

        return cp;
    }
}

export { CoreCardSet }