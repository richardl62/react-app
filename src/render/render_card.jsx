import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import { CoreCard } from '../core'; // Should not be needed
import { cardSvg } from './svgs';


class RenderCard extends React.PureComponent {

  render() {
    const {value, index} = this.props;
    // console.log(value, index);

    const c = new CoreCard(value);
    if(!c.isSet()) {
      throw Error(`Unrecognised card value:${value}:`)
    }

    return (
      <Draggable
        draggableId={value.toString()}
        index={index}
      >
        {provided => (
          <div className="card"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            id={value}
          >
            <img src={cardSvg(c)} alt={c.longName()} />
          </div>
        )}
      </Draggable>
    );
  }
}

export { RenderCard };