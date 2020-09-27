import React from 'react';
import { CoreCardGenerator, CoreCardSet } from './core';
import { RenderCardSet } from './render';
import { DragDropContext } from 'react-beautiful-dnd';


class Game extends React.Component {

    constructor() {
        super();
        this.state = {}

        let gen =  new CoreCardGenerator();
        let cards = new CoreCardSet(gen.decks(2), gen.jokers(4));
    
        this.state.player1 = cards.draw(6);

        this.state.player2 = cards.draw(6);
        this.state.player2.showBacks(true);
        
        this.state.available = cards;
        this.state.available.accessTopCardOnly(true);

        this.commonAreaDecks = [];
        this.addCommonAreaDeck(this.state);

    }

    addCommonAreaDeck(state) {

        let deck = new CoreCardSet();
        this.commonAreaDecks.push(deck);

        const deckNo = this.commonAreaDecks.length;
        state["commonArea"+deckNo] = deck;
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
            this.addCommonAreaDeck(changedState);
        }
        
        this.setState(changedState);
    }

    render() {

        const RenderNamedSet = props => {
            const { name } = props;
            const coreCardSet = this.state[name];

            if(!(coreCardSet instanceof CoreCardSet)) {
                throw Error(`Unrecognised card set name ${name}`);
            }


            return <RenderCardSet 
                id={name}
                key={name}
                coreCardSet={coreCardSet}
            />
        };


        return (
            <DragDropContext 
                onBeforeCapture={this.onBeforeCapture}
                onBeforeDragStart={this.onBeforeDragStart}
                onDragStart={this.onDragStart}
                onDragUpdate={this.onDragUpdate}
  
                onDragEnd={this.onDragEnd}
            >
                <div className="game"> 
                    <RenderNamedSet name='player1' />
                    <RenderNamedSet name='available' />
                    <RenderNamedSet name='commonArea1' />
                    {this.state.commonArea2 ? 
                        <RenderNamedSet name='commonArea2' /> :
                        <div>Not yet created</div>
                    }                    
                    <RenderNamedSet name='player2' />
                </div>
            </DragDropContext>
        );
    }
}

export default Game;
