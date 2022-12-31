import React, { useState, useEffect } from "react";
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
import Fontisto from "react-native-vector-icons/Fontisto";
import firebase from "firebase";
import { cardColors } from "./../../DataStore/TimeData";
import AttendanceModal from "./../../Components/AttendanceModal";

function ClassStudentsList1({ navigation }) {
  const { height, width } = Dimensions.get("window");
  const [list, setList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [objectKey, setObjectKey] = useState("");
  const [object, setObject] = useState("");

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

  const renderServicesList = ({ item, index }) => {
    const initial = item.studentName
      .match(/\b(\w)/g)
      .join("")
      .toUpperCase();
    if (item.studentClass === "1") {
      return (
        <Pressable
          onPress={() => {
            setShowModal(true);
            setObjectKey(item.key);
            setObject(item);
          }}
          style={style.servicesContain}
        >
          <View style={style.cardSubContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
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

              <View style={[style.cardSub, { marginLeft: "7%" }]}>
                <Text style={style.adres}>Name</Text>
                <Text
                  style={[style.name, { color: "black", fontWeight: "500" }]}
                >
                  {item.studentName}
                </Text>
              </View>
            </View>

            <View style={style.cardSub}>
              <Text style={style.adres}>Status</Text>
              <Text style={[style.name, { color: "navy", fontWeight: "500" }]}>
                {item.Status}
              </Text>
            </View>
          </View>
        </Pressable>
      );
    } else {
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "rgb(247,245,246)" }}>
      <StatusBar barStyle={"dark-content"} backgroundColor="rgb(247,245,246)" />
      <Pressable onPress={() => navigation.goBack()}>
        <Fontisto
          style={{ marginTop: "6%", paddingHorizontal: "7%" }}
          name="arrow-left-l"
          size={28}
          color={"rgb(55,83,108)"}
        />
      </Pressable>
      <Text style={style.studentClassTxt}>Class 1 Students</Text>
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
              <View style={{ alignSelf: "center", marginTop: "20%" }}>
                <Text style={style.txt}>You have No Students for now</Text>
              </View>
            )}
          </>
        ) : (
          <View style={{ alignItems: "center", marginTop: height / 4 }}>
            <ActivityIndicator color={"#3372e2"} size={"large"} />
          </View>
        )}
      </View>
      <AttendanceModal
        showModal={showModal}
        hideModal={hideModal}
        navigation={navigation}
        objectKey={objectKey}
        object={object}
      />
    </View>
  );
}
export default ClassStudentsList1;
