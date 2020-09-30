import React from 'react';
import {CoreCard} from "../tools";
import {Draggable} from 'react-beautiful-dnd';

// No support for dragging
class CardSimple extends React.PureComponent {

  render() {
    let propsForDiv = {...this.props};

    const { coreCard, showBack, innerRef } = this.props;
    delete propsForDiv.coreCard;
    delete propsForDiv.coreCardSet;
    delete propsForDiv.showBack;
    delete propsForDiv.innerRef;
    delete propsForDiv.isDragDisabled;

    if (!coreCard instanceof CoreCard) {
      throw Error(`bad core card "${coreCard}" supplied to Card`);
    }

    const svg = showBack ? CoreCard.backSvg : coreCard.svg();
    const alt = showBack ? "card back" : coreCard.name();

    return (
      <div {...propsForDiv} ref={innerRef} className="card">
        <img width="100%" height="auto" src={svg} alt={alt} />
      </div>
    );
  }
}

class Card extends React.PureComponent {

  render() {
    const {coreCard, index, isDragDisabled} = this.props;
 
    return (
      <Draggable
        draggableId={coreCard.id.toString()}
        index={index ? index : 0}
        isDragDisabled={isDragDisabled}
      >
        {provided => (
          <CardSimple
            {...this.props}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
          />       
        )}
      </Draggable>
    );
  }
}

export { Card, 
          CardSimple  // Experimental - may not be needed with isDragDisabled 
        };
