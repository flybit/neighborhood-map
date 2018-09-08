import React, { Component } from 'react';
import classNames from 'classnames';
import POIList from './POIList';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import escapeRegExp from 'escape-string-regexp';
import './App.css';

var YELP_TOKEN = 'bCTXzGFXHNbL8m8BhAhCl5TebNCt5A0VGLk7zw62LmirUUnBDTqJ49rAZPfiIu0gcVZCehkgewRX1nDtmsAwMnP7oohhbeWMECQ84MsjzCFipIHHxD0bdthdewyTW3Yx';
var RED_MARKER = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
var GREEN_MARKER = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
  const { poi, togglePoiInfo } = props;
  return <GoogleMap defaultZoom={14} defaultCenter={{ lat: 42.301880, lng: -71.359922 }}>
    {poi.map(p => (
        <Marker
            key={p.id}
            position={{ lat: p.lat, lng: p.lng }}
            onClick={() => togglePoiInfo(p.id)}
            icon={p.showInfo ? GREEN_MARKER : RED_MARKER}
        >
            {p.showInfo && (
                <InfoWindow onCloseClick={() => {togglePoiInfo(p.id)}}>
                    <div className="info-content">
                        <h2 className="info-name">{p.name}</h2>
                        <p className="info-categories">{p.yelpData.categories}</p>
                        <p className="info-rating">{`${p.yelpData.rating}/5 stars from ${p.yelpData.reviews} reviews`}</p>
                        <p className="info-contact">
                            Address: {p.yelpData.address}<br />
                            Phone: {p.yelpData.phone}
                        </p>
                    </div>
                </InfoWindow>
            )}
        </Marker>
    ))}
  </GoogleMap>
}));

class App extends Component {
  state = {
    poi: [
      {id: 1, name: 'Krua Thai', lat: 42.304546, lng: -71.360952, yelpId: 'nlhV4osenPaoNStZ3T_NNA', yelpData: {}, showInfo: false},
      {id: 2, name: 'Chipotle', lat: 42.302673, lng: -71.359794, yelpId: 'ViXB57j0j3NGzg-SKUIY7A', yelpData: {}, showInfo: false},
      {id: 3, name: 'Five Guys', lat: 42.301322, lng: -71.358895, yelpId: 'A7DLDlOilcKBD4xFY24QJA', yelpData: {}, showInfo: false},
      {id: 4, name: "Oga's", lat: 42.300547, lng: -71.361982, yelpId: 'U_-wxqMhqzQeSS_G6iytpw', yelpData: {}, showInfo: false},
      {id: 5, name: "Chuck E. Cheese's", lat: 42.301626, lng: -71.355674, yelpId: '1nLCc9fDf-N44INxPwFlMw', yelpData: {}, showInfo: false},
    ],
    showList: false,
    query: ''
  }

  handleQueryChange = (query) => {
    this.setState({query});
  }

  togglePoiInfo = (id) => {
      let newPoi = JSON.parse(JSON.stringify(this.state.poi));
      newPoi.forEach(p => {
          if (p.id !== id) return;
          p.showInfo = !p.showInfo;
      });
      this.setState({poi: newPoi});
  }

  async componentDidMount() {
      let newPoi = JSON.parse(JSON.stringify(this.state.poi));
      await Promise.all(newPoi.map(async p => {
          const resp = await fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/' + p.yelpId, {
              method: 'get',
              headers: new Headers({
                  Authorization: 'Bearer '+ YELP_TOKEN,
                  'X-REQUESTED-WITH': 'fetch'
               })
          });
          const j = await resp.json();
          p.yelpData = {
              rating: j.rating,
              reviews: j.review_count,
              categories: j.categories.map(c => c.title).join(', ', ),
              phone: j.display_phone,
              address: j.location.display_address.join(', ')
          };
          return p;
      }));
      this.setState({poi: newPoi});
  }

  render() {
    const { poi, showList, query } = this.state;
    let poiFiltered = poi;

    if (query) {
      const m = new RegExp(escapeRegExp(query), 'i');
      poiFiltered = poi.filter(p => m.test(p.name));
    }

    return (
      <div className="main-container">

        <POIList title="Nearby Food" poi={poiFiltered} togglePoiInfo={this.togglePoiInfo} showList={showList} query={query} onQueryChange={this.handleQueryChange}/>

        <div className={classNames("right-part", {"left-shown": showList})}>
          <div className="top-menu" onClick={() => this.setState({showList: !showList})}>
            <i className="material-icons">menu</i>
          </div>


          <MyMapComponent
              poi={poiFiltered}
              togglePoiInfo={this.togglePoiInfo}
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
