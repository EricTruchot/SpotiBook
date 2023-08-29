import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { StyleSheet } from "react-native";

export default function AccueilRegistered() {
  return (
    <>
    <View style={styles.container}>
        <Text>Text quand on est connecté</Text>
        <Button
            title="Voir la carte"
            color="#841584"
            />

        <Text>Veuillez scanner la boite dans laquelle vous voulez emprunter ou rendre un livre !</Text>
        <Button
            title="Scanner la boite"
            color="#841584"
            />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        width: '100%',
        height: '100%',
    },
})