import React from 'react';
import {Droppable} from 'react-beautiful-dnd';

import { Card } from './card';

class Hand extends React.Component {
  render() {
    const cards = this.props.cards ? this.props.cards : [];

      return (
          <Droppable>
              {(provided) => (
                  <div className="hand">
                      {cards.map(card =>
                          <Card value={card} />
                      )}
                  </div>
              )}
          </Droppable>
      );
  }
}

export default Hand;
