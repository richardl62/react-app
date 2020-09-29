import React from 'react';
import { RenderCardSet } from './render';


export function CommonArea(props) {
    const { coreCardSetsNames, gameState } = props;
    // console.log("CommonArea card sets", coreCardSets);
    // console.log("CommonArea card set names", coreCardSets.map(set => set.name()));
    // console.log("CommonArea card set cards", coreCardSets.map(set => set.cards));


    return (
        <div className="common-area">
            {coreCardSetsNames.map(name =>    
                <RenderCardSet key={name} coreCardSet={gameState[name]} direction="vertical" />
            )}
        </div>
    );
}
