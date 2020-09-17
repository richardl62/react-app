import React from 'react';
import {Droppable} from 'react-beautiful-dnd';

import { Card } from './card';

class HandData {
    constructor(cardIds) {
        this._cardIds = cardIds;
        Object.seal(this);
    }

    get cardIds() {return this._cardIds;}

    removeAt(index) {
        this._cardIds.splice(index, 1);
    }

    addAt(index, id) {
        this._cardIds.splice(index, 0, id);
    }

    // Make an independant copy of this class
    copy() {
        return new HandData([...this._cardIds]);
    }
}

class Hand extends React.Component {
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
                            <Card value={card} key={card} index={index} />
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
}

export {Hand, HandData};
