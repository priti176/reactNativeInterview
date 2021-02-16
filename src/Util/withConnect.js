import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'

import NetInfo from "@react-native-community/netinfo";

const ConnectMessage = 'Connecting back'
const DisConnectMessage = 'Could not connect to internet'

const withConnect = (WrappedComponent) => (props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnectionInfoShow, setConnectionInfoShow] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected)
      if (!state.isConnected) {
        setConnectionInfoShow(true)
        fadeIn()
      }
      if (isConnectionInfoShow) {
        fadeIn()
        setTimeout(() => {
          fadeOut()
        }, 4000);
      }
    });

    return () => {
      unsubscribe();
      setConnectionInfoShow(false)
    }
  }, [isConnected])

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 50,
      duration: 500,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
    }).start();
  };
  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[
          styles.connectionInfo,
          {
            height: fadeAnim,
            backgroundColor: isConnected ? 'green' : 'red'
          }
        ]}>
        <Text style={styles.connectionInfoText}>{isConnected ? ConnectMessage : DisConnectMessage}</Text>
      </Animated.View>
      <WrappedComponent {...props} />
    </View>
  )
}

export default withConnect;

const styles = StyleSheet.create({
  connectionInfo: {
    justifyContent: 'center'
  },
  connectionInfoText: {
    fontSize: 14, color: '#ffffff', paddingLeft: 12
  },
})