import React from 'react';
import { CoreCardSet } from './core';
import { CardSet } from './render';

class CoreCommonArea {
    constructor() {
        this.cardSetNames = [];
    }

    includes(name) {
        return this.cardSetNames.includes(name);
    }

    setInitialState() {
        return this._addEmptyDeck()
    }

    processDragStateChange(stateChange) {

        const [lastSet] = this.cardSetNames.slice(-1);

        if(stateChange[lastSet] && stateChange[lastSet].cards.length > 0) {
            return this._addEmptyDeck();
        }

        return {};
    }

    _addEmptyDeck() {
        const name = "commonArea" + this.cardSetNames.length;

        let cardSet = new CoreCardSet();
        cardSet.name(name);
        cardSet.accessTopCardOnly(true);

        this.cardSetNames.push(name);

        //console.log("extended common area", cardSet.name(), cardSet.cards)

        let state = {};
        state[name] = cardSet;

        return state;
    }

};

function CommonArea(props) {
    const { coreCommonArea, gameState } = props;
    // console.log("CommonArea card sets", coreCardSets);
    // console.log("CommonArea card set names", coreCardSets.map(set => set.name()));
    // console.log("CommonArea card set cards", coreCardSets.map(set => set.cards));


    return (
        <div className="common-area">
            {coreCommonArea.cardSetNames.map(name =>    
                <CardSet key={name} coreCardSet={gameState[name]} direction="vertical" />
            )}
        </div>
    );
}

export { CommonArea, CoreCommonArea };
