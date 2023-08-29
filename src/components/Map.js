import React, { useEffect, useState, useRef } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps';

export default function Map({ markers }) {
  const [latitude, setLatitude] = useState(43.52252062905719);
  const [longitude, setLongitude] = useState(5.449523280048378);

  const mapRef = useRef(null);

  useEffect(() => {
      mapRef.current?.animateToRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      })
  }, []);

  return (
      <MapView
        ref={mapRef}
        userLocationPriority="high"
        showsUserLocation={true}
        style={styles.map}
        >
        { Object.keys(markers)?.length > 0  && markers?.map(marker => (
            <Marker
            key={marker?.id}
            coordinate={{latitude: marker?.latitude, longitude: marker?.longitude}}
            title={marker?.nom}
        />
        ))}
        
      </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
})