import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { StyleSheet } from "react-native";

export default function ShowBoite() {
  return (
    <>
    <View style={styles.container}>
        <Text>Boite + title</Text>
        <Text>Faire une liste des livres dans la boite</Text>
        <Button
            title="Emprunter"
            color="#841584"
            />

        <Text>Veuillez scanner la boite dans laquelle vous voulez emprunter ou rendre un livre !</Text>
        <Button
            title="Rendre"
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