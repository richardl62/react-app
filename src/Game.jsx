import React from 'react';
import {Hand, HandData} from './Hand';
import Deck from './Deck';
import {DragDropContext} from 'react-beautiful-dnd';

class Game extends React.Component {

    constructor() {
        super();

        this._deck = new Deck();
        this.state = {}
        this.state = {};


        let d = this._deck;
        d.addJokers();
        d.shuffle();

        this.state.player1 = new HandData(d.draw(6));
        this.state.commonArea = new HandData([]);
        this.state.player2 = new HandData(d.draw(6));
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
            let h = <Hand id={name} key={name} cards={this.state[name].cardIds} />
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
