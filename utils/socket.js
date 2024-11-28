import { io } from "socket.io-client";
import { Platform } from "react-native";

const url =
  Platform.OS === "android" ? "http://10.0.2.2:3007" : "http://localhost:3007";

const socket = io(url, {
  autoConnect: false,
  transports: ["websocket"],
});
export default socket;
