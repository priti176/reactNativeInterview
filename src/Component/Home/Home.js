import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, BackHandler, Alert } from 'react-native'
import withConnect from '../../Util/withConnect';
import RNExitApp from 'react-native-exit-app';
const { height, width } = Dimensions.get('window');

function Home({ navigation }) {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);
    const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to go exit the App?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => RNExitApp.exitApp() }
        ]);
        return true;
    };

    const onIconPressed = () => {
        navigation.navigate('Details')
    }

    return (
        <View style={styles.container}>
            <View style={[styles.subContainer, styles.center]}>
                <Text style={styles.headerText}>Welcome</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onIconPressed}
                    style={[styles.userView, styles.center]}>
                    <Image resizeMode='cover' source={require('../../Img/user.png')} style={{ height: height / 5.2, width: width / 3.2 }}></Image>
                </TouchableOpacity>
                <Text style={{ fontSize: 16 }}>Hello React Native User</Text>
            </View>
        </View>
    )
}
export default withConnect(Home);

const userViewSize = height / 4
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subContainer: {
        flex: 1
    },
    connectionInfo: {
        height: 50, justifyContent: 'center'
    },
    connectionInfoText: {
        fontSize: 14, color: '#ffffff', paddingLeft: 12
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 40, fontWeight: 'bold', textAlign: 'center'
    },
    userView: {
        height: userViewSize, width: userViewSize, borderRadius: userViewSize, borderWidth: 10, borderColor: '#ccc', overflow: 'hidden', marginBottom: 20, marginTop: 100
    }
})