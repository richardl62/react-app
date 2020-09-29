import React from 'react';
import { Droppable} from 'react-beautiful-dnd';
import { RenderCard, RenderCardSimple } from './render_card';
import { CoreCardSet } from '../core';

function RenderEmpty() {
    return <div className="empty-card-set" />
}


function RenderSpread(props) {
    const { coreCardSet } = props;
    if(!(coreCardSet instanceof CoreCardSet)) {
        throw Error(`Bad core card set ${coreCardSet}`)
    }

    return coreCardSet.cards.map(
        (coreCard,index) =>
        <RenderCard coreCard={coreCard} key={coreCard.id} index={index} 
            showBack={coreCardSet.showBacks()} />
    );
}

function RenderNoSpread(props) {

    const { coreCardSet} = props;
    const top = coreCardSet.cards[0];
    const secondTop = coreCardSet.cards[1];

    return <div className="card-set-no-spread">
        <RenderSpread {...props} coreCardSet={new CoreCardSet([top])} />

        <div className="card-set-no-spread-background">
            {secondTop ?
                    <RenderCardSimple {...props} coreCard={secondTop} />
                    :
                    <RenderEmpty {...props} />
            }
        </div>

    </div>;
}

function InnerRender(props) {
 
    const { coreCardSet } = props;

    if(!coreCardSet) {
        throw Error(`RenderCardSet required a CoreCardSet`);
    }
    
    if(coreCardSet.cards.length === 0) {
        return <RenderEmpty {...props} />;
    }

    if(coreCardSet.accessTopCardOnly) {
        return <RenderNoSpread {...props} />
    }

    return <RenderSpread {...props} />
}


class RenderCardSet extends React.Component {
    
    render() {
        const { coreCardSet, isDropDisabled, experimental} = this.props;

        if(experimental) {
             return this.renderExperimental();
        }

        return (

            <Droppable
                droppableId={coreCardSet.name()}
                direction="horizontal"
                isDropDisabled={isDropDisabled}

            >
                {provided => (
                    <div className="card-set"
                        ref={provided.innerRef}
                    >
                        <InnerRender {...this.props} />
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }

    renderExperimental() {
        const { id, coreCardSet, showBack, isDropDisabled} = this.props;
        const topCard = coreCardSet.cards[0];
        
        function DraggingFromThis() {
            console.log('DraggingFromThis');
            return <RenderCard coreCard={topCard} key={topCard.id} index={1} showBack={showBack} />
        };

        const DraggingFromOther = () => {
            console.log('DraggingFromOther');
            return <RenderCardSimple coreCard={topCard} key={topCard.id} index={1} showBack={showBack} />
        }
        return (
            <Droppable
                droppableId={id}
                direction="horizontal"
                isDropDisabled={isDropDisabled}
            >
                {(provided, snapshot) => (
                    <div className="card-set-experimental"
                        ref={provided.innerRef}
                    >
                        {snapshot.draggingFromThisWith ?
                            <DraggingFromThis /> :
                            <DraggingFromOther />}
                            <DraggingFromThis></DraggingFromThis>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
}

export { RenderCardSet };
