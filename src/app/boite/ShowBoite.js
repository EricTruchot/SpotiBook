import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, FlatList, Image } from 'react-native';
import { getAllBooksFromIdBox } from '../services/api';
import { useNavigation } from '@react-navigation/native';

export default function ShowBoite({ boxInfos, listBox, setListBox, isLoggedIn }) {
    const navigation = useNavigation();
    useEffect(() => {
        (async () => {
            let result = await getAllBooksFromIdBox(boxInfos?.id);
            setListBox(JSON.parse(result))
        })();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.boxTitle}>{ boxInfos?.nom } </Text>
            { listBox && listBox.length != 0 ? (
                <>
                <Text style={styles.subtitle}>Voici la liste des livres disponibles dans cette boite:</Text>
                    <FlatList
                    data={listBox}
                    renderItem={({item}) =>  
                    <>
                     
                    <View style={styles.card} >
                    <Image
                        source={{ uri: item?.image }}
                        style={{ width: 190, height: 265 }}
                    />
                    <View style={styles.container} >
                        <Text style={styles.innerText}>Titre: {item?.nom} de </Text>
                        <Text style={styles.innerText}>Auteur: {item?.auteur}</Text>
                        <Text style={styles.innerText}>Description: {item?.résumé}</Text>
                    </View>
                    </View>
                    </>
                }
                    keyExtractor={item => item?.id}
                />
                </>
            ) : (
                <Text>Il n'y a aucun livre dans cette boite actuellement.</Text>
            )}
                 
            { isLoggedIn  ? (
                <>
                <Text style={styles.spacer}></Text>
                { listBox && listBox.length != 0 && (
                    <Button
                        title="Emprunter un livre"
                        // color="#841584"
                        onPress={() => navigation.navigate('QRCode', { state: 'borrow', idBox: boxInfos?.id }) }
                        />
                )}
                    <Text style={styles.spacer}></Text>
                    <Button
                        title="Rendre un livre"
                        // color="#841584"
                        onPress={() => navigation.navigate('QRCode', { state: 'return', idBox: boxInfos?.id }) }
                        />
                       <Text style={styles.spacer}></Text>
                </>
            ) : (
                <Text style={styles.bottomText}>Vous devez être connecté pour pouvoir emprunter ou rendre un livre</Text>
            )}
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        flex: 1,
        padding:30,
        alignSelf:'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'#242331',
        marginVertical:5     
    },
    bottomText: {
        width:'100%',
        backgroundColor: '#E0F5EA',
        textAlign:'center',
    },
    boxTitle: {
        color:'black',
        width: '100%',
        backgroundColor: 'white',
        textAlign:'center',
        fontSize:20,
        fontWeight:'800'
    },
    subtitle: {
        color:'black',
        width: '100%',
        backgroundColor: 'white',
        textAlign:'center',
        fontSize:20,
        fontWeight:'400'
    },
    spacer: {
        padding:0,
        margin:-6,
    },
    innerText: {
        marginVertical:2,
        flex:1,
        alignSelf:'flex-start',
        justifyContent: 'flex-start',
        alignItems: 'center',
       textAlign:'left'
    },

})