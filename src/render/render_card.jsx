import React from 'react';
import {CoreCard} from "../core";
import {Draggable} from 'react-beautiful-dnd';

class RenderCard extends React.PureComponent {

  render() {
    const {coreCard, index, showBack} = this.props;
    if(!coreCard instanceof CoreCard) {
      throw Error(`bad core card "${coreCard}" supplied to RenderCard`);
    }

    const svg = showBack ?  CoreCard.backSvg : coreCard.svg();
    const alt = showBack ? "card back" : coreCard.name(); 
 
    return (
      <Draggable
        draggableId={coreCard.id.toString()}
        index={index}
      >
        {provided => (
          <div className="card"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >       
            <img width="100%" height="auto" src={svg} alt={alt} />
          </div>
        )}
      </Draggable>
    );
  }
}

export { RenderCard };
