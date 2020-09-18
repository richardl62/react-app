import React from 'react';
import { Droppable} from 'react-beautiful-dnd';
import { RenderCard } from './render_card';

class RenderHand extends React.Component {
    render() {
        const { coreHand, id } = this.props;

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
                        {coreHand.cards.map((coreCard,index) =>
                            <RenderCard coreCard={coreCard} key={coreCard.name()} index={index} />
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
}

export { RenderHand };
