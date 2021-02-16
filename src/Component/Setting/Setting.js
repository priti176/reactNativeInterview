import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import RNExitApp from 'react-native-exit-app';
import withConnect from '../../Util/withConnect'

 function Setting({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const onPressExit = () => {
        setModalVisible(!modalVisible);
    }
    const onNavigateButtonClicked = () => {
        setModalVisible(!modalVisible);
        navigation.navigate('Home');
    }
    const onExitButtonClicked = () => {
        setModalVisible(!modalVisible);
        RNExitApp.exitApp();
    }
    return (
        <View style={styles.container}>

            <Pressable onPress={onPressExit} style={[{ backgroundColor: '#94EBCD', height: 40, width: 100, borderRadius: 20 }, styles.center]}>
                <Text style={{ fontSize: 16, color: '#000' }} >Exit</Text>
            </Pressable>
            <Modal
                animationType="fade"
                transparent
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <View style={styles.centeredView}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose, { width: '80%', alignSelf: 'center' }]}
                                    onPress={onNavigateButtonClicked}
                                >
                                    <Text style={styles.textStyle}>Navigate</Text>
                                </Pressable>
                                <View style={{ height: 40, justifyContent: 'flex-end', flexDirection: 'row', marginTop: 20, marginRight: 10 }}>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={onExitButtonClicked}
                                    >
                                        <Text style={styles.textStyle}>Exit</Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.button, { marginLeft: 15 }]}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Text style={styles.textStyle}>No</Text>
                                    </Pressable>
                                </View>

                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}

export default withConnect(Setting)

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    modalView: {
        paddingTop: 30,
        paddingBottom: 15,
        backgroundColor: "white",
        borderRadius: 8,
        width: '70%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "#000000",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
})