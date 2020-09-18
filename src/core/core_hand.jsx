class CoreHand {
    constructor(cards) {
        this._cards = cards ? cards : [];
        Object.seal(this);
    }

    get cards() {return this._cards;}

    removeAt(index) {
        this._cards.splice(index, 1);
    }

    addAt(index, coreCard) {
        this._cards.splice(index, 0, coreCard);
    }

    // Make an independant copy of this class
    copy() {
        return new CoreHand(this._cards.map(c=>c.copy()));
    }
}

export { CoreHand }