import React, { Component } from 'react';
import classNames from 'classnames';
import POIList from './POIList';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import './App.css';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
));


class App extends Component {
  state = {
    poi: [
      {id: 1, name: 'foo'},
      {id: 2, name: 'bar'},
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
