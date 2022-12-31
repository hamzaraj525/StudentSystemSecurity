import React, { useRef, useState, useEffect } from "react";
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
import { pushNotification } from "../Constraints/utils";
const { height, width } = Dimensions.get("window");

const AttendanceModal = (props) => {
  const [date, setDate] = useState(new Date());

  const updateHomeStatus = () => {
    props.hideModal();
    pushNotification({
      token: props.object?.Notifications,
      title: "Student security system",
      body: `${props.object.studentName} is present at school`,
    });
    firebase
      .database()
      .ref("studentsData/" + props.objectKey)
      .update({
        Status: "Present",
        // NotificationToken: "1",
      })
      .then(() => {
        console.log("Student Present Status updated.");
        firebase
          .database()
          .ref("studentsData/" + props.objectKey + "/Attendance")
          .push({
            StdAttendance: "Present",
            FullDate:
              date.getDate() +
              " / " +
              (date.getMonth() + 1) +
              " / " +
              date.getFullYear(),
          })
          .then(() => {});
      });
  };

  const updateCheckedOut = () => {
    props.hideModal();
    pushNotification({
      token: props.object?.Notifications,
      title: "Student security system",
      body: `${props.object.studentName} is checked out of school`,
    });
    firebase
      .database()
      .ref("studentsData/" + props.objectKey)
      .update({
        Status: "Checked Out",
        // NotificationToken: "2",
      })
      .then(() => {
        console.log("Student Checked out  Status updated.");
      });
  };

  const updateNotArrived = () => {
    props.hideModal();
    pushNotification({
      token: props.object?.Notifications,
      title: "Student security system",
      body: `${props.object.studentName} is not arrived at school`,
    });

    firebase
      .database()
      .ref("studentsData/" + props.objectKey)
      .update({
        Status: "Not Arrived",
        // NotificationToken: "3",
      })
      .then(() => {
        firebase
          .database()
          .ref("studentsData/" + props.objectKey + "/Attendance")
          .push({
            StdAttendance: "Absent",
            FullDate:
              date.getDate() +
              " / " +
              (date.getMonth() + 1) +
              " / " +
              date.getFullYear(),
          })
          .then(() => {
            console.log("Student Present Status updated.");
          });
      });
  };

  const updateBus = () => {
    props.hideModal();
    pushNotification({
      token: props.object?.Notifications,
      title: "Student security system",
      body: `${props.object.studentName} is on the bus now`,
    });
    firebase
      .database()
      .ref("studentsData/" + props.objectKey)
      .update({
        Status: "On the Bus",
        // NotificationToken: "4",
      })
      .then(() => {});
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
          <Text style={{ alignSelf: "center", fontSize: 15 }}>
            Change student status
          </Text>
          <Pressable
            style={[
              styles.loginBtn,
              {
                backgroundColor: "rgb(299,115,115)",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              },
            ]}
            onPress={() => {
              updateHomeStatus();
            }}
          >
            <Text style={styles.okBtnTxt}>{Constraints.PRESENT}</Text>
          </Pressable>
          <Pressable
            style={[
              styles.loginBtn,
              {
                borderRadius: 5,
                backgroundColor: "rgb(253,183,77)",
              },
            ]}
            onPress={() => {
              updateNotArrived();
            }}
          >
            <Text style={styles.okBtnTxt}>{Constraints.NOTARRIVED}</Text>
          </Pressable>
          <Pressable
            style={[
              styles.loginBtn,
              {
                backgroundColor: "rgb(299,115,115)",
                borderRadius: 5,
              },
            ]}
            onPress={() => {
              updateCheckedOut();
            }}
          >
            <Text style={styles.okBtnTxt}>{Constraints.CHECKEDOUT}</Text>
          </Pressable>
          <Pressable
            style={[
              styles.loginBtn,
              {
                backgroundColor: "rgb(253,183,77)",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              },
            ]}
            onPress={() => {
              updateBus();
            }}
          >
            <Text style={styles.okBtnTxt}>{Constraints.ONBUS}</Text>
          </Pressable>
        </Animatable.View>
      </SafeAreaView>
    </Modal>
  );
};
export default AttendanceModal;
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
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    elevation: 15,
    borderRadius: 10,
    backgroundColor: "white",
    paddingVertical: "4%",
  },
  loginBtn: {
    alignSelf: "center",
    marginTop: "4%",
    width: "75%",
    height: 50,
    backgroundColor: "rgb(253,183,77)",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  okBtnTxt: {
    fontSize: 17,
    fontWeight: "800",
    color: "white",
  },
});
