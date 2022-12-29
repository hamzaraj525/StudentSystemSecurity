import React, { useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Text,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import style from "./style";

import firebase from "firebase";

const UploadNewStudent = ({ navigation, route }) => {
  const [studentName, setStudentName] = useState("");
  const [address, setAddress] = useState("");
  const [PrentNIC, setPrentNIC] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [date, setDate] = useState(new Date());
  const [loader, setLoader] = useState(false);

  //will post data to realTime Database
  const postData = async () => {
    const newReference = firebase.database().ref("/studentsData").push();
    if (
      studentName === "" ||
      address === "" ||
      PrentNIC === "" ||
      phone === "" ||
      age === "" ||
      studentClass === "" ||
      phone.length !== 11
    ) {
      alert("Please fill all the fields");
    } else {
      setLoader(true);
      newReference
        .set({
          key: newReference.key,
          studentName: studentName,
          address: address,
          parentCNIC: PrentNIC,
          phone: phone,
          age: age,
          studentClass: studentClass,
          Status: "Home",
          Attendance: "",
        })
        .then(() => {
          setLoader(false);
          navigation.navigate("HomeScreen");
          setStudentName("");
          setAddress("");
          setPrentNIC("");
          setPhone("");
          setAge("");
        })
        .catch(() => {
          setLoader(false);
        });
    }
  };

  const handleCNIC = (text) => {
    const res = text.replace(/(\d{5})(\d{7})(\d{1})/, "$1-$2-$3");
    setPrentNIC(res);
  };

  //All JSX
  return (
    <View
      style={[
        style.container,
        {
          backgroundColor: "rgb(135,199,239)",
        },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="rgb(135,199,239)" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: "7%" }}
        contentContainerStyle={{ paddingBottom: "10%" }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Fontisto
            style={{ marginTop: "6%" }}
            name="arrow-left-l"
            size={28}
            color={"rgb(55,83,108)"}
          />
        </Pressable>
        <Text style={style.boldTt}>New Student</Text>
        <Text style={style.newUserTxt}>Create Student</Text>

        <View style={style.parentContainer}>
          <Text style={style.inputHeader}>Name</Text>
          <TextInput
            value={studentName}
            style={style.txtInput}
            onChangeText={(text) => setStudentName(text)}
            placeholder="Enter Name"
            placeholderTextColor={"grey"}
          />
          <View style={style.borderLine} />
          <Text style={style.inputHeader}>Address</Text>
          <TextInput
            value={address}
            style={style.txtInput}
            onChangeText={(text) => setAddress(text)}
            placeholder="Enter Address"
            placeholderTextColor={"grey"}
          />
          <View style={style.borderLine} />

          <Text style={style.inputHeader}>CNIC</Text>
          <TextInput
            maxLength={15}
            keyboardType="number-pad"
            value={PrentNIC}
            style={style.txtInput}
            onChangeText={(text) => handleCNIC(text)}
            placeholder="Enter CNIC"
            placeholderTextColor={"grey"}
          />
          <View style={style.borderLine} />
          <Text style={style.inputHeader}>Age</Text>
          <TextInput
            maxLength={3}
            keyboardType="number-pad"
            value={age}
            style={style.txtInput}
            onChangeText={(text) => setAge(text)}
            placeholder="Enter Age"
            placeholderTextColor={"grey"}
          />

          <View style={style.borderLine} />
          <Text style={style.inputHeader}>Telephone</Text>
          <TextInput
            maxLength={11}
            keyboardType="number-pad"
            value={phone}
            style={style.txtInput}
            onChangeText={(text) => setPhone(text)}
            placeholder="Enter Phone"
            placeholderTextColor={"grey"}
          />
          <View style={style.borderLine} />
          <Text style={style.inputHeader}>Class</Text>
          <TextInput
            maxLength={1}
            keyboardType="number-pad"
            value={studentClass}
            style={style.txtInput}
            onChangeText={(text) => setStudentClass(text)}
            placeholder="Enter Class"
            placeholderTextColor={"grey"}
          />
          <View style={[style.borderLine, { height: 1 }]} />
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            postData();
          }}
          style={[style.loginBtn]}
        >
          {loader ? (
            <View style={style.loaderStyle}>
              <ActivityIndicator style={{}} size="small" color="black" />
            </View>
          ) : (
            <Text style={style.btnPost}>Post</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default UploadNewStudent;
