import chatAPI from "@/api/chatApi";
import MyButton from "@/components/MyButton";
import socket from "@/utils/socket";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import apiURL from "../../api/amigosApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Friends() {
  const router = useRouter();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {

        const userId: string | null = await AsyncStorage.getItem("user");

        const response = await axios.post(`${apiURL}/amistad/amigos`, { userId });

        setFriends(response.data);
      } catch (error) {
        console.error("Error al obtener amigos:", error);
      }
    };

    fetchFriends();
  }, []);

  const handleChat = async (participant1: string, participant2: string) => {
    const chat = await chatAPI.createOrGetChat(participant1, participant2);

    socket.connect();
    socket.on("connect_error", (err) => {
      console.error("Error al conectar:", err);
    });

    if (socket.connected) {
      router.push({
        pathname: "/chat",
        params: {
          participant1,
          participant2,
          chat: chat._id,
        },
      });
    }
  };

  return (
    <SafeAreaView>
      <View style={{ padding: 15 }}>
        {friends.map((friend) => (
          <View key={friend.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ flex: 1 }}>{friend.nombre}</Text>
            <MyButton
              label="Chat"
              onPress={() => handleChat("userId", friend.id)} // Aquí se pasa el ID del amigo y el del usuario
              outlined={true}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
