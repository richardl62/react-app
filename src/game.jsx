import React from 'react';
import { CoreCardGenerator, CoreCardSet } from './core';
import { RenderCardSet } from './render';
import { DragDropContext } from 'react-beautiful-dnd';

class Game extends React.Component {

    constructor() {
        super();
        this.state = {}

        let gen =  new CoreCardGenerator();

        this.state.available = new CoreCardSet(gen.decks(2), gen.jokers(4));
        
        let available = this.state.available;
        available.shuffle();

        this.state.player1 = new CoreCardSet(available.draw(6));
        this.state.player2 = new CoreCardSet(available.draw(6));
        this.state.commonArea = new CoreCardSet();
    
        this.state.player2.showBacks = true;
    }

    onDragEnd = result => {
        const { source, destination } = result;
     
        if (!destination) {
            return;
        }


        // Copy the state to be changed.  (Inefficient but OK when source === distination)
        let newState = {};
        newState[source.droppableId] = this.state[source.droppableId].copy();
        newState[destination.droppableId] = this.state[destination.droppableId].copy();
        
        let dragged = newState[source.droppableId].removeAt(source.index);
        if(!dragged) {
            throw Error('Cannot find card to move during drag');
        }
        newState[destination.droppableId].addAt(destination.index, dragged);

        this.setState(newState);
    }

    render() {

        const renderCardSet = name => {
            let coreCardSet = this.state[name];
            if(!(coreCardSet instanceof CoreCardSet)) {
                throw Error(`Unrecognised card set name ${name}`);
            }
            return <RenderCardSet id={name} key={name} coreCardSet={coreCardSet} showBack={coreCardSet.showBacks} />
        };


        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="game"> 
                    {renderCardSet('player1')}
                    {renderCardSet('commonArea')};
                    {renderCardSet('player2')}
                </div>
            </DragDropContext>
        );
    }
}

export default Game;
