import { Platform } from "react-native";

const url =
  Platform.OS === "android" ? "http://10.0.2.2:3002" : "http://localhost:3002";

export default url;
