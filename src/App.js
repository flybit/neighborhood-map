import React, { Component } from 'react';
import POIList from './POIList';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    query: '',
  }

  handleQueryChange = (query) => {
    this.setState({query});
  }

  render() {
    const { query } = this.state;
    return (
      <div>
        <POIList query={query} onQueryChange={this.handleQueryChange}/>
      </div>
    );
  }
}

export default App;
