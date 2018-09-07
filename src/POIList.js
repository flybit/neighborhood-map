import React, { Component } from 'react';
import classNames from 'classnames';


class POIList extends Component {

  render() {
    const { poi, showList, query, onQueryChange } = this.props;
    return (
      <div className={classNames('left-part', {"left-shown": showList})}>
        <div className="filter-container">
          <input className="filter" type="text" placeholder="Type here to filter locations" value={query} onChange={(e) => onQueryChange(e.target.value)}/>
        </div>
        <div className="list-container">
          <ol className="list">
            {poi.map(p => (<li className="list-item" key={p.id}>{p.name}</li>))}
          </ol>
        </div>
      </div>
    );
  }
};

export default POIList;
