import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const MapContainer = (props) => {

    return (
        <Map
            className={props.class}
            google={props.google}
            style={{
             
                
                width: "100%",
                height: "100%",
             
                borderRadius:10
            }}
            center={{
                lat: props.lan,
                lng: props.lon
            }}
       
            zoom={15}
        >

            <Marker
                position={{
                    lat: props.lan,
                    lng: props.lon
                }}
                name={'Student Location'} />

        </Map>
    );

}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCIX39W4hI1dJfG6RxgiA78jvB4ccTczb8')
})(MapContainer)