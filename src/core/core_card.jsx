// In array elements the 'real' name cone first.  The other elements are aliases.
const ranksNames = [
    ['ace', '1'], '2', '3', '4', '5', '6', '7', '8', '9', '10',
    ['jack', 'j'], ['queen', 'q'], ['king', 'k']
];
const suitNames = [['club', 'clubs', 'c'], ['diamond', 'diamonds', 'd'], ['heart', 'hearts', 'h'],
['spade', 'spades', 's']];
const jokerNames = [['joker-1', 'joker', 'j-1', 'j'], ['joker-2', 'j-2']];

const deckSize = 52; // Excluded Jokers

const fullPack = (() => {
    let array = [];
    for (let i = 0; i < deckSize; ++i) {
        array.push(i);
    }
    return array;
})();

function makeJoker(jokerNumber) {
    return "joker" + jokerNumber;
}

class NamesAndIndices {

    constructor(names) {
        this._names = names;
        Object.freeze(this);
    }

    get length() { return this._names.length; }

    // Returns null if 'index' is not a valid index. (Later code relies on this.)
    getByIndex(index) {
        const elem = this._names[index];
        if (elem) {
            return {
                index: index,
                name: typeof elem == "string" ? elem : elem[0],
            };
        }
        return null;
    }

    getByName(name_) {
        const name = name_.toLowerCase();
        const isMatch = elem => {
            if (typeof elem === "string") {
                return elem === name;
            } else {
                // If elem is not a string it must be an array
                return elem.includes(name);
            }
        };

        const index = this._names.findIndex(isMatch);
        return this.getByIndex(index);
    }
}

const ranks = new NamesAndIndices(ranksNames);
const suits = new NamesAndIndices(suitNames);
const jokers = new NamesAndIndices(jokerNames);

class CoreCard {
    // The parameter can be a 
    // - a name like '1-club', 'q-h'. 'king-spade', 'joker1'  (case insensative)
    // - a number in range [0, number-of-cards)
    constructor(nameOrNumber) {
        if (typeof nameOrNumber === "number")
            this._setFromNumber(nameOrNumber);
        else if (typeof nameOrNumber === "string")
            this._setFromName(nameOrNumber);
    }

    get rank() { return this._rank; }
    get suit() { return this._suit; }
    get joker() { return this._joker; }

    isJoker() { return Boolean(this._joker); }
    isRegular() { return Boolean(this._suit && this._rank); }
    isSet() { return this.isJoker() || this.isRegular(); };

    longName() {
        if (this.isJoker()) {
            return this._joker.name;
        } else {
            return `${this._rank.name} of ${this._suit.name}s`;
        }
    }

    _setFromNumber(num) {
        // Kludge? Relies on getByIndex returning null when passed a bad index
        this._suit = suits.getByIndex(Math.floor(num / ranks.length));
        this._rank = this._suit ? ranks.getByIndex(num % ranks.length) : null;
        this._joker = jokers.getByIndex(num - ranks.length * suits.length);
    }

    _setFromName(name) {

        this._rank = null;
        this._suits = null;

        this._joker = jokers.getByName(name);
        if (!this._joker) {
            const [r, s] = name.split("-");
            const rank = ranks.getByName(r);
            const suit = suits.getByName(s);

            if (rank && suit) {
                this._rank = rank;
                this._suit = suit;
            }
        }
    }
}

export { CoreCard, fullPack, makeJoker };
