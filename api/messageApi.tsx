import axios from "axios";

const url = "http://10.0.2.2:3007/api";

const postMessage = async (payload: object) => {
  const endpoint = url.concat("/message");
  const response = await axios.post(endpoint, payload);

  if (response.status === 201) {
    return response.data;
  } else {
    console.error("Error 500");
    return null;
  }
};

const getMessage = async (chat: string) => {
  const endpoint = url.concat("/message/" + chat);
  const response = await axios.get(endpoint);

  if (response.status === 201) {
    return response.data;
  } else {
    console.error("Error 500");
    return null;
  }
};

const messageAPI = { postMessage, getMessage };

export default messageAPI;
