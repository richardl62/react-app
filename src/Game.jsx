import React from 'react';
import { RenderHand } from './render';
import { CoreHand, CoreDeck } from './core';
import {DragDropContext} from 'react-beautiful-dnd';

class Game extends React.Component {

    constructor() {
        super();

        this._deck = new CoreDeck();
        this.state = {}
        this.state = {};


        let d = this._deck;
        d.addJokers();
        d.shuffle();

        this.state.player1 = new CoreHand(d.draw(6));
        this.state.commonArea = new CoreHand([]);
        this.state.player2 = new CoreHand(d.draw(6));
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
            parseInt(draggableId));

        this.setState(newState);
    }

    render() {

        let hands = [];
        for(let name in this.state) {
            let h = <RenderHand id={name} key={name} cards={this.state[name].cardIds} />
            hands.push(h);
         }
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="game"> 
                    { [...hands]}
                </div>
            </DragDropContext>
        );
    }
}

export default Game;
