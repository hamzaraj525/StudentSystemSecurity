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
import Images from "././../../Constraints/Images";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Constraints from "./../../Constraints/Constraints";

const AdminLogin = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const LogIn = () => {
    if (password.length < 1) {
      alert("Enter password");
    } else if (password === "12345") {
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
        navigation.navigate("AdminHomeStack");
        setPassword("");
      }, 1200);
    } else {
      alert("Wrong Password");
    }
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
          Admin Login
        </Text>

        <View style={[style.passwordContainer, { marginTop: "7%" }]}>
          <Feather name="lock" size={20} color={"black"} />
          <TextInput
            keyboardType="phone-pad"
            style={style.TiName}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            placeholder="Enter your password"
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
            navigation.navigate("ParentStack");
          }}
          style={[style.loginBtn, { marginTop: 20 }]}
        >
          <Text style={style.sinupBtn}>{Constraints.PARENTBTNTXT}</Text>
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
export default AdminLogin;
