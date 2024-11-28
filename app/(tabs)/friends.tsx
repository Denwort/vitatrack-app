import React, { useState, useEffect } from "react";
import { View, Text, Image, Modal, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import apiURL from "../../api/amigosApi";
import chatAPI from "@/api/chatApi";
import MyButton from "@/components/MyButton";
import socket from "@/utils/socket";

interface Friend {
  id: string;
  nombre: string | "";
  correo: string;
  foto: string;
  premiun: boolean;
  ultima_act: string;
}

interface Solicitudes {
  id: string;
  created_at: string | "";
  sender_id: string;
  receiver_id: string;
  perfil: Friend;
}

export default function Friends() {
  const router = useRouter();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [solicitudes, setSolicitudes] = useState<Solicitudes[]>([]);  // Cambié el tipo a any para incluir el perfil
  const [solicitudesModalVisible, setSolicitudesModalVisible] = useState(false);  // Nuevo estado para el modal de solicitudes

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userId = await AsyncStorage.getItem("user");
        const response = await axios.post(`${apiURL}/amistad/amigos`, { userId });
        setFriends(response.data);
      } catch (error) {
        console.error("Error al obtener amigos:", error);
      }
    };

    fetchFriends();
  }, []);

  const handleChat = async (participant2: string, name: string) => {
    try {
      const userId = await AsyncStorage.getItem("user");
      if (!userId) throw new Error("No se pudo obtener el userId");

      const chat = await chatAPI.createOrGetChat(userId, participant2);

      socket.connect();
      socket.on("connect_error", (err) => console.error("Error al conectar:", err));

      router.push({
        pathname: "/chat",
        params: { participant1: userId, participant2, chat: chat._id, name },
      });
    } catch (error) {
      console.error("Error al iniciar chat:", error);
    }
  };

  const handleSendRequest = async () => {
    try {
      const userId = await AsyncStorage.getItem("user");
      await axios.post(`${apiURL}/solicitud/enviar`, { userId, email });
      setModalVisible(false);
      setEmail("");
      alert("Solicitud enviada exitosamente.");
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
    }
  };

  const fetchSolicitudes = async () => {
    try {
      const userId = await AsyncStorage.getItem("user");
      const response = await axios.post(`${apiURL}/solicitud/ver`, { userId });
      console.log(response.data)
      setSolicitudes(response.data);
    } catch (error) {
      console.error("Error al obtener solicitudes:", error);
    }
  };

  const handleAcceptRequest = async (id: string) => {
    try {
      await axios.post(`${apiURL}/solicitud/aceptar`, { id });
      alert("Solicitud aceptada.");
      fetchSolicitudes();
    } catch (error) {
      console.error("Error al aceptar solicitud:", error);
    }
  };

  const handleRejectRequest = async (id: string) => {
    try {
      await axios.post(`${apiURL}/solicitud/rechazar`, { id });
      alert("Solicitud rechazada.");
      fetchSolicitudes();
    } catch (error) {
      console.error("Error al rechazar solicitud:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Social</Text>
  
        <ScrollView>
          {friends.map((friend) => (
            <View key={friend.id} style={styles.friendCard}>
              <Image source={{ uri: friend.foto }} style={styles.friendImage} />
              <Text style={styles.friendName}>{friend.nombre}</Text>
              <MyButton
                label="Chat"
                onPress={() => handleChat(friend.id, friend.nombre)}
                outlined={true}
              />
            </View>
          ))}
        </ScrollView>
  
        <View style={styles.buttons}>
          <MyButton
            label="Enviar Solicitud"
            outlined={true}
            onPress={() => setModalVisible(true)}
          />
          <MyButton
            label="Ver Solicitudes"
            outlined={true}
            onPress={() => {
              fetchSolicitudes();
              setSolicitudesModalVisible(true);  // Mostrar el modal de solicitudes
            }}
          />
        </View>
  
        {/* Modal para enviar solicitud */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Enviar Solicitud</Text>
              <TextInput
                style={styles.input}
                placeholder="Correo del amigo"
                value={email}
                onChangeText={setEmail}
              />
              <MyButton label="Enviar" outlined={true} onPress={handleSendRequest} />
              <MyButton
                label="Cancelar"
                outlined={true}
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
  
        {/* Modal para mostrar solicitudes */}
        <Modal
          visible={solicitudesModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSolicitudesModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Solicitudes de Amistad</Text>
              <ScrollView>
                {solicitudes.length > 0 ? (
                  solicitudes.map((solicitud) => (
                    <View key={solicitud.id} style={styles.solicitudCard}>
                      {/* Envolvemos el nombre en <Text> */}
                      <Text>{solicitud.perfil?.nombre || "Nombre no disponible"}</Text>
                      <View style={styles.solicitudButtons}>
                        {/* Botón de aceptar */}
                        <TouchableOpacity
                          onPress={() => handleAcceptRequest(solicitud.id)}
                          style={styles.solicitudButton}
                        >
                          <Text style={styles.buttonText}>✔</Text> {/* Símbolo de check */}
                        </TouchableOpacity>
                        {/* Botón de rechazar */}
                        <TouchableOpacity
                          onPress={() => handleRejectRequest(solicitud.id)}
                          style={styles.solicitudButton}
                        >
                          <Text style={styles.buttonText}>❌</Text> {/* Símbolo de equis */}
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text>No hay solicitudes pendientes.</Text>
                )}
              </ScrollView>
              <MyButton
                label="Cerrar"
                outlined={true}
                onPress={() => setSolicitudesModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f8f8f8" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  friendCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  friendImage: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  friendName: { flex: 1, fontSize: 18 },
  buttons: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  solicitudCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  solicitudButtons: {
    flexDirection: "row",
  },
  solicitudButton: {
    margin: 5,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
  },
  buttonText: { fontSize: 20 },
});
