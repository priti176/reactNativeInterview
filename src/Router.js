import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


import Home from "./Component/Home/Home";
import Setting from "./Component/Setting/Setting";
import Details from "./Component/Home/Details";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const SettingsStackScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Setting" component={Setting} options={{ title: 'Setting Screen' }} />
        </Stack.Navigator>
    );
}

const tabScreen = ({ initRoute }) => {
    return (
        <Tab.Navigator initialRouteName={initRoute}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Setting') {
                        iconName = 'settings-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Setting" component={SettingsStackScreen} options={{ title: 'Setting' }} />
        </Tab.Navigator>
    );
}

export default function Router({ initRoute }) {
    return (
        <>
            { initRoute != null ?
                <Stack.Navigator initialRouteName={initRoute}  >
                    <Stack.Screen name="Tab" component={tabScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Details" component={Details} />
                </Stack.Navigator> : null}
        </>
    )
}
