import React, { Component } from 'react';


class POIList extends Component {

  render() {
    const { query, onQueryChange } = this.props;
    return (
      <div class="list">
        <div class="filter">
          <input class="filter" type="text" placeholder="Type here to filter locations" value={query} onChange={(e) => onQueryChange(e.target.value)}/>
        </div>
      </div>
    );
  }
};

export default POIList;
