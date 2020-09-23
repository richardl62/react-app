import React from 'react';
import {CoreCard} from "../core";
import {Draggable} from 'react-beautiful-dnd';

// No support for dragging
class RenderCardSimple extends React.PureComponent {

  render() {
    let propsForDiv = {...this.props};

    const { coreCard, showBack, innerRef } = this.props;
    delete propsForDiv.coreCard;
    delete propsForDiv.showBack;
    delete propsForDiv.innerRef;

    if (!coreCard instanceof CoreCard) {
      throw Error(`bad core card "${coreCard}" supplied to RenderCard`);
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

class RenderCard extends React.PureComponent {

  render() {
    const {coreCard, index} = this.props;
 
    return (
      <Draggable
        draggableId={coreCard.id.toString()}
        index={index}
      >
        {provided => (
          <RenderCardSimple
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

export { RenderCard, 
          RenderCardSimple  // Experimental - may not be needed with isDragDisabled 
        };
