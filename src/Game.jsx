import React from 'react';
import Hand from './Hand';
import Deck from './Deck';

class Game extends React.Component {
  render() {

    let d = new Deck();
    d.addJokers();
    d.shuffle();

    const hand1 = d.draw(6);
    const hand2 = d.draw(6);

    return (
      <div className="game">
        <Hand key="hand1" cards={hand1} />
        <div className="playing-area" />
        <Hand key="hand2" cards={hand2} />
      </div>
    );
  }
}

export default Game;
