import React from 'react';

const CardSvgs = require.context ( './cards', false, /\.svg$/ );

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

  export {Card, 
    addClassName, // kludge
};