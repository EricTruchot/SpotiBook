import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, FlatList } from 'react-native';
import { getAllBooksFromIdBox } from '../services/api';
import { useNavigation } from '@react-navigation/native';

export default function ShowBoite({ boxInfos, listBox, setListBox }) {
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            let result = await getAllBooksFromIdBox(boxInfos?.id);
            setListBox(JSON.parse(result))
        })();
    }, []);

    return (
        <>
        <View style={styles.container}>
            <Text>{ boxInfos?.nom }</Text>
                 <FlatList
                    data={listBox}
                    renderItem={({item}) =>  
                    <>
                        <Text>{item?.auteur}</Text>
                        <Text>{item?.nom}</Text>
                    </>
                }
                    keyExtractor={item => item?.id}
                />

            <Text>Veuillez scanner la boite dans laquelle vous voulez emprunter ou rendre un livre !</Text>
            <Button
                title="Emprunter"
                color="#841584"
                onPress={() => navigation.navigate('QRCode', { state: 'borrow', idBox: boxInfos?.id }) }
                />
            <Button
                title="Rendre"
                color="#841584"
                onPress={() => navigation.navigate('QRCode', { state: 'return', idBox: boxInfos?.id }) }
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