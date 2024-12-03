import axios from "axios";
import { Platform } from "react-native";

const url =
  Platform.OS === "android" ? "http://10.0.2.2:3010" : "http://localhost:3010";

const getAllResponses = async (id) => {
  const endpoint = url.concat(`/gateway/${id}`);
  const response = await axios.get(endpoint);

  if (response.status === 200) {
    return response.data;
  } else {
    console.error("Error en consulta");
    return null;
  }
};

const gatewayAPI = { getAllResponses };

export default gatewayAPI;
