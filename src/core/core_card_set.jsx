import { CoreCard } from './core_card'; // For type checking

class CoreCardSet {
    constructor(cards) {
        this._cards = cards ? cards : [];
        this._props = {
            showBacks: false,
            accessTopCardOnly: false,
        };
        Object.seal(this);
    }

    get cards() {return this._cards;}

    showBacks(on) {
        if(on !== undefined) {
            this._props.showBacks = on;
        }
        return this._props.showBacks;
    }

    accessTopCardOnly(on) {
        if(on !== undefined) {
            this._props.accessTopCardOnly = on;
        }
        return this._props.accessTopCardOnly;
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

    removeAt(index) {
        return this._cards.splice(index, 1)[0];
    }

    addAt(index, coreCard) {
        if(!(coreCard instanceof CoreCard) ) {
            throw Error(`Bad coreCard given to addAt ${coreCard}`)
        }
        this._cards.splice(index, 0, coreCard);
    }

    draw(num) {
        return new CoreCardSet(this._cards.splice(0, num));
      }

    get(num) {
        return new CoreCardSet(this._cards.slice(0, num));
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
        cp._props = {...this._props};

        return cp;
    }
}

export { CoreCardSet }
