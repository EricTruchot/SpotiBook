import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { borrowBook, getBookById } from '../services/api';

export default function QRCode() {

    const navigation = useNavigation();
    const [scanned, setScanned] = useState(false);
    const navigateToScreen = () => {
        navigation.goBack()
    };
    
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        ( async () => {
          let result = await getBookById(data?.split('/')[1]);
          borrowBook(result?.data?.id)
          console.log('C OK');
        //TODO MODIF BDD, CHECK RETOUR NAVIGATE
        navigateToScreen()
        })();
    
      };
  return (
    <>
    <View style={styles.container}>
        <Text>QR CODE</Text>


            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ height: 400, width: 400 }}
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
})