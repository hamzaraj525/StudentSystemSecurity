import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  Animated,
  Dimensions,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import * as Animatable from "react-native-animatable";
import firebase from "firebase";
import Constraints from "../Constraints/Constraints";
import { useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get("window");

const AttendanceAdminModal = (props) => {
  const navigation = useNavigation();
  const updateHomeArrived = () => {
    props.hideModal();
    firebase
      .database()
      .ref("studentsData/" + props.objectKey)
      .update({
        Status: "Home Arrived",
      })
      .then(() => {
        console.log("Student Home Status arrived updated.");
      });
  };

  const updateCheckedOut = () => {
    props.hideModal();
    firebase
      .database()
      .ref("studentsData/" + props.objectKey)
      .update({
        Status: "Leaving Home",
      })
      .then(() => {
        console.log("Student Checked Out Status updated.");
      });
  };

  const handleAttendanceModal = () => {
    props.hideModal();
    setTimeout(() => {
      navigation.navigate("AttendanceDetails", { ObjectKey: props.objectKey });
    }, 500);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        props.hideModal();
      }}
      visible={props.showModal}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#000000aa" />
      <SafeAreaView style={styles.container}>
        <Animatable.View
          duration={600}
          useNativeDriver={true}
          animation={"zoomIn"}
          style={styles.earningView}
        >
          <Pressable
            style={[styles.loginBtn, { backgroundColor: "rgb(110,100,155)" }]}
            onPress={() => {
              updateHomeArrived();
            }}
          >
            <Text style={styles.okBtnTxt}>{Constraints.ARRIVEDHOME}</Text>
          </Pressable>
          <Pressable
            style={[styles.loginBtn, { backgroundColor: "rgb(299,115,115)" }]}
            onPress={() => {
              updateCheckedOut();
            }}
          >
            <Text style={styles.okBtnTxt}>{Constraints.LEAVEHOME}</Text>
          </Pressable>
          <Pressable
            style={[styles.loginBtn, { backgroundColor: "rgb(299,115,115)" }]}
            onPress={() => {
              handleAttendanceModal();
            }}
          >
            <Text style={styles.okBtnTxt}>Attendance</Text>
          </Pressable>
        </Animatable.View>
      </SafeAreaView>
    </Modal>
  );
};
export default AttendanceAdminModal;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000000aa",
  },
  whiteContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  passwordContainer: {
    marginTop: "10%",
    flexDirection: "row",
    backgroundColor: "#F6F3F5",
    borderRadius: 25,
    padding: 12,
    width: "80%",
    height: 45,
    alignItems: "center",
    alignSelf: "center",
  },
  TiName: {
    width: "90%",
    height: 50,
    marginLeft: 6,
  },
  loginBtn: {
    width: width / 2,
    height: 50,
    backgroundColor: "rgb(253,183,77)",
    borderRadius: 30,
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  okBtnTxt: {
    fontSize: 17,
    fontWeight: "800",
    color: "white",
  },
  containerr: {
    width: "75%",
    height: "30%",
    backgroundColor: "#ffffff",
    borderRadius: 33,
  },

  earningView: {
    elevation: 15,
    borderRadius: 10,
    backgroundColor: "white",
    width: "80%",
    height: height / 3.5,
    alignSelf: "center",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
