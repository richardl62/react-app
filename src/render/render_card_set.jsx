import React from 'react';
import { Droppable} from 'react-beautiful-dnd';
import { RenderCard } from './render_card';

class RenderCardSet extends React.Component {
    render() {
        const { coreCardSet, id } = this.props;

        return (
            <Droppable
                droppableId={id}
                direction="horizontal"
            >
                {provided => (
                    <div className="card-set"
                        ref={provided.innerRef}
                        {...provided.droppableProp}
                    >
                        {coreCardSet.cards.map((coreCard,index) =>
                            <RenderCard coreCard={coreCard} key={coreCard.id} index={index} showBack={this.props.showBack} />
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
}

export { RenderCardSet };
