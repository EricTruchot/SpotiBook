import React from 'react';
import { View, Button, Text } from 'react-native';
import { removeData } from '../services/localStorageUsers';
import { StyleSheet } from "react-native";

export default function Logout({ setIsLoggedIn }) {
  const handleLogout = () => {
    setIsLoggedIn(false);
    removeData('isLoggedIn');
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Voulez vous vraiment vous déconnecter?</Text>
      <Button title="Se déconnecter" onPress={ handleLogout } />
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
      textAlign:'center',
      width:'90%',
      marginVertical: 60
  },
})