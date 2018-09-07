import React, { Component } from 'react';
import classNames from 'classnames';
import POIList from './POIList';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import escapeRegExp from 'escape-string-regexp';
import './App.css';

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
  const { poi } = props;
  return <GoogleMap defaultZoom={14} defaultCenter={{ lat: 42.301880, lng: -71.359922 }}>
    {poi.map(p => <Marker key={p.id} position={{ lat: p.lat, lng: p.lng }} />)}
  </GoogleMap>
}));


class App extends Component {
  state = {
    poi: [
      {id: 1, name: 'Krua Thai', lat: 42.304546, lng: -71.360952},
      {id: 2, name: 'Chipotle', lat: 42.302673, lng: -71.359794},
      {id: 3, name: 'Five Guys', lat: 42.301626, lng: -71.358849},
      {id: 4, name: "Oga's", lat: 42.300547, lng: -71.361982},
      {id: 5, name: "Chuck E. Cheese's", lat: 42.301626, lng: -71.355674},
    ],
    showList: false,
    query: ''
  }

  handleQueryChange = (query) => {
    this.setState({query});
  }

  render() {
    const { poi, showList, query } = this.state;
    let poiFiltered = {}
    return (
      <div className="main-container">

        <POIList poi={poi} showList={showList} query={query} onQueryChange={this.handleQueryChange}/>

        <div className={classNames("right-part", {"left-shown": showList})}>
          <div className="top-menu" onClick={() => this.setState({showList: !showList})}>
            <i className="material-icons">menu</i>
          </div>


          <MyMapComponent isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCn9Mj7GvNhbxo-yfh3gfIVbiCRtKYehMs"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `calc(100% - 25px)` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              />

          </div>

      </div>
    );
  }
}

export default App;
