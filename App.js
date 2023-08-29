import HomeScreen from "./src/app";
import MapPage from "./src/app/map";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function App() {
    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component = { HomeScreen } />
                <Tab.Screen name="Map" component = { MapPage } />
            </Tab.Navigator>
        </NavigationContainer>
    )
}