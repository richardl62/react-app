import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable'; // The default
const CardSvgs = require.context ( './cards', false, /\.svg$/ )

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

class CardValue {
  constructor(briefName) {  // briefName is "1c", "qS" etc.
    const r = briefName.slice(0, -1).toLowerCase();
    const s = briefName.slice(-1).toLowerCase();

    const royal = {
      j: 'jack',
      q: 'queen',
      k: 'king',
    }

    if(!isNaN(parseInt(r)) || r === "0") {
      this._rank = r;
    } else if(royal[r]) {
      this._rank = royal[r];
    } else {
      throw Error(`Rank not recongised in ${briefName}`);
    }

    const suits = {
      c: 'club',
      d: 'diamond',
      h: 'heart',
      s: 'spade',
    }

    this._suit = suits[s];
    if(!this._suit) {
      throw Error(`Suit not recongised in ${briefName}`);
    }

    Object.freeze(this);
  }

  get rank() {return this._rank;}
  get suit() {return this._suit;}
  
  svg() {
    const name = `${this._suit}-${this._rank}`.toUpperCase();
    const path = `./${name}.svg`

    return CardSvgs(path);
  }

  longName() {
    return `${this._rank} of ${this._suit}s`;
  }
}


class Card extends React.Component {

  render() {
    const c = new CardValue(this.props.value);

    return (
      <div {...addClassName(this.props, "card")}>
        <img src={c.svg()} alt={c.longName()} />
      </div>
    );
  }
}

function addClassName(props, name) {
  let new_props = {...props}; // Independent copy

  if(props.className) {
    new_props.className += " " + name;
  } else {
    new_props.className =  name
  }

  return new_props;
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

class App extends React.Component {
  render() {

    const hand1 = ['1c', '10d', '3H', 'qs' ];

    const hand2 = ['1d', 'Jc', '4s', 'ks' ];
    
    return (
      <ErrorBoundary>
        <div className="game">
          <Hand key="hand1" cards={hand1}/>
          <Hand key="shared" />
          <Hand key="hand2" cards={hand2}/>
        </div>
      </ErrorBoundary>
    );
  } 
}

ReactDOM.render(<App />, document.getElementById("root"));

