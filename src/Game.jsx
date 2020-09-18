import React from 'react';
import { RenderHand } from './render';
import { CoreHand, CoreDeck, CoreCard } from './core';
import {DragDropContext} from 'react-beautiful-dnd';

class Game extends React.Component {

    constructor() {
        super();

        this._deck = new CoreDeck();
        let d = this._deck;
        d.addPack();
        d.addJokers(2);
        d.shuffle();
        this.state = {
            player1: new CoreHand(d.draw(6)),
            // commonArea: new CoreHand(),
            player2: new CoreHand(d.draw(6)),
        }
    }

    onDragEnd = result => {
        const { source, destination, draggableId } = result;
     
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId
            && source.index === destination.index) {
            return;
        }

        let newState = {};
        for (const [key, value] of Object.entries(this.state)) {
            newState[key] = value.copy();
        }

        newState[source.droppableId].removeAt(source.index);
        newState[destination.droppableId].addAt(destination.index, 
            new CoreCard(parseInt(draggableId)));

        this.setState(newState);
    }

    render() {

        const hands = Object.entries(this.state).map(entry => {
            const [name, coreHand] = entry;
            return <RenderHand id={name} key={name} coreHand={coreHand} />
        });


        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="game"> 
                    {
                    [...hands]
                    }
                </div>
            </DragDropContext>
        );
    }
}

export default Game;
