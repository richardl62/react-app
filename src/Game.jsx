import React from 'react';
import Hand from './Hand';
import Deck from './Deck';
import {DragDropContext} from 'react-beautiful-dnd';

class Game extends React.Component {
  render() {

    let d = new Deck();
    d.addJokers();
    d.shuffle();

    const hand1 = d.draw(6);
    const hand2 = d.draw(6);

    return (
        <DragDropContext>
            <div className="game">
                <Hand key="hand1" cards={hand1} />
                <div className="playing-area" />
                <Hand key="hand2" cards={hand2} />
            </div>
        </DragDropContext>
    );
  }
}

export default Game;
