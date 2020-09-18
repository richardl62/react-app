import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import { cardSvg } from './svgs';


class RenderCard extends React.PureComponent {

  render() {
    const {coreCard, index} = this.props;

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
            //id={value}
          >
            <img src={cardSvg(coreCard)} alt={coreCard.name()} />
          </div>
        )}
      </Draggable>
    );
  }
}

export { RenderCard };