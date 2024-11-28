import { io } from "socket.io-client";
const socket = io("http://10.0.2.2:3007", {
  autoConnect: false,
  transports: ["websocket"],
});
export default socket;
