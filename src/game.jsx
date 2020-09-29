import React from 'react';
import { CoreCardGenerator, CoreCardSet } from './core';
import { RenderCardSet } from './render';
import { DragDropContext } from 'react-beautiful-dnd';

function addCoreCardSet(state, name, coreCardSet) {
    if (!(coreCardSet instanceof CoreCardSet)) {
        throw Error(`parameter ${coreCardSet} is not a CoreCardSet`);
    }
    coreCardSet.name(name);
    state[name] = coreCardSet;

    return coreCardSet;
}

function CommonArea(props) {
    const { coreCardSets } = props;
    console.log("CommonArea card sets", coreCardSets);
    console.log("CommonArea card set names", coreCardSets.map(set => set.name()));
    console.log("CommonArea card set cards", coreCardSets.map(set => set.cards));


    return (
        <div className="common-area">
            {coreCardSets.map((set, index) =>
                <RenderCardSet key={set.name()} coreCardSet={set} direction="vertical" />
            )}
        </div>
    );
}


class Game extends React.Component {

    constructor(props) {

        super(props);
        this.state = {};
        this._commonAreaCardSetsNames = [];

        let gen =  new CoreCardGenerator();
        let cards = new CoreCardSet(gen.decks(1), gen.jokers(2));
    
        addCoreCardSet(this.state, "player1", cards.draw(6));
        addCoreCardSet(this.state, "player2", cards.draw(6)).showBacks(true);
        addCoreCardSet(this.state, "available", cards).accessTopCardOnly(true);
    }

    componentDidMount() {
        this.setState(this.extendCommonArea({}));
    }

    extendCommonArea(state) {
        const name = "commonArea" + this._commonAreaCardSetsNames.length;

        let cardSet = addCoreCardSet(state, name, new CoreCardSet());
        cardSet.accessTopCardOnly(true);

        this._commonAreaCardSetsNames.push(name);

        console.log("extended common area", cardSet.name(), cardSet.cards)

        return state;
    }

    get commonAreaCardSets() {
        return this._commonAreaCardSetsNames.map(name=>this.state[name]); 
    }

    inCommonArea(deck) {
        return this.commonAreaCardSets.includes(deck);
    }

    onBeforeCapture = data => {
        //console.log('onBeforeCapture', data);
    };

    onBeforeDragStart = data => {
        // console.log('onBeforeDragStart', data);
    };

    onDragStart = data => {
        // console.log('onDragStart', data);
    };

    onDragUpdate = data => {
        // console.log('onDragUpdate', data);
    };

    onDragEnd = data => {
        // console.log('onDragEnd v1')
        const { source, destination } = data;
     
        if (!destination) {
            return;
        }

        // Copy the state to be changed.  (Inefficient but OK when source === distination)
        const draggedFromId = source.droppableId;
        const draggedToId = destination.droppableId;

        const oldDragFrom = this.state[draggedFromId];
        const oldDragTo = this.state[draggedToId];

        let draggedFrom = oldDragFrom.copy();
        let draggedTo = oldDragTo.copy();

        
        let dragged = draggedFrom.removeAt(source.index);
        if(!dragged) {
            throw Error('Cannot find card to move during drag');
        }

        const draggedToIndex = draggedTo.accessTopCardOnly ? 0 :  destination.index;
        draggedTo.addAt(draggedToIndex, dragged);


        let changedState = {}
        changedState[draggedFromId] = draggedFrom;
        changedState[draggedToId] = draggedTo;

        if(this.inCommonArea(oldDragTo) && oldDragTo.cards.length === 0) {
            this.extendCommonArea(changedState);
        }
        
        this.setState(changedState);
    }

    render() {


        return (
            <DragDropContext 
                onBeforeCapture={this.onBeforeCapture}
                onBeforeDragStart={this.onBeforeDragStart}
                onDragStart={this.onDragStart}
                onDragUpdate={this.onDragUpdate}
  
                onDragEnd={this.onDragEnd}
            >
                <div className="game"> 
                    <RenderCardSet coreCardSet={this.state.player1} />
                    <RenderCardSet coreCardSet={this.state.available} />

                    <CommonArea coreCardSets={this.commonAreaCardSets} />
             
                    <RenderCardSet coreCardSet={this.state.player2} />
                </div>
            </DragDropContext>
        );
    }
}

export default Game;
