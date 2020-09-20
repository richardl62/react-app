import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import { cardSvg, cardBackSvg } from './svgs';


class RenderCard extends React.PureComponent {

  render() {
    const {coreCard, index, showBack} = this.props;
    if(typeof(coreCard) !== "object") {
      throw Error(`bad core card "${coreCard}" supplied to RenderCard`);
    }

    const svg = showBack ? cardBackSvg : cardSvg(coreCard);
    const alt = showBack ? "card back" : coreCard.name(); 
 
    return (
      <Draggable
        draggableId={coreCard.id().toString()}
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
