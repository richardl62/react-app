class CoreHand {
    constructor(cards) {
        this._cards = cards ? cards : [];
        this._showBacks = false;
        Object.seal(this);
    }

    get cards() {return this._cards;}

    removeAt(index) {
        this._cards.splice(index, 1);
    }

    addAt(index, coreCard) {
        this._cards.splice(index, 0, coreCard);
    }

    get showBacks() {return this._showBacks;}
    set showBacks(show) {this._showBacks = show;}
    
    // Make an independent copy of this class
    copy() {
        let cp = new CoreHand(this._cards.map(c=>c.copy()));
        cp.showBacks = this.showBacks;
        
        return cp;
    }
}

export { CoreHand }