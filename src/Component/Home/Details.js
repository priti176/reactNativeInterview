import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, FlatList, ActivityIndicator, ScrollView, KeyboardAvoidingView, Keyboard,Share } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Item from './Item';
import { getApiData, clearApiData, addDataToList } from '../../Action/HomeAction';
import withConnect from '../../Util/withConnect'

 function Details() {
    const dispatch = useDispatch()
    const { personalData, apiListData, isLoading } = useSelector(state => state.home_reducer);
    const [typedContent, setTypedContent] = useState('')
    const [pageCount, setPageCount] = useState(1)

    useEffect(() => {
        getApiData(dispatch, pageCount, apiListData);

    }, [pageCount])

    useEffect(() => {
        return () => {
            clearApiData(dispatch)
        }
    }, [])

    const onShareButtonClicked = async () => {
        try {
            const result = await Share.share({
                message:
                    `Hi i am ${personalData.Name} working as ${personalData.Profession} and having work experience
                    of ${personalData.Work_experience}`,
            });
        } catch (error) {
            alert(error.message);
        }
    };

    const onPlusButtonClicked = () => {
        if (typedContent) {
            addDataToList(dispatch, typedContent, apiListData)
            setTypedContent('')
            Keyboard.dismiss()
        } else {
            alert('Please type some content to add to the list.')
        }
    }

    const func_AddNewRows = () => {
        setPageCount(pageCount + 1)
    }

    const renderItem = ({ item }) => (
        <Item title={item.email} />
    );

    const renderLoader = () => {
        if (isLoading) {
            return (
                <View style={{ height: 80, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={"padding"}
            style={styles.container}
        >
            <View style={styles.container}>

                <View style={styles.card}>
                    <Text style={styles.cardText}>{personalData.Name}</Text>
                    <Text style={styles.cardText}>{personalData.Address}</Text>
                    <Text style={styles.cardText}>{personalData.Location}</Text>
                    <Text style={styles.cardText}>{personalData.Profession}</Text>
                    <Text style={styles.cardText}>{personalData.Work_experience}</Text>
                </View>

                <View style={{ flex: 1, marginVertical: 10 }}>
                    <FlatList
                        data={apiListData}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReachedThreshold={0.5}
                        initialNumToRender={15}
                        onEndReached={({ distanceFromEnd }) => {
                            if (distanceFromEnd >= 0) {
                                func_AddNewRows();
                            }
                        }}
                        ListFooterComponent={renderLoader()}
                        ListHeaderComponent={<View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Pressable
                                style={[styles.button]}
                                onPress={onShareButtonClicked}
                            >
                                <Text style={styles.textStyle}>Share</Text>
                                <Ionicons name={'share-social-outline'} size={20} color={'#000000'} />
                            </Pressable>
                        </View>}
                    />
                </View>
                <View style={{ height: 50, flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
                    <TextInput
                        style={{ height: 40, borderColor: '#94EBCD', borderWidth: 1, width: '80%' }}
                        onChangeText={text => setTypedContent(text)}
                        value={typedContent}
                    />
                    <Pressable
                        style={[styles.button, { paddingHorizontal: 10 }]}
                        onPress={onPlusButtonClicked}
                    >
                        <Ionicons name={'md-add'} size={30} color={'#000000'} />
                    </Pressable>
                </View>

            </View>
        </KeyboardAvoidingView>
    )
}

export default withConnect(Details)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        height: 35,
        paddingHorizontal: 20,
        backgroundColor: '#94EBCD',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        flexDirection: 'row'
    },
    textStyle: {
        color: "#000000",
        fontWeight: "bold",
        textAlign: "center",
        marginRight: 10
    },
    card: {
        padding: 15,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: "white",
        borderRadius: 8,
        width: '90%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        alignSelf: 'center'
    },
    cardText: {
        fontSize: 14,
        lineHeight: 22
    }
})
