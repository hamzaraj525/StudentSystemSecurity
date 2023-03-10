import { Dimensions, StyleSheet } from "react-native";
import { font } from "../../Constraints/Constraints";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  parentContainer: {
    marginTop: "6%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },
  passwordContainer: {
    flexDirection: "row",
    backgroundColor: "#F6F3F5",
    borderRadius: 25,
    padding: 12,
    width: "80%",
    height: 45,
    alignItems: "center",
    marginTop: "7%",
  },
  TiName: {
    fontFamily: "RobotoSlab-Bold",
    width: "90%",
    height: 45,
    marginLeft: 6,
  },
  input: {
    backgroundColor: "#FFC0CB",
    borderRadius: 20,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  listItem: { margin: 10, backgroundColor: "red" },
  TiName: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  listHeaderTxt: {
    marginTop: 20,
    marginBottom: 6,
    color: "black",
    paddingHorizontal: "3%",
    fontWeight: "600",
    fontSize: 17,
  },
  subViews: {
    borderRadius: 20,
    backgroundColor: "red",
    width: 140,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  categBtn: {
    marginTop: "5%",

    width: "60%",
    flexDirection: "row",
    borderRadius: 25,
    height: 50,
    padding: 14,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F6F3F5",
  },
  loginBtn: {
    marginTop: 15,
    backgroundColor: "rgb(240,220,111)",
    width: "100%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  loaderStyle: { flex: 1, justifyContent: "center", alignItems: "center" },
  uploadTxt: {
    fontSize: 16,
    color: "#0000ff",
    marginTop: 10,
  },
  borderLine: {
    width: "100%",
    marginTop: "1%",
    marginBottom: "2%",
    backgroundColor: "rgb(55,83,108)",
    height: 0.5,
  },
  inputHeader: {
    fontSize: 13,

    color: "rgb(55,83,108)",
  },

  newUserTxt: {
    paddingLeft: 5,
    fontSize: 15,

    color: "rgb(55,83,108)",
  },
  boldTt: {
    marginTop: "8%",
    fontSize: 50,

    color: "black",
  },
  txtInput: { height: 45, fontSize: 17 },

  btnPost: {
    fontSize: 16,

    color: "black",
  },
});
