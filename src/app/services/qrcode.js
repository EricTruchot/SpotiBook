import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useRoute } from '@react-navigation/native';
import { borrowBook, getBookById, returnBook } from '../services/api';

export default function QRCode({ setListBox }) {
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  const route = useRoute();
  const { state, idBox } = route.params;

    const navigateToScreen = async () => {
      navigation.goBack();
    };
    
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        ( async () => {
          let result = await getBookById(data?.split('/')[1]);
          let parse = JSON.parse(result);
          if (state == 'borrow') {
            const updatedList = await borrowBook(parse.id, idBox);
            const parsedList = JSON.parse(updatedList);

            setListBox(parsedList);
          } else if (state == 'return') {
            const updatedList = await returnBook(parse.id, idBox);
            const parsedList = JSON.parse(updatedList);

            setListBox(parsedList);
          }
          navigateToScreen();
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