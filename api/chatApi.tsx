import axios from "axios";
import { Platform } from "react-native";

const url =
  Platform.OS === "android"
    ? "http://10.0.2.2:3007/api"
    : "http://localhost:3007/api";

const createOrGetChat = async (participant1: string, participant2: string) => {
  const endpoint = url.concat("/chat");
  const response = await axios.get(endpoint, {
    params: {
      participant1: participant1,
      participant2: participant2,
    },
  });

  if (response.status === 201) {
    return response.data;
  } else {
    console.error("Error 500");
    return null;
  }
};

const chatAPI = { createOrGetChat };

export default chatAPI;
