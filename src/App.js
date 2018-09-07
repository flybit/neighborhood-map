import React, { Component } from 'react';
import POIList from './POIList';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    poi: [
      {id: 1, name: 'foo'},
      {id: 2, name: 'bar'},
    ],
    query: ''
  }

  handleQueryChange = (query) => {
    this.setState({query});
  }

  render() {
    const { poi, query } = this.state;
    let poiFiltered = {}
    return (
      <div>
        <POIList poi={poi} query={query} onQueryChange={this.handleQueryChange}/>
      </div>
    );
  }
}

export default App;
