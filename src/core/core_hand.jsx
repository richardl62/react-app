class CoreHand {
    constructor(cardIds) {
        this._cardIds = cardIds;
        Object.seal(this);
    }

    get cardIds() {return this._cardIds;}

    removeAt(index) {
        this._cardIds.splice(index, 1);
    }

    addAt(index, id) {
        this._cardIds.splice(index, 0, id);
    }

    // Make an independant copy of this class
    copy() {
        return new CoreHand([...this._cardIds]);
    }
}

export { CoreHand }