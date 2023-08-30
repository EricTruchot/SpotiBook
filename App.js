import AccueilUnregistered from "./src/app/accueil/AccueilUnregistered";
import Map from "./src/app/map/MapPage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccueilRegistered from "./src/app/accueil/AccueilRegistered";

export default function App() {
    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Accueil" component={ AccueilUnregistered } />
                <Tab.Screen name="AccueilRegistered" component={ AccueilRegistered } />
                <Tab.Screen name="Carte" component={ Map } />
            </Tab.Navigator>
        </NavigationContainer>
    )
}