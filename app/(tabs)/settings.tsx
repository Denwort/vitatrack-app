import MyButton from "@/components/MyButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import apiURL from "../../api/usuariosApi";
import { StyleSheet } from "react-native";


interface UserProfile {
  nombre: string;
  correo: string;
  foto: string;
}

export default function Settings() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  const fetchUserProfile = async () => {
    try {
      const userId: string | null = await AsyncStorage.getItem("user");

      const response = await axios.post(`${apiURL}/profile/me`, {userId});

      console.log(response.data)

      setUserProfile(response.data); // Asumimos que el API devuelve los datos del perfil del usuario
    } catch (err) {
      console.error("Error al obtener el perfil del usuario:", err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handlePress = async () => {
    try {
      await AsyncStorage.removeItem("user");
      console.log("User eliminado");
      router.replace("/login");
    } catch (err) {
      console.error("Error");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      {userProfile ? (
        <>
          <View style={styles.profileContainer}>
            {/* Imagen de perfil */}
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: userProfile.foto }}
                style={styles.profileImage}
              />
            </View>
            {/* Nombre y correo */}
            <Text style={styles.profileName}>{userProfile.nombre}</Text>
            <Text style={styles.profileEmail}>{userProfile.correo}</Text>
          

            {/* Botón de cierre de sesión */}
            <MyButton
              label={"Cerrar sesión"}
              outlined={true}
              onPress={handlePress}
            />

          </View>
        </>
      ) : (
        <Text>Cargando perfil...</Text> // Muestra un mensaje mientras se carga el perfil
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: 40,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 20,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileEmail: {
    fontSize: 16,
    color: "gray",
    marginBottom: 30,
  },
});