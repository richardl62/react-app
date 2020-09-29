import React from 'react';
import { CoreCardGenerator, CoreCardSet } from './core';
import { RenderCardSet } from './render';
import { DragDropContext } from 'react-beautiful-dnd';

function addCoreCardSet(state, name, coreCardSet)
    {
       if(!(coreCardSet instanceof CoreCardSet)) {
           throw Error(`parameter ${coreCardSet} is not a CoreCardSet`);
       }
       coreCardSet.name(name);
        state[name] = coreCardSet;
        
        return coreCardSet;
    }

class Game extends React.Component {

    constructor() {
        super();
        this.state = {};

        let gen =  new CoreCardGenerator();
        let cards = new CoreCardSet(gen.decks(2), gen.jokers(4));
    
        addCoreCardSet(this.state, "player1", cards.draw(6));
        addCoreCardSet(this.state, "player2", cards.draw(6)).showBacks(true);
        addCoreCardSet(this.state, "available", cards).accessTopCardOnly(true);

        
        this.commonAreaDecks = [];
        this.extendCommonArea(this.state);
    }

    extendCommonArea(state) {
        const deckNo = this.commonAreaDecks.length;

        let deck = addCoreCardSet(state, "commonArea"+deckNo, new CoreCardSet());
        this.commonAreaDecks.push(deck);
    }

    inCommonArea(deck) {
        return this.commonAreaDecks.includes(deck);
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

        const draggedToIndex = draggedTo.accessTopCardOnly ? 0 : destination.index;
        draggedTo.addAt(draggedToIndex, dragged);


        let changedState = {}
        changedState[draggedFromId] = draggedFrom;
        changedState[draggedToId] = draggedTo;

        if(this.inCommonArea(oldDragTo) && oldDragTo.cards.length === 0) {
            console.log('adding to common area');
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
                    <RenderCardSet coreCardSet={this.state.commonArea0} />
                    {this.state.commonArea1 ? 
                        <RenderCardSet coreCardSet={this.state.commonArea1} /> :
                        <div>Not yet created</div>
                    }                    
                    <RenderCardSet coreCardSet={this.state.player2} />
                </div>
            </DragDropContext>
        );
    }
}

export default Game;
