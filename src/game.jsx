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
        this.state.player2.showBacks = true;

        this.state.commonArea = new CoreCardSet();
        this.state.available = cards;
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
        let newState = {};
        newState[source.droppableId] = this.state[source.droppableId].copy();
        newState[destination.droppableId] = this.state[destination.droppableId].copy();
        
        let dragged = newState[source.droppableId].removeAt(source.index);
        if(!dragged) {
            throw Error('Cannot find card to move during drag');
        }
        newState[destination.droppableId].addAt(destination.index, dragged);

        this.setState(newState);
    }

    render() {

        const RenderNamedSet = props => {
            const { name }= props;
            const coreCardSet = this.state[name];

            if(!(coreCardSet instanceof CoreCardSet)) {
                throw Error(`Unrecognised card set name ${name}`);
            }

            const extraProps = {
                id: name, 
                key: name,
                coreCardSet: coreCardSet,
                showBack: coreCardSet.showBacks,
            }
            return <RenderCardSet {...props} {...extraProps} />
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
                    <RenderNamedSet name='available' spread="none" />
                    <RenderNamedSet name='commonArea' />
                    <RenderNamedSet name='player2' />
                </div>
            </DragDropContext>
        );
    }
}

export default Game;
