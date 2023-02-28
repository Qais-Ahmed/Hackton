import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Button, Linking, Platform } from 'react-native';
import * as Location from 'expo-location';
import * as MailComposer from 'expo-mail-composer';
import { Dropdown, Text } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';


export default function Map() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedValue, setSelectedValue] = useState('option1');
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];
  const groups = [
    {
      name: "Friend",
      users: [
        { name: "Aebad",  coordinate: { latitude: 24.955123, longitude: 67.113456 } },
        { name: "Saad", coordinate: { latitude: 24.958765, longitude: 67.117890 }},
        { name: "Asad",  coordinate: { latitude: 24.951234, longitude: 67.120987 }}
      ]
    },
    {
      name: "Family",
      users: [
        { name: "Qais",  coordinate: { latitude: 24.955123, longitude: 67.113456 }},
        { name: "Talha", coordinate: { latitude: 24.958765, longitude: 67.117890 }}
      ]
    }
  ];
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

     
      const newMarkers = [
        { title: 'Loco', coordinate: { latitude: 24.955123, longitude: 67.113456 } },
        { title: 'Hash', coordinate: { latitude: 24.958765, longitude: 67.117890 } },
        { title: 'Yousuf', coordinate: { latitude: 24.951234, longitude: 67.120987 } },
      ];
      setMarkers(newMarkers);
    })();
  }, []);

  let myMarker = null;
  if (location) {
    myMarker = <Marker coordinate={location.coords} title="My Location" />;
  }

  const karachiRegion = {
    latitude: 24.955863,
    longitude: 67.114972,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

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
  

  return (
    <>
    
    <View style={styles.container}>
    <MapView style={styles.map} initialRegion={karachiRegion}>

  {groups.map((group, index) => (
    selectedValue === group.name && group.users.map((user, index) => (
      <Marker key={index} coordinate={user.coordinate} title={user.name} />
    ))
  ))}
</MapView>

{/* Add a picker to select the group */}
<Picker
  selectedValue={selectedValue}
  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
>
  {groups.map((group, index) => (
    <Picker.Item key={index} label={group.name} value={group.name} />
  ))}
</Picker>
      <Button title="Send Location" onPress={handleSendEmail} style={{borderWidth:10}} />
    </View>
   
          </>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '70%',
  },
});
