import AsyncStorage from '@react-native-async-storage/async-storage';

// Stocker une valeur
export const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('Données stockées avec succès.');
    } catch (error) {
      console.log('Erreur lors de la sauvegarde des données:', error);
    }
  };
  
  // Récupérer une valeur
  export const retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('Valeur récupérée:', value);
      }
    } catch (error) {
      console.log('Erreur lors de la récupération des données:', error);
    }
  };
  
  // Supprimer une valeur
  export const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log('Données supprimées avec succès.');
    } catch (error) {
      console.log('Erreur lors de la suppression des données:', error);
    }
  };