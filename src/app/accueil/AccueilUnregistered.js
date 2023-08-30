import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { StyleSheet } from "react-native";

export default function AccueilUnregistered() {
  return (
    <>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Page d'accueil</Text>
      <Button
        title="Connexion"
        color="#841584"
        />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
})