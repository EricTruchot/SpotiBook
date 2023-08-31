import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { getBoxById } from '../services/api';

export default function AccueilRegistered({ setBoxInfos }) {
    const [scanned, setScanned] = useState(false);
    const [showCodeBar, setShowCodeBar] = useState(false);
    const navigation = useNavigation();

    const navigateToScreen = () => {
        navigation.navigate('Boites');
    };
    
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        ( async () => {
          let result = await getBoxById(data?.split('/')[1]);
          let parsedResult = JSON.parse(result)
          setBoxInfos(parsedResult)
          navigateToScreen();
        })();
    
      };
  return (
    <>
    <View style={styles.container}>
        <Text>Text quand on est connecté</Text>
        <Button title="Voir la carte" color="#841584" />

        <Text>Veuillez scanner la boite dans laquelle vous voulez emprunter ou rendre un livre !</Text>
        {/* <Button title="Scanner la boite" onPress={ navigateToScreen } /> */}
        <Button title="Scanner la boite" onPress={() => setShowCodeBar(true) } />

        { showCodeBar && (
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ height: 400, width: 400 }}
                />
        ) }

        <Button title="Reset" onPress={() => setScanned(false) } />
        <Button title="Reset2" onPress={() => setShowCodeBar(false) } />
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
})