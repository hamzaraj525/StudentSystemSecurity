import { Dimensions, StyleSheet } from "react-native";
const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  white: {
    width: 110,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  red: {
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    width: 110,
    height: 50,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  parent: {
    marginTop: 10,
    alignSelf: "flex-start",
    justifyContent: "center",
    width: Dimensions.get("window").width,
  },
  bottomLine: {
    alignSelf: "center",
    width: "22%",
    height: 0.9,
    marginTop: -1,
    backgroundColor: "black",
  },
  btnCheckOutTxt: {
    fontFamily: "RobotoSlab-Bold",
    color: "red",
    fontWeight: "500",
    fontSize: 20,
  },
  btnCheckOut: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    marginTop: 10,
    borderRadius: 5,
  },
  shreBtn: { alignItems: "center", justifyContent: "center" },
  titleSchedule: {
    paddingHorizontal: 15,

    fontSize: 35,
    marginTop: 20,
    color: "black",
  },
  titleSub: {
    color: "grey",
    fontWeight: "500",
    fontSize: 13,
    marginTop: 10,
  },
  titleSub2: {
    fontSize: 13,
  },
  btnBack: { alignItems: "center", justifyContent: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    marginTop: "5%",
  },
  timeTitle: {
    fontWeight: "600",
    color: "black",

    fontSize: 15,
  },
  datePickerBtn: {
    marginTop: "6%",
    alignSelf: "center",
    width: "54%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  scheduleSubTitle: {
    alignSelf: "center",
    color: "black",
    fontWeight: "800",
    fontSize: 15,
    marginTop: "5%",
  },
  bottomLine: {
    width: 30,
    height: 3,
    backgroundColor: "white",
  },
  productContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  uploadBtn: {
    marginTop: 15,
    backgroundColor: "rgb(243,200,57)",
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 45 / 2,
    alignSelf: "center",
  },
  uploadBtn2: {
    backgroundColor: "rgb(243,200,57)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 45 / 2,
    alignSelf: "center",
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
});
