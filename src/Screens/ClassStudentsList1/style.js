import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");
import { font } from "../../Constraints/Constraints";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  name: {
    color: "black",
    fontSize: 14,
  },
  adres: { color: "grey", fontSize: 12 },
  cardSubContainer: {
    borderRadius: 20,
    width: "90%",
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    backgroundColor: "rgb(255,255,255)",
    elevation: 2,
    alignSelf: "center",
    marginTop: "4%",
  },
  nameInitials: {
    color: "white",
    fontSize: 17,
  },
  cardSub: {
    justifyContent: "space-evenly",
    flexDirection: "column",
  },

  picContainer: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    alignItems: "center",
    backgroundColor: "rgb(255,255,255)",
    justifyContent: "center",
    elevation: 1,
  },
  card: {
    width: "99%",
    marginTop: 14,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  pic: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  totalStudent: {
    marginTop: "4%",
    color: "grey",
    fontSize: 20,
    fontWeight: "500",
    paddingHorizontal: "7%",
  },
  studentClassTxt: {
    color: "grey",
    marginTop: "5%",
    alignSelf: "center",
    fontSize: 23,
  },
});
