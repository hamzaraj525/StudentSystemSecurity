import React, { Component } from "react";
import {
  LogBox,
  StatusBar,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
} from "react-native";
import Navigation from "./src/Screens/Navigations/Navigation";
import firebase from "firebase";

import { FIREBASE_CONFIG } from "./src/config";

firebase.initializeApp(FIREBASE_CONFIG);

function App({}) {
  return (
    <View style={{ flex: 1 }}>
      <Navigation />
    </View>
  );
}
export default App;
const styles = StyleSheet.create({});
