import React from 'react';
import MapView from 'react-native-maps';
import { ref, Platform, StyleSheet, View, SafeAreaView, TextInput, onChangeText, Text, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { Marker } from "react-native-maps";
import * as MailComposer from 'expo-mail-composer';

import * as Location from 'expo-location';

export default function Map() {


  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const handleSendEmail = () => {
    const emailSubject = 'User Location';
    const emailBody = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}\n\nLocation link: https://www.google.com/maps/search/?api=1&query=${location.coords.latitude},${location.coords.longitude}`;

    if (Platform.OS === 'web') {
      Linking.openURL(`mailto:aebadulquadir123@gmail.com?subject=${emailSubject}&body=${emailBody}`);
    } else {
      MailComposer.composeAsync({
        recipients: ['aebadulquadir123@gmail.com'],
        subject: emailSubject,
        body: emailBody,
      });
    }
  };
  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    console.log({ longitude: location['coords'].longitude, latitude: location['coords'].latitude })
  }

  const karachiRegion = {
    latitude: 24.9583118,
    longitude: 67.06908,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const [region, setRegion] = useState();
  //   const [ref , setRef] = useState("")

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter you name"
        onChange={text}
      />
      <MapView
        style={styles.map}
        initialRegion={karachiRegion}
        onRegionChangeComplete={(region) => setRegion(region)}
      >
        <Marker coordinate={karachiRegion}
        />
      </MapView>
      <Button title="Send Location" onPress={handleSendEmail} style={{ borderWidth: 10 }} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '85%'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
