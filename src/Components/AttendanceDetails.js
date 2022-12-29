import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Alert,
  Modal,
  FlatList,
  StatusBar,
  Pressable,
  BackHandler,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Constraints from "./../Constraints/Constraints";
import { colors, cardLength } from "./../DataStore/TimeData";
import firebase from "firebase";
import * as Animatable from "react-native-animatable";
import { time } from "./../DataStore/TimeData";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");

const AttendanceDetails = ({ props, route }) => {
  const navigation = useNavigation();
  const [list, setList] = useState([]);
  const [date, setDate] = useState(new Date());
  const { ObjectKey } = route.params;

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    firebase
      .database()
      .ref("studentsData/" + ObjectKey + "/Attendance")
      .on("value", (snapshot) => {
        var li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            StdAttendance: child.val().StdAttendance,
            FullDate: child.val().FullDate,
          });
        });

        setList(li);
      });
  };

  const header = ({ item, index }) => {
    return (
      <>
        <Text style={[styles.titleSchedule, {}]}>{Constraints.FOOTERTXT}</Text>
      </>
    );
  };
  const footer = ({ item, index }) => {
    return <></>;
  };

  const renderTime = ({ item, index }) => {
    return (
      <Animatable.View
        iterationCount={1}
        useNativeDriver={true}
        delay={index * 40}
        animation={"slideInLeft"}
        style={[
          styles.parent,
          {
            width: cardLength[index % cardLength.length],
          },
        ]}
      >
        <Pressable
          style={[
            styles.red,
            {
              width: cardLength[index % cardLength.length],
              backgroundColor: colors[index % colors.length],
            },
          ]}
          onPress={() => {
            // onPress(item);
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={[
                styles.timeTitle,
                {
                  color: index % 2 ? "white" : "black",
                },
              ]}
            >
              {item.FullDate}
            </Text>
            <View
              style={[
                styles.bottomLine,
                {
                  backgroundColor: index % 2 ? "white" : "black",
                },
              ]}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={[
                styles.timeTitle,
                {
                  color: index % 2 ? "white" : "black",
                },
              ]}
            >
              {item.StdAttendance}
            </Text>

            <View
              style={[
                styles.bottomLine,
                {
                  backgroundColor: index % 2 ? "white" : "black",
                },
              ]}
            />
          </View>
        </Pressable>
      </Animatable.View>
    );
  };
  const renderData = () => {
    return (
      <>
        <View style={styles.header}>
          <Pressable
            style={styles.btnBack}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Fontisto
              style={{ marginTop: "2%" }}
              name="arrow-left-l"
              size={28}
              color={"rgb(55,83,108)"}
            />
          </Pressable>
        </View>

        <FlatList
          data={list}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderTime}
          ListHeaderComponent={header}
          ListFooterComponent={footer}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListHeaderComponentStyle={{
            paddingHorizontal: "6%",
            marginBottom: "4%",
          }}
          keyExtractor={(item) => item.key}
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#000000aa" />
      <SafeAreaView style={styles.container}>{renderData()}</SafeAreaView>
    </View>
  );
};
export default AttendanceDetails;
