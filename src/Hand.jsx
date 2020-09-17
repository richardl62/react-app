import React from 'react';
import Draggable from 'react-draggable';
import {
  Card,
  addClassName
} from './card';

class Hand extends React.Component {
  render() {
    const cards = this.props.cards ? this.props.cards : [];

    return (
      <div {...addClassName(this.props, "hand")}>
        {cards.map(card => <Draggable key={card}>
          <Card value={card} />
        </Draggable>
        )}
      </div>);
  }
}

export default Hand;
