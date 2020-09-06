import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable'; // The default
import {Card,
     addClassName, // kludge
  }  from './card.js'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }
  
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Oops. Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }  
}



class Hand extends React.Component {
  render() {
    const cards = this.props.cards? this.props.cards : [];

    return (
      <div {... addClassName(this.props, "hand")}>
        {
          cards.map(card =>
            <Draggable key={card} >
              <Card value={card} />
            </Draggable>
          )
        }
      </div>);
  }
}

// Copied from richardl62.github.io\games\lib\tools\tools.js
function shuffleArray(array) {
  // From https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

// Work in progress
class Deck {
    constructor() {
      this._cards = []; 
      for(let i = 0; i < 52; ++i) {
        this._cards.push(i);
      }
    }

    addJokers(num=2) {
      for(let i = 0; i < num; ++i) {
        this._cards.push('joker');
      }
    }

    shuffle() {
      shuffleArray(this._cards);
    }

    draw(num=1) {
      return this._cards.splice(0, num);
    }
}

class App extends React.Component {
  render() {

    let d = new Deck();
    d.addJokers();
    d.shuffle();
    
    const hand1 = d.draw(6);
    const hand2 = d.draw(6);
    
    return (
      <ErrorBoundary>
        <div className="game">
          <Hand key="hand1" cards={hand1}/>
          <div className="playing-area" />
          <Hand key="hand2" cards={hand2}/>
        </div>
      </ErrorBoundary>
    );
  } 
}

ReactDOM.render(<App />, document.getElementById("root"));

