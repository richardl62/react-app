import React from 'react';
import { Droppable} from 'react-beautiful-dnd';
import { RenderCard } from './render_card';

class RenderHand extends React.Component {
    render() {
        const { cards, id } = this.props;

        return (
            <Droppable
                droppableId={id}
                direction="horizontal"
            >
                {provided => (
                    <div className="hand"
                        ref={provided.innerRef}
                        {...provided.droppableProp}
                    >
                        {cards.map((card,index) =>
                            <RenderCard value={card} key={card} index={index} />
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
}

export { RenderHand };
