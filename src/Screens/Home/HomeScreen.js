import style from "./style";
import Images from "./../../Constraints/Images";
import React, { useEffect, useState, useRef } from "react";
import * as Animatable from "react-native-animatable";
import Constraints from "../../Constraints/Constraints";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  Text,
  View,
  Image,
  Pressable,
  StatusBar,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import servicesList from "./../../DataStore/HomeDataa";

function HomeScreen({ navigation, route }) {
  const servicesHeader = () => {
    return (
      <>
        <View style={style.welcomeTxtBody}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Image style={style.logo} source={Images.logo} />
          </View>
          <View style={style.welcomeTxtBodyLeft}>
            <View style={style.txt}>
              <View style={style.txtHeaderContainer}>
                <Text style={style.txtTitle}>{Constraints.appName}</Text>
              </View>
              <Text style={style.txtSub}>{Constraints.SUBTITLE}</Text>
              <Text
                style={[
                  style.txtSub,
                  {
                    color: "rgb(254,207,116)",
                  },
                ]}
              >
                {Constraints.SUBTITLE}
              </Text>
            </View>
          </View>
        </View>
        <Pressable
          style={style.uploadBtn}
          onPress={() => {
            navigation.navigate("UploadNewStudent");
          }}
        >
          <AntDesign name="cloudupload" size={22} color={"white"} />
        </Pressable>
      </>
    );
  };

  const ServicesList = ({ item, index }) => {
    return (
      <Animatable.View
        useNativeDriver={true}
        delay={index * 70}
        animation={"bounceIn"}
      >
        <Pressable
          onPress={() => {
            if (item.key === "1") {
              navigation.navigate("ClassStudentsList1");
            } else if (item.key === "2") {
              navigation.navigate("ClassStudentsList2");
            } else if (item.key === "3") {
              navigation.navigate("ClassStudentsList3");
            } else if (item.key === "4") {
              navigation.navigate("ClassStudentsList4");
            } else if (item.key === "5") {
              navigation.navigate("ClassStudentsList5");
            } else if (item.key === "6") {
              navigation.navigate("ClassStudentsList6");
            } else if (item.key === "7") {
              navigation.navigate("ClassStudentsList7");
            } else if (item.key === "8") {
              navigation.navigate("ClassStudentsList8");
            } else if (item.key === "9") {
              navigation.navigate("ClassStudentsList9");
            } else {
              navigation.navigate("ClassStudentsList10");
            }
          }}
        >
          <ImageBackground
            imageStyle={{ borderRadius: 8 }}
            resizeMode="cover"
            source={{
              uri: item.img,
            }}
            style={style.card}
          >
            <Text style={style.cardSubTitleTxt}>{item.title}</Text>
          </ImageBackground>
        </Pressable>
      </Animatable.View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "rgb(247,245,246)" }}>
      <StatusBar barStyle="dark-content" backgroundColor="rgb(254,207,116)" />
      <FlatList
        data={servicesList}
        renderItem={ServicesList}
        ListHeaderComponent={servicesHeader}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}
export default HomeScreen;
