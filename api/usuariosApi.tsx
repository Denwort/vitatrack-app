import { Platform } from "react-native";

const url =
  Platform.OS === "android" ? "http://10.0.2.2:3001" : "http://localhost:3001";

export default url;
