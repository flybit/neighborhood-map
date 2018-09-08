import React, { Component } from 'react';
import classNames from 'classnames';

/* Component for the left part of the app: Filter + location list */
class POIList extends Component {

  render() {
    const { title, poi, showList, query, onQueryChange, togglePoiInfo } = this.props;
    return (
      <div className={classNames('left-part', {"left-shown": showList})}>
        /* Title */
        <div className="left-title">
            <h1>{title}</h1>
        </div>

        /* Filter input */
        <div className="filter-container">
          <input className="filter" type="text" placeholder="Filter locations" value={query} onChange={(e) => onQueryChange(e.target.value)}/>
        </div>

        /* List */
        <div className="list-container">
          <ul className="list">
            {poi.map(p => (<li className="list-item" key={p.id} onClick={() => togglePoiInfo(p.id)} onKeyPress={() => togglePoiInfo(p.id)} tabIndex="0">{p.name}</li>))}
          </ul>
        </div>

        /* Attribution */
        <div className="left-attribution">
            <p>Business data &copy;2018 Yelp</p>
        </div>
      </div>
    );
  }
};

export default POIList;
