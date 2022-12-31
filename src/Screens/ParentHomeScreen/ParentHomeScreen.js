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
import { useSelector, useDispatch } from "react-redux";
import { cardColors } from "../../DataStore/TimeData";
import AttendanceAdminModal from "../../Components/AttendanceAdminModal";
import AttendanceDetails from "../../Components/AttendanceDetails";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { addExpoToken } from "../../Redux/Action/actions";
import Constants from "expo-constants";

function ParentHomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [loader, setLoader] = useState(false);
  const { height } = Dimensions.get("window");
  const [objectKey, setObjectKey] = useState("");
  const [object, setObject] = useState("");
  const [notificationTxt, setNotificationTxt] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalAttendance, setShowModalAttendance] = useState(false);
  const { parentCnic } = useSelector((reducers) => reducers.ParentReducer);
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      console.log("token----g-----" + token);
      dispatch(addExpoToken(token));
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {});

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      // console.log('status', status);
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("token....", token);
    } else {
      Alert.alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

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
            Notifications: child.val().Notifications,
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
      return (
        <Pressable
          onPress={() => {
            setShowModal(true);
            setObjectKey(item.key);
            setObject(item);
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
        object={object}
      />
    </View>
  );
}
export default ParentHomeScreen;
