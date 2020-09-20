import './main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game';

class App extends React.Component {
  render() {

    return (
      <React.StrictMode>
          <Game />
      </React.StrictMode>
    );
  } 
}

ReactDOM.render(<App />, document.getElementById("root"));

