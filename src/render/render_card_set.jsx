import React from 'react';
import { Droppable} from 'react-beautiful-dnd';
import { RenderCard } from './render_card';

function RenderEmpty() {
    return <div className="empty-card-set" />
}


function RenderSpread(props) {
    const { coreCardSet, showBack } = props;

    return coreCardSet.cards.map(
        (coreCard,index) =>
        <RenderCard coreCard={coreCard} key={coreCard.id} index={index} showBack={showBack} />
    );
}

function RenderNoSpread(props) {

    const { coreCardSet, showBack } = props;
    const coreCard1 = coreCardSet.cards[0];
    // const coreCard2 = coreCardSet.cards[1];

    return <div className="card-set-no-spread">
        <RenderCard coreCard={coreCard1} key={coreCard1.id} index={1} showBack={showBack} />
        {/* <RenderCard coreCard={coreCard2} key={coreCard2.id} index={2} showBack={showBack} /> */}
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
