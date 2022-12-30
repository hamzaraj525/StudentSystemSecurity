import React, { useState, useRef, useEffect } from "react";
import {
  StatusBar,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  Pressable,
  FlatList,
} from "react-native";
import style from "./style";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { cardColors } from "../../DataStore/TimeData";
import AttendanceAdminModal from "../../Components/AttendanceAdminModal";
import AttendanceDetails from "../../Components/AttendanceDetails";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowAlert: true,
    };
  },
});

const allowsNotificationsAsync = async () => {
  const settings = await Notifications.getPermissionsAsync();
  return (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
};

const requestPermissionsAsync = async () => {
  return await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });
};

function ParentHomeScreen({ navigation }) {
  const [list, setList] = useState([]);
  const [loader, setLoader] = useState(false);
  const { height } = Dimensions.get("window");
  const [objectKey, setObjectKey] = useState("");
  const [notificationTxt, setNotificationTxt] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalAttendance, setShowModalAttendance] = useState(false);
  const { parentCnic } = useSelector((reducers) => reducers.ParentReducer);

  const handleAllNotifications = (item) => {
    // if (item.NotificationToken === "1") {
    //   scheduleNotificationHandler1();
    // } else if (item.NotificationToken === "2") {
    //   scheduleNotificationHandler2();
    // } else if (item.NotificationToken === "3") {
    //   scheduleNotificationHandler3();
    // } else if (item.NotificationToken === "4") {
    //   scheduleNotificationHandler4();
    // } else {
    //   console.log("nothing");
    // }
  };

  // const scheduleNotificationHandler1 = async () => {
  //   const hasPushNotificationPermissionGranted =
  //     await allowsNotificationsAsync();

  //   if (!hasPushNotificationPermissionGranted) {
  //     await requestPermissionsAsync();
  //   }

  //   Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "Student Security System",
  //       body: "Your child is present at school",
  //     },
  //     trigger: {
  //       seconds: 1,
  //     },
  //   });
  // };

  // const scheduleNotificationHandler2 = async () => {
  //   const hasPushNotificationPermissionGranted =
  //     await allowsNotificationsAsync();

  //   if (!hasPushNotificationPermissionGranted) {
  //     await requestPermissionsAsync();
  //   }

  //   Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "Student Security System",
  //       body: "Your child is checked out class school ",
  //     },
  //     trigger: {
  //       seconds: 1,
  //     },
  //   });
  // };

  // const scheduleNotificationHandler3 = async () => {
  //   const hasPushNotificationPermissionGranted =
  //     await allowsNotificationsAsync();

  //   if (!hasPushNotificationPermissionGranted) {
  //     await requestPermissionsAsync();
  //   }

  //   Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "Student Security System",
  //       body: "Your child is not arrived at school",
  //     },
  //     trigger: {
  //       seconds: 1,
  //     },
  //   });
  // };

  // const scheduleNotificationHandler4 = async () => {
  //   const hasPushNotificationPermissionGranted =
  //     await allowsNotificationsAsync();

  //   if (!hasPushNotificationPermissionGranted) {
  //     await requestPermissionsAsync();
  //   }

  //   Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "Student Security System",
  //       body: "Your child is on the bus now",
  //     },
  //     trigger: {
  //       seconds: 1,
  //     },
  //   });
  // };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoader(true);
    firebase
      .database()
      .ref("/studentsData")
      .on("value", (snapshot) => {
        var li = [];
        snapshot.forEach((child) => {
          console.log(child.val());
          li.push({
            key: child.key,
            parentCNIC: child.val().parentCNIC,
            age: child.val().age,
            address: child.val().address,
            phone: child.val().phone,
            studentName: child.val().studentName,
            Status: child.val().Status,
            studentClass: child.val().studentClass,
            NotificationToken: child.val().NotificationToken,
          });
        });
        setLoader(false);
        setList(li);
      });
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const hideModalAttendance = () => {
    setShowModalAttendance(false);
  };
  const showAttendanceModal = () => {
    setShowModalAttendance(true);
  };

  const renderServicesList = ({ item, index }) => {
    const initial = item.studentName
      .match(/\b(\w)/g)
      .join("")
      .toUpperCase();
    if (item.parentCNIC === parentCnic) {
      {
        handleAllNotifications(item);
      }
      return (
        <Pressable
          onPress={() => {
            setShowModal(true);
            setObjectKey(item.key);
          }}
          style={style.servicesContain}
        >
          <View style={style.card}>
            <View style={style.cardSubContainer}>
              <View style={style.picContainer}>
                <View
                  style={[
                    style.pic,
                    {
                      backgroundColor: cardColors[index % cardColors.length],
                    },
                  ]}
                >
                  <Text style={style.nameInitials}>{initial}</Text>
                </View>
              </View>
              <View style={style.cardSub}>
                <Text style={style.adres}>Name</Text>
                <Text
                  style={[style.name, { color: "black", fontWeight: "500" }]}
                >
                  {item.studentName}
                </Text>
              </View>
              <View style={style.cardSub}>
                <Text style={style.adres}>Status</Text>
                <Text
                  style={[style.name, { color: "navy", fontWeight: "500" }]}
                >
                  {item.Status}
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      );
    } else {
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgb(247,245,246)",
      }}
    >
      <StatusBar barStyle={"dark-content"} backgroundColor="rgb(247,245,246)" />
      <Text style={style.studentClassTxt}>Your Son / Daughter</Text>
      <View>
        {!loader ? (
          <>
            {list.length > 0 ? (
              <FlatList
                data={list}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={renderServicesList}
                contentContainerStyle={{ paddingBottom: 20, marginTop: "4%" }}
                keyExtractor={(item) => item.key}
              />
            ) : (
              <Text style={style.txt}>You have No Students for now</Text>
            )}
          </>
        ) : (
          <View style={{ alignItems: "center", marginTop: height / 4 }}>
            <ActivityIndicator color={"#3372e2"} size={"large"} />
          </View>
        )}
      </View>
      <AttendanceAdminModal
        showModal={showModal}
        hideModal={hideModal}
        hideModalAttendance={hideModalAttendance}
        showAttendanceModal={showAttendanceModal}
        navigation={navigation}
        objectKey={objectKey}
      />
    </View>
  );
}
export default ParentHomeScreen;
