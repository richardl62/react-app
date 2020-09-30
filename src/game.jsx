import React from 'react';
import { CoreCardGenerator, CoreCardSet } from './core';
import { CardSet } from './render';
import { DragDropContext } from 'react-beautiful-dnd';
import { CommonArea, CoreCommonArea } from './common_area';

let coreCommonArea = new CoreCommonArea();

function addCoreCardSet(state, name, coreCardSet) {
    if (!(coreCardSet instanceof CoreCardSet)) {
        throw Error(`parameter ${coreCardSet} is not a CoreCardSet`);
    }
    coreCardSet.name(name);
    state[name] = coreCardSet;

    return coreCardSet;
}

class Game extends React.Component {

    constructor(props) {

        super(props);


        let gen =  new CoreCardGenerator();
        let cards = new CoreCardSet(gen.decks(1), gen.jokers(2));
    
        this.state = {};
        addCoreCardSet(this.state, "player1", cards.draw(6));
        addCoreCardSet(this.state, "player2", cards.draw(6)).showBacks(true);
        addCoreCardSet(this.state, "available", cards).accessTopCardOnly(true);
    }

    componentDidMount() {
        this.setState(coreCommonArea.setInitialState());
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


        let stateChange = {}
        stateChange[draggedFromId] = draggedFrom;
        stateChange[draggedToId] = draggedTo;

        const commonAreaStateChange = coreCommonArea.processDragStateChange(stateChange);

        this.setState({...stateChange, ...commonAreaStateChange});
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
                    <CardSet coreCardSet={this.state.player1} />
                    <CardSet coreCardSet={this.state.available} />

                    <CommonArea coreCommonArea={coreCommonArea} gameState={this.state} />
             
                    <CardSet coreCardSet={this.state.player2} />
                </div>
            </DragDropContext>
        );
    }
}

export default Game;
