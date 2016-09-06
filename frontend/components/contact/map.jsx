import React from 'react';
import { merge, isEmpty } from 'lodash';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.address = '';
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

    let contact = this.props.contact;
    if (!isEmpty(contact) && contact.address) {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.773972, lng: -122.431297}, //San Francisco
        zoom: 13
      });
      if (nextProps.contact.address) {
        this.address = nextProps.contact.address;
      }
      codeAddress(this.map, this.address);
    }

    function codeAddress(map, address) {

      let geocoder= new google.maps.Geocoder();
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == 'OK') {
          map.setCenter(results[0].geometry.location);
          let marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
          });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }

  render() {
    return(
      <div id="map" className='contact-map'>
        <p>Enter a contact address To render map</p>
        <div className='background'></div>
      </div>
    );
  }
}

export default Map;
