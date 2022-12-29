import React, { useState, useRef, useEffect } from "react";
import {
  StatusBar,
  View,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import NetInfo from "@react-native-community/netinfo";
import Images from "../../Constraints/Images";
function SplashScreen({ navigation }) {
  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected === true) {
        setTimeout(() => {
          navigation.replace("AuthStack");
        }, 1700);
      } else {
        setTimeout(() => {
          alert("Internet Connection is Not good");
        }, 3000);
      }
      console.log("Is connected?", state.isConnected);
    });
  };

  return (
    <SafeAreaView style={[styles.container, {}]}>
      <StatusBar
        barStyle={"dark-content"}
        hidden={true}
        backgroundColor="#0E0A30"
      />
      <View
        style={{
          width: Dimensions.get("window").width,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image style={styles.image} source={Images.logo} />

          <Text
            style={{
              fontSize: 20,
              color: "black",
              fontWeight: "500",
              marginTop: 7,
            }}
          >
            School Management System
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "black",
              marginTop: 5,
              fontWeight: "500",
            }}
          >
            Secure Your Child
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 80,
    height: 80,
  },
});
