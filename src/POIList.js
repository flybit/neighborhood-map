import React, { Component } from 'react';


class POIList extends Component {

  render() {
    const { poi, query, onQueryChange } = this.props;
    return (
      <div className="list">
        <div className="filter">
          <input className="filter" type="text" placeholder="Type here to filter locations" value={query} onChange={(e) => onQueryChange(e.target.value)}/>
          <ol>
            {poi.map(p => (<li key={p.id}>{p.name}</li>))}
          </ol>
        </div>
      </div>
    );
  }
};

export default POIList;
