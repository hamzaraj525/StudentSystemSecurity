import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Easing } from "react-native";
import SplashScreen from "../../Screens/Splash/SplashScreen";
import HomeScreen from "../../Screens/Home/HomeScreen";
import UploadNewStudent from "../../Screens/UploadNewStudent/UploadNewStudent";
import ClassStudentsList1 from "../ClassStudentsList1/ClassStudentsList1";
import ClassStudentsList2 from "../ClassStudentsList2/ClassStudentsList2";
import ClassStudentsList3 from "../ClassStudentsList3/ClassStudentsList3";
import ClassStudentsList4 from "../ClassStudentsList4/ClassStudentsList4";
import ClassStudentsList5 from "../ClassStudentsList5/ClassStudentsList5";
import ClassStudentsList6 from "../ClassStudentsList6/ClassStudentsList6";
import ClassStudentsList7 from "../ClassStudentsList7/ClassStudentsList7";
import ClassStudentsList8 from "../ClassStudentsList8/ClassStudentsList8";
import ClassStudentsList9 from "../ClassStudentsList9/ClassStudentsList9";
import ClassStudentsList10 from "../ClassStudentsList10/ClassStudentsList10";
import ParentHomeScreen from "../ParentHomeScreen/ParentHomeScreen";
import AdminLogin from "./../Authentication/AdminLogin";
import ParentLogin from "./../Authentication/ParentLogin";
import AttendanceDetails from "../../Components/AttendanceDetails";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./../../Redux/Store/store";

const Stack = createNativeStackNavigator();

function Navigation({}) {
  const AuthStack = () => (
    <Stack.Navigator
      initialRouteName="AuthStack"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={{ header: () => null }}
        name="AdminLogin"
        component={AdminLogin}
      />
    </Stack.Navigator>
  );

  const ParentStack = () => (
    <Stack.Navigator
      initialRouteName="ParentStack"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={{ header: () => null }}
        name="ParentLogin"
        component={ParentLogin}
      />
      <Stack.Screen
        options={{ header: () => null }}
        name="ParentHomeScreen"
        component={ParentHomeScreen}
      />
      <Stack.Screen
        options={{ header: () => null }}
        name="AttendanceDetails"
        component={AttendanceDetails}
      />
    </Stack.Navigator>
  );

  const AdminHomeStack = () => (
    <Stack.Navigator
      initialRouteName="AdminHomeStack"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="HomeScreen"
        component={HomeScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="UploadNewStudent"
        component={UploadNewStudent}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ClassStudentsList1"
        component={ClassStudentsList1}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ClassStudentsList2"
        component={ClassStudentsList2}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ClassStudentsList3"
        component={ClassStudentsList3}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ClassStudentsList4"
        component={ClassStudentsList4}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ClassStudentsList5"
        component={ClassStudentsList5}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ClassStudentsList6"
        component={ClassStudentsList6}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ClassStudentsList7"
        component={ClassStudentsList7}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ClassStudentsList8"
        component={ClassStudentsList8}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ClassStudentsList9"
        component={ClassStudentsList9}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ClassStudentsList10"
        component={ClassStudentsList10}
      />
    </Stack.Navigator>
  );

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                options={{ headerShown: false }}
                name="SplashScreen"
                component={SplashScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="AuthStack"
                component={AuthStack}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="AdminHomeStack"
                component={AdminHomeStack}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="ParentStack"
                component={ParentStack}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
}

export default Navigation;
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.45,
    elevation: 5,
    shadowRadius: 3.5,
  },
  cartBtnBlue: {
    width: "10%",
    borderRadius: 100,
    height: 45,
    width: 45,
    backgroundColor: "#DA2328",
    justifyContent: "center",
    alignItems: "center",
  },
});
