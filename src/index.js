import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable'; // The default

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

function numberAndSuit(name) {
  const number = name.slice(0,-1).toUpperCase();
  const suit = name.slice(-1).toUpperCase();

  return [number, suit];
}

function isRed(suit) {
  const redSuits = ["D", "H"];
  return redSuits.includes(suit.toUpperCase()); 

} 
class Card extends React.Component {

  render() {
    const [number, suit] = numberAndSuit(this.props.value);
    const cardClass = isRed(suit) ? "redCard" : "blackCard";

    return (
      <div {... addClassName(this.props, cardClass)} > 
        <div> {number} </div>
        <div> {suit} </div>
      </div>);
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

