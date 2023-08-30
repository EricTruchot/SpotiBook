import AsyncStorage from '@react-native-async-storage/async-storage';

// Stocker une valeur
export const storeData = async (key, value) => {
      await AsyncStorage.setItem(key, value);
  };
  
  // Récupérer une valeur
  export const retrieveData = async (key) => {
      const value = await AsyncStorage.getItem(key);
  };
  
  // Supprimer une valeur
  export const removeData = async (key) => {
      await AsyncStorage.removeItem(key);
  };