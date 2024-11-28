import chatAPI from "@/api/chatApi";
import MyButton from "@/components/MyButton";
import socket from "@/utils/socket";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import apiURL from "../../api/amigosApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Friend {
  id: string; // UUID
  nombre: string;
  correo: string;
  foto: string | "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTY1LWtsaGN3ZWNtLmpwZw.jpg";
  premiun: boolean;
  ultima_act: string;
}

export default function Friends() {
  const router = useRouter();
  const [friends, setFriends] = useState<Friend[]>([]);

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

  const handleChat = async (participant2: string) => {
    
    try{
      const userId: string | null = await AsyncStorage.getItem("user");
      if(!userId) throw new Error ("No se pudo obtener el userId")
      const participant1: string = userId

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
    } catch(error){
      console.log("error al iniciar chat")
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 15 }}>
        {/* Título de la sección */}
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Social</Text>

        {/* Mapeamos los amigos */}
        {friends.map((friend) => (
          <View key={friend.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
            {/* Imagen del amigo */}
            <View style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              overflow: 'hidden',
              marginRight: 15
            }}>
              {/* Si tiene foto, mostramos la imagen; si no, mostramos un placeholder */}
              <Image
                source={{ uri: friend.foto } } // Imagen predeterminada si no tiene foto
                style={{ width: '100%', height: '100%' }}
              />
            </View>

            {/* Nombre y botón de chat */}
            <Text style={{ flex: 1, fontSize: 18 }}>{friend.nombre}</Text>
            <MyButton
              label="Chat"
              onPress={() => handleChat(friend.id)} // Aquí se pasa el ID del amigo y el del usuario
              outlined={true}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
