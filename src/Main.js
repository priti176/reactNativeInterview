import 'react-native-gesture-handler';
import React from 'react'
import { enableScreens } from 'react-native-screens';
import { StatusBar, SafeAreaView, View, StyleSheet,Text } from 'react-native'
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import Router from "./Router"
import { navigationRef } from './Util/RootNavigation';
import Store from './Store';

enableScreens();

export default function Main() {
    
    const store = Store({});
    return (
        <Provider store={store}>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content"></StatusBar>
                <NavigationContainer ref={navigationRef}>
                    <Router initRoute={'Home'} />
                </NavigationContainer>
            </SafeAreaView>
        </Provider>
    )
}

