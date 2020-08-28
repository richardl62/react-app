import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function greet(name) {
  return <div> Hello, {name} </div>
}
class App extends React.Component {
  render() {

    const people = ['Jill', 'Jamie', 'Bobby', 'Dave' ];

    return (
      <div className="App">
        {people.map(name => greet(name))}
      </div>
    );
  } 
}

ReactDOM.render(<App />, document.getElementById("root"));