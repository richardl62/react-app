import React from 'react';
import { CoreCard, CoreCardGenerator, CoreCardSet } from './core';
import { RenderCardSet } from './render';
import {DragDropContext} from 'react-beautiful-dnd';

class Game extends React.Component {

    constructor() {
        super();

        this._generator = new CoreCardGenerator();
        this._availableCards = new CoreCardSet();

        let gen = this._generator;
        let available = this._availableCards;

        available.add(gen.decks(2), gen.jokers(4));
        available.shuffle();

        this.state = {
            player1: new CoreCardSet(available.draw(8)),
            commonArea: new CoreCardSet(),
            player2: new CoreCardSet(available.draw(8)),
        }

        this.state.player2.showBacks = true;
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

        const cardSets = Object.entries(this.state).map(entry => {
            const [name, coreCardSet] = entry;
            return <RenderCardSet id={name} key={name} coreCardSet={coreCardSet} showBack={coreCardSet.showBacks} />
        });


        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="game"> 
                    {
                    [...cardSets]
                    }
                </div>
            </DragDropContext>
        );
    }
}

export default Game;
