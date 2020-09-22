import React from 'react';
import { Droppable} from 'react-beautiful-dnd';
import { RenderCard } from './render_card';
import { CoreCardSet } from '../core';

function RenderEmpty() {
    return <div className="empty-card-set" />
}


function RenderSpread(props) {
    const { coreCardSet, showBack } = props;
    if(!(coreCardSet instanceof CoreCardSet)) {
        throw Error(`Bad core card set ${coreCardSet}`)
    }

    return coreCardSet.cards.map(
        (coreCard,index) =>
        <RenderCard coreCard={coreCard} key={coreCard.id} index={index} showBack={showBack} />
    );
}

function RenderNoSpread(props) {

    const { coreCardSet} = props;

    return <div className="card-set-no-spread">
        <RenderSpread {...props} coreCardSet={coreCardSet.get(1)} />
    </div>;
}

function InnerRender(props) {
 
    const { coreCardSet, spread } = props;

    if(!coreCardSet) {
        throw Error(`RenderCardSet required a CoreCardSet`);
    }
    
    if(coreCardSet.cards.length === 0) {
        return <RenderEmpty {...props} />;
    }

    if(spread === "none") {
        return <RenderNoSpread {...props} />
    }

    return <RenderSpread {...props} />
}


class RenderCardSet extends React.Component {
    
    render() {

        const { id } = this.props;

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
                        <InnerRender {...this.props} />
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
}

export { RenderCardSet };
