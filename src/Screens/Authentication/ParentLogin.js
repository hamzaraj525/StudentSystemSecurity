import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import style from "./style";
import Images from "../../Constraints/Images";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Constraints from "../../Constraints/Constraints";
import { useDispatch, useSelector } from "react-redux";
import { addParentCnic } from "./../../Redux/Action/actions";
import { useNavigation } from "@react-navigation/native";

const ParentLogin = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [cnic, setCnic] = useState("");
  const [loader, setLoader] = useState(false);

  const LogIn = () => {
    if (cnic.length < 1) {
      alert("Enter CNIC");
    } else {
      dispatch(addParentCnic(cnic));
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
        navigation.navigate("ParentHomeScreen");
        setCnic("");
      }, 1200);
    }
  };

  const handleCNIC = (text) => {
    const res = text.replace(/(\d{5})(\d{7})(\d{1})/, "$1-$2-$3");
    setCnic(res);
  };

  return (
    <View style={style.container}>
      <StatusBar
        barStyle={"dark-content"}
        hidden={true}
        backgroundColor="#0E0A30"
      />

      <ScrollView
        bounces={true}
        contentContainerStyle={{
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Image style={style.icon} source={Images.passwordImg} />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            color: "black",
            marginTop: "7%",
          }}
        >
          Parent Login
        </Text>

        <View style={[style.passwordContainer, { marginTop: "7%" }]}>
          <Feather name="lock" size={20} color={"black"} />
          <TextInput
            maxLength={15}
            keyboardType="phone-pad"
            style={style.TiName}
            value={cnic}
            onChangeText={(text) => {
              handleCNIC(text);
            }}
            placeholder="Enter your CNIC"
          />
        </View>

        <TouchableOpacity
          disabled={loader ? true : false}
          onPress={() => {
            LogIn();
          }}
          style={style.loginBtn}
        >
          {loader ? (
            <ActivityIndicator style={{}} size="small" color="white" />
          ) : (
            <>
              <Text style={style.sinupBtn}>{Constraints.NEXT_BTN}</Text>
              <Ionicons
                style={{ marginLeft: "3%" }}
                name={"arrow-forward"}
                size={25}
                color={"white"}
              />
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AuthStack");
          }}
          style={[style.loginBtn, { marginTop: 20 }]}
        >
          <Text style={style.sinupBtn}>Admin</Text>
          <Ionicons
            style={{ marginLeft: "3%" }}
            name={"arrow-forward"}
            size={25}
            color={"white"}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default ParentLogin;
