import React from 'react';
import { Droppable} from 'react-beautiful-dnd';
import { Card, CardSimple } from './card';
import { CoreCardSet } from '../tools';

function Empty() {
    return <div className="empty-card-set" />
}


function Spread(props) {
    const { coreCardSet } = props;
    if(!(coreCardSet instanceof CoreCardSet)) {
        throw Error(`Bad core card set ${coreCardSet}`)
    }

    return coreCardSet.cards.map(
        (coreCard,index) =>
        <Card coreCard={coreCard} key={coreCard.id} index={index} 
            showBack={coreCardSet.showBacks()} />
    );
}

function NoSpread(props) {

    const { coreCardSet} = props;
    const top = coreCardSet.cards[0];
    const secondTop = coreCardSet.cards[1];

    return <div className="card-set-no-spread">
        <Spread {...props} coreCardSet={new CoreCardSet([top])} />

        <div className="card-set-no-spread-background">
            {secondTop ?
                    <CardSimple {...props} coreCard={secondTop} />
                    :
                    <Empty {...props} />
            }
        </div>

    </div>;
}

function Inner(props) {
 
    const { coreCardSet } = props;

    if(!coreCardSet) {
        throw Error(`CardSet required a CoreCardSet`);
    }
    
    if(coreCardSet.cards.length === 0) {
        return <Empty {...props} />;
    }

    if(coreCardSet.accessTopCardOnly) {
        return <NoSpread {...props} />
    }

    return <Spread {...props} />
}


class CardSet extends React.Component {
    
    render() {
        const { coreCardSet, isDropDisabled, direction, experimental} = this.props;

        if(experimental) {
             return this.renderExperimental();
        }

        return (

            <Droppable
                direction={direction}
                droppableId={coreCardSet.name()}
                isDropDisabled={isDropDisabled}

            >
                {provided => (
                    <div className="card-set"
                        ref={provided.innerRef}
                    >
                        <Inner {...this.props} />
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
            return <Card coreCard={topCard} key={topCard.id} index={1} showBack={showBack} />
        };

        const DraggingFromOther = () => {
            console.log('DraggingFromOther');
            return <CardSimple coreCard={topCard} key={topCard.id} index={1} showBack={showBack} />
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

export { CardSet };
